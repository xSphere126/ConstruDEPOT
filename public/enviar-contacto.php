<?php
/**
 * Recibe el formulario de contacto y lo envía por email vía SMTP
 * autenticado (buzón dedicado, ver config.example.php), sin depender de
 * ningún servicio de terceros. Sustituye a Formspree.
 */

// Los "use" de importación de namespace tienen que ir antes que cualquier
// otra instrucción de nivel superior del archivo (fuera de comentarios),
// así que van aquí arriba aunque las clases no se usen hasta más abajo.
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

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

$configFile = __DIR__ . '/config.local.php';
if (!file_exists($configFile)) {
    // Buzón todavía no creado / configurado — ver config.example.php.
    respond(false, 'El formulario todavía no está conectado.');
}
require_once $configFile;
require_once __DIR__ . '/_lib/phpmailer/Exception.php';
require_once __DIR__ . '/_lib/phpmailer/PHPMailer.php';
require_once __DIR__ . '/_lib/phpmailer/SMTP.php';

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

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = 'UTF-8';

    // El remitente siempre es el buzón propio autenticado (evita fallos de
    // SPF/DKIM y suplantación); el email del cliente va en Reply-To, así
    // que "Responder" en el correo va directo a él.
    $mail->setFrom(SMTP_USER, 'Formulario web · Construdepot by Quiles');
    $mail->addAddress(MAIL_TO, MAIL_TO_NAME);
    if ($email !== '') {
        $mail->addReplyTo($email, $nombre);
    }

    $mail->Subject = 'Nueva consulta desde la web — ' . $nombre;
    $mail->Body = implode("\n", [
        'Perfil: ' . ($perfil !== '' ? $perfil : 'no indicado'),
        'Nombre: ' . $nombre,
        'Teléfono: ' . $telefono,
        'Email: ' . ($email !== '' ? $email : 'no indicado'),
        '',
        'Mensaje:',
        $mensaje !== '' ? $mensaje : '(sin mensaje)',
    ]);

    $mail->send();
    respond(true, 'Gracias, hemos recibido tu consulta.');
} catch (PHPMailerException $e) {
    respond(false, 'No se ha podido enviar el mensaje.');
}
