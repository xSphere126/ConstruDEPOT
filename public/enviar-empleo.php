<?php
/**
 * Recibe el formulario de candidatura de /empleo/ y lo envía por email (con
 * el CV adjunto, si lo hay) a través del helper compartido de Microsoft
 * Graph (lib/graph-mail.php) — ver config-local.example.php para las
 * credenciales del buzón dedicado. Mismo patrón que enviar-contacto.php.
 */

require_once __DIR__ . '/lib/graph-mail.php';

header('Content-Type: application/json; charset=utf-8');

function respond(bool $ok, string $message): void
{
    http_response_code($ok ? 200 : 400);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Método no permitido.');
}

// Ver enviar-contacto.php: IONOS renombra "config.local.php" a
// "config-local.php" al subirlo, así que el código busca la versión con
// guion, no la de punto.
$configFile = __DIR__ . '/config-local.php';
if (!file_exists($configFile)) {
    respond(false, 'El formulario todavía no está conectado.');
}
require_once $configFile;

// Campo trampa: invisible para personas, los bots que autorrellenan
// formularios suelen completarlo. Si llega relleno, se descarta en
// silencio (sin decirle al bot que ha sido detectado).
if (!empty($_POST['_gotcha'])) {
    respond(true, 'Gracias, hemos recibido tu candidatura.');
}

// Saneado: se elimina cualquier salto de línea de los campos de una sola
// línea para evitar inyección de cabeceras de correo, y se recorta
// espacios sobrantes.
function cleanField(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

$nombre = cleanField($_POST['nombre'] ?? '');
$telefono = cleanField($_POST['telefono'] ?? '');
$email = cleanField($_POST['email'] ?? '');
$puesto = cleanField($_POST['puesto'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');
$consentimiento = !empty($_POST['consentimiento']);

if ($nombre === '' || $telefono === '' || $email === '' || $mensaje === '') {
    respond(false, 'Faltan campos obligatorios.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'El email no es válido.');
}

if (!$consentimiento) {
    respond(false, 'Debes aceptar la política de privacidad para enviar tu candidatura.');
}

// El CV es opcional: alguien puede preferir dejar solo sus datos y que le
// contactemos, o contar su experiencia en el mensaje.
$attachments = [];
$cvError = null;
if (isset($_FILES['cv']) && $_FILES['cv']['error'] !== UPLOAD_ERR_NO_FILE) {
    $cv = $_FILES['cv'];

    if ($cv['error'] === UPLOAD_ERR_INI_SIZE || $cv['error'] === UPLOAD_ERR_FORM_SIZE) {
        $cvError = 'El CV pesa demasiado (máximo 5 MB).';
    } elseif ($cv['error'] !== UPLOAD_ERR_OK) {
        $cvError = 'No se ha podido leer el CV adjunto.';
    } elseif ($cv['size'] > 5 * 1024 * 1024) {
        $cvError = 'El CV pesa demasiado (máximo 5 MB).';
    } else {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $cv['tmp_name']);
        finfo_close($finfo);
        $isPdfName = strtolower(pathinfo($cv['name'], PATHINFO_EXTENSION)) === 'pdf';

        if ($mimeType !== 'application/pdf' || !$isPdfName) {
            $cvError = 'El CV debe ser un archivo PDF.';
        } else {
            $contentBytes = base64_encode(file_get_contents($cv['tmp_name']));
            $attachments[] = [
                '@odata.type' => '#microsoft.graph.fileAttachment',
                'name' => 'CV - ' . $nombre . '.pdf',
                'contentType' => 'application/pdf',
                'contentBytes' => $contentBytes,
            ];
        }
    }
}

if ($cvError !== null) {
    respond(false, $cvError);
}

$bodyText = implode("\n", [
    'Puesto de interés: ' . ($puesto !== '' ? $puesto : 'no indicado'),
    'Nombre: ' . $nombre,
    'Teléfono: ' . $telefono,
    'Email: ' . $email,
    'CV adjunto: ' . (count($attachments) > 0 ? 'sí' : 'no'),
    '',
    'Experiencia / mensaje:',
    $mensaje !== '' ? $mensaje : '(sin mensaje)',
]);

$message = [
    'subject' => 'Nueva candidatura desde la web — ' . $nombre,
    'body' => ['contentType' => 'Text', 'content' => $bodyText],
    'toRecipients' => [['emailAddress' => ['address' => MAIL_TO, 'name' => MAIL_TO_NAME]]],
    'replyTo' => [['emailAddress' => ['address' => $email, 'name' => $nombre]]],
];
if (count($attachments) > 0) {
    $message['attachments'] = $attachments;
}

if (graphSendMail($message, 'Formulario empleo')) {
    respond(true, 'Gracias, hemos recibido tu candidatura.');
}

respond(false, 'No se ha podido enviar la candidatura.');
