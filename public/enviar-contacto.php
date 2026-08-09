<?php
/**
 * Recibe el formulario de contacto y lo envía por email a través del
 * helper compartido de Microsoft Graph (lib/graph-mail.php) — ver
 * config-local.example.php para las credenciales del buzón dedicado.
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

// IONOS renombra "config.local.php" a "config-local.php" al subirlo (se
// comprobó con el gestor de archivos y con curl: pedir la versión con
// punto responde con un 301 a la de guion) — el nombre real en el
// servidor lleva guion, así que el código busca ese, no el del punto.
$configFile = __DIR__ . '/config-local.php';
if (!file_exists($configFile)) {
    // Buzón todavía no creado / configurado — ver config-local.example.php.
    respond(false, 'El formulario todavía no está conectado.');
}
require_once $configFile;

// Campo trampa: invisible para personas, los bots que autorrellenan
// formularios suelen completarlo. Si llega relleno, se descarta en
// silencio (sin decirle al bot que ha sido detectado).
if (!empty($_POST['_gotcha'])) {
    respond(true, 'Gracias, hemos recibido tu consulta.');
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

$bodyText = implode("\n", [
    'Perfil: ' . ($perfil !== '' ? $perfil : 'no indicado'),
    'Nombre: ' . $nombre,
    'Teléfono: ' . $telefono,
    'Email: ' . ($email !== '' ? $email : 'no indicado'),
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

if (graphSendMail($message, 'Formulario contacto')) {
    respond(true, 'Gracias, hemos recibido tu consulta.');
}

respond(false, 'No se ha podido enviar el mensaje.');
