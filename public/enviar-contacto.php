<?php
/**
 * Recibe el formulario de contacto y lo envía por email a través de
 * Microsoft Graph API (OAuth2, client credentials) usando el buzón
 * dedicado — ver config-local.example.php. No usa SMTP con usuario y
 * contraseña: el tenant de Microsoft 365 tiene activados los "Security
 * Defaults", que bloquean la autenticación básica de SMTP aunque el
 * interruptor de "SMTP AUTH" del buzón individual esté activado. OAuth2
 * vía Graph funciona igual con Security Defaults puesto, sin tener que
 * bajar la seguridad de toda la organización para este formulario.
 */

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

// Paso 1: conseguir un token de acceso (OAuth2, client credentials) de la
// aplicación de Azure registrada para este formulario.
function graphToken(): array
{
    $ch = curl_init('https://login.microsoftonline.com/' . GRAPH_TENANT_ID . '/oauth2/v2.0/token');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'client_id' => GRAPH_CLIENT_ID,
            'client_secret' => GRAPH_CLIENT_SECRET,
            'scope' => 'https://graph.microsoft.com/.default',
            'grant_type' => 'client_credentials',
        ]),
        CURLOPT_TIMEOUT => 15,
    ]);
    $raw = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);
    $data = $raw !== false ? json_decode($raw, true) : null;
    return ['token' => $data['access_token'] ?? null, 'raw' => $raw, 'curlError' => $curlError];
}

$tokenResult = graphToken();
if (!$tokenResult['token']) {
    // El detalle real del fallo va al log del servidor, no a quien rellena
    // el formulario — no tiene por qué ver el motivo interno de un fallo
    // de autenticación de Microsoft.
    error_log('Formulario contacto: fallo al pedir token de Graph — ' . ($tokenResult['curlError'] ?: $tokenResult['raw']));
    respond(false, 'No se ha podido enviar el mensaje.');
}

// Paso 2: enviar el correo de verdad, como el buzón GRAPH_SENDER, vía Graph.
$payload = [
    'message' => [
        'subject' => 'Nueva consulta desde la web — ' . $nombre,
        'body' => ['contentType' => 'Text', 'content' => $bodyText],
        'toRecipients' => [['emailAddress' => ['address' => MAIL_TO, 'name' => MAIL_TO_NAME]]],
    ],
    'saveToSentItems' => true,
];
if ($email !== '') {
    $payload['message']['replyTo'] = [['emailAddress' => ['address' => $email, 'name' => $nombre]]];
}

$ch = curl_init('https://graph.microsoft.com/v1.0/users/' . rawurlencode(GRAPH_SENDER) . '/sendMail');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $tokenResult['token'], 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 15,
]);
$sendRaw = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status === 202) {
    respond(true, 'Gracias, hemos recibido tu consulta.');
}

error_log('Formulario contacto: fallo al enviar por Graph (' . $status . ') — ' . $sendRaw);
respond(false, 'No se ha podido enviar el mensaje.');
