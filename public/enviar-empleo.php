<?php
/**
 * Recibe el formulario de candidatura de /empleo/ y lo envía por email (con
 * el CV adjunto, si lo hay) a través del helper compartido de Microsoft
 * Graph (lib/graph-mail.php) — ver README.md para las credenciales del
 * buzón dedicado. Mismo patrón que enviar-contacto.php.
 */

require_once __DIR__ . '/lib/graph-mail.php';
require_once __DIR__ . '/lib/turnstile.php';

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
// formularios suelen completarlo. Se comprueba ANTES que Turnstile a
// propósito: si un bot tan simple pica en esto, se le responde con el
// engaño silencioso de siempre (cree que ha funcionado) sin gastar ni
// siquiera una llamada a Cloudflare para confirmarlo.
if (!empty($_POST['_gotcha'])) {
    respond(true, 'Gracias, hemos recibido tu candidatura.');
}

// Verificación anti-bot de Cloudflare Turnstile — ver lib/turnstile.php.
// Solo se exige si TURNSTILE_SECRET_KEY está configurada; mientras no lo
// esté, el formulario sigue funcionando igual que antes.
if (turnstileConfigured()) {
    $turnstileToken = $_POST['cf-turnstile-response'] ?? '';
    if (!verifyTurnstile($turnstileToken, $_SERVER['REMOTE_ADDR'] ?? '')) {
        respond(false, 'No hemos podido verificar que eres una persona. Recarga la página e inténtalo de nuevo.');
    }
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

// Evita que la misma persona (misma IP) mande dos candidaturas seguidas a
// la MISMA vacante en menos de 2 minutos — reenviar la vacante que ya
// acabas de enviar no aporta nada (a diferencia del formulario de
// contacto, donde tiene sentido mandar una consulta como particular y
// luego otra como profesional). No bloquea aplicar a una vacante distinta,
// solo repetir la misma. Con el archivo de bloqueo en el directorio
// temporal del servidor, fuera de la carpeta pública, para que no sea
// descargable.
$throttleKey = sha1(($_SERVER['REMOTE_ADDR'] ?? '') . '|' . $puesto);
$throttleFile = sys_get_temp_dir() . '/construdepot-empleo-' . $throttleKey . '.lock';
$throttleSeconds = 120;
if (file_exists($throttleFile) && (time() - filemtime($throttleFile)) < $throttleSeconds) {
    respond(false, 'Ya hemos recibido una candidatura tuya para este puesto hace un momento. Si necesitas añadir algo, escríbenos por WhatsApp.');
}

// El CV es opcional: alguien puede preferir dejar solo sus datos y que le
// contactemos, o contar su experiencia en el mensaje.
//
// Límite de 2 MB, no 5: Graph solo admite adjuntos directos (fileAttachment
// con contentBytes) de hasta ~3 MB ya codificados en base64 en una sola
// llamada a sendMail — con codificación base64 (+33% de tamaño), un
// original de 2 MB ya ocupa ~2,7 MB codificado, dejando margen. Pasarse de
// ese límite no da un error claro: graphSendMail() simplemente devuelve
// false y el candidato ve "no se ha podido enviar", sin más explicación.
$attachments = [];
$cvError = null;
if (isset($_FILES['cv']) && $_FILES['cv']['error'] !== UPLOAD_ERR_NO_FILE) {
    $cv = $_FILES['cv'];

    if ($cv['error'] === UPLOAD_ERR_INI_SIZE || $cv['error'] === UPLOAD_ERR_FORM_SIZE) {
        $cvError = 'El CV pesa demasiado (máximo 2 MB).';
    } elseif ($cv['error'] !== UPLOAD_ERR_OK) {
        $cvError = 'No se ha podido leer el CV adjunto.';
    } elseif ($cv['size'] > 2 * 1024 * 1024) {
        $cvError = 'El CV pesa demasiado (máximo 2 MB).';
    } else {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        // finfo_open() puede devolver false si la extensión fileinfo no
        // está disponible en el hosting — sin esta comprobación,
        // finfo_file(false, ...) lanza un error fatal de PHP (respuesta
        // vacía, no el JSON que espera el formulario) en vez de un mensaje
        // controlado.
        $mimeType = $finfo !== false ? finfo_file($finfo, $cv['tmp_name']) : false;
        if ($finfo !== false) {
            finfo_close($finfo);
        }
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
    touch($throttleFile);
    respond(true, 'Gracias, hemos recibido tu candidatura.');
}

respond(false, 'No se ha podido enviar la candidatura.');
