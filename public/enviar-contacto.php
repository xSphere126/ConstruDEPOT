<?php
/**
 * Recibe el formulario de contacto y lo envía por email a través del
 * helper compartido de Microsoft Graph (lib/graph-mail.php) — ver
 * README.md para las credenciales del buzón dedicado.
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

// IONOS renombra "config.local.php" a "config-local.php" al subirlo (se
// comprobó con el gestor de archivos y con curl: pedir la versión con
// punto responde con un 301 a la de guion) — el nombre real en el
// servidor lleva guion, así que el código busca ese, no el del punto.
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
    respond(true, 'Gracias, hemos recibido tu consulta.');
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

// Límite de frecuencia por IP: a diferencia de Empleo, aquí NO se limita por
// vacante/asunto (tiene sentido mandar una consulta como particular y luego
// otra como profesional), pero sin ningún límite alguien con forma de
// conseguir tokens de Turnstile válidos repetidamente podría automatizar
// envíos sin parar. 30 segundos es corto de sobra para no molestar a quien
// manda dos consultas distintas seguidas, pero corta el envío en ráfaga.
$throttleKey = sha1($_SERVER['REMOTE_ADDR'] ?? '');
$throttleFile = sys_get_temp_dir() . '/construdepot-contacto-' . $throttleKey . '.lock';
$throttleSeconds = 30;
if (file_exists($throttleFile) && (time() - filemtime($throttleFile)) < $throttleSeconds) {
    respond(false, 'Ya hemos recibido un mensaje tuyo hace un momento. Espera unos segundos e inténtalo de nuevo.');
}

// Saneado: se elimina cualquier salto de línea de los campos de una sola
// línea para evitar inyección de cabeceras de correo, y se recorta
// espacios sobrantes.
function cleanField(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

$perfil = cleanField($_POST['perfil'] ?? '');
$nombre = cleanField($_POST['nombre'] ?? '');
$telefono = cleanField($_POST['telefono'] ?? '');
$email = cleanField($_POST['email'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $telefono === '') {
    respond(false, 'Faltan campos obligatorios.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'El email no es válido.');
}

// Las fotos son opcionales (obra o material a igualar), hasta MAX_FOTOS. El
// navegador ya las comprime antes de enviarlas (ver contacto.astro), pero
// todo se vuelve a comprobar aquí porque el cliente se puede saltar por
// completo (llamando directamente a este script): cada foto se valida por
// separado (tamaño y MIME real vía finfo, no la extensión ni el
// Content-Type que declara el navegador), y además se limita el peso
// COMBINADO de todas juntas — Graph solo admite ~3 MB en base64 por envío
// en una sola llamada a sendMail, y ese límite es total, no por adjunto.
// Pasarse no da un error claro: graphSendMail() simplemente devuelve false.
const MAX_FOTOS = 3;
const MAX_FOTO_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_FOTOS_BYTES = 2 * 1024 * 1024;
$extensionesPorTipo = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];

$attachments = [];
$fotoError = null;
$totalFotoBytes = 0;

if (isset($_FILES['fotos']) && is_array($_FILES['fotos']['name'])) {
    $numFotos = count($_FILES['fotos']['name']);
    if ($numFotos > MAX_FOTOS) {
        $fotoError = 'Puedes adjuntar como máximo ' . MAX_FOTOS . ' fotos.';
    }

    for ($i = 0; $fotoError === null && $i < $numFotos; $i++) {
        $error = $_FILES['fotos']['error'][$i];
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
            $fotoError = 'Una de las fotos pesa demasiado (máximo 2 MB).';
            break;
        }
        if ($error !== UPLOAD_ERR_OK) {
            $fotoError = 'No se ha podido leer una de las fotos adjuntas.';
            break;
        }

        $size = $_FILES['fotos']['size'][$i];
        if ($size > MAX_FOTO_BYTES) {
            $fotoError = 'Una de las fotos pesa demasiado (máximo 2 MB).';
            break;
        }
        $totalFotoBytes += $size;
        if ($totalFotoBytes > MAX_TOTAL_FOTOS_BYTES) {
            $fotoError = 'Las fotos juntas pesan demasiado (máximo 2 MB en total).';
            break;
        }

        $tmpName = $_FILES['fotos']['tmp_name'][$i];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        // finfo_open() puede devolver false si la extensión fileinfo no está
        // disponible en el hosting — sin esta comprobación, finfo_file(false, ...)
        // lanza un error fatal de PHP en vez de un mensaje controlado.
        $mimeType = $finfo !== false ? finfo_file($finfo, $tmpName) : false;
        if ($finfo !== false) {
            finfo_close($finfo);
        }

        if (!isset($extensionesPorTipo[$mimeType])) {
            $fotoError = 'Las fotos deben ser JPG, PNG o WEBP.';
            break;
        }

        $contentBytes = base64_encode(file_get_contents($tmpName));
        $attachments[] = [
            '@odata.type' => '#microsoft.graph.fileAttachment',
            'name' => 'Foto ' . (count($attachments) + 1) . ' - ' . $nombre . '.' . $extensionesPorTipo[$mimeType],
            'contentType' => $mimeType,
            'contentBytes' => $contentBytes,
        ];
    }
}

if ($fotoError !== null) {
    respond(false, $fotoError);
}

$bodyText = implode("\n", [
    'Perfil: ' . ($perfil !== '' ? $perfil : 'no indicado'),
    'Nombre: ' . $nombre,
    'Teléfono: ' . $telefono,
    'Email: ' . ($email !== '' ? $email : 'no indicado'),
    'Fotos adjuntas: ' . count($attachments),
    '',
    'Mensaje:',
    $mensaje !== '' ? $mensaje : '(sin mensaje)',
]);

$message = [
    'subject' => 'Nueva consulta desde la web — ' . $nombre,
    'body' => ['contentType' => 'Text', 'content' => $bodyText],
    'toRecipients' => [['emailAddress' => ['address' => MAIL_TO, 'name' => MAIL_TO_NAME]]],
];
if ($email !== '') {
    $message['replyTo'] = [['emailAddress' => ['address' => $email, 'name' => $nombre]]];
}
if (count($attachments) > 0) {
    $message['attachments'] = $attachments;
}

if (graphSendMail($message, 'Formulario contacto')) {
    touch($throttleFile);
    respond(true, 'Gracias, hemos recibido tu consulta.');
}

respond(false, 'No se ha podido enviar el mensaje.');
