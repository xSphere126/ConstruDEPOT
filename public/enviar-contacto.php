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

// Correo de confirmación automática al cliente, solo si ha dejado su email
// (es opcional en el formulario). "Best effort": si Graph falla aquí no se
// informa como error a quien rellena el formulario ni se corta el envío a
// MAIL_TO — ese es el correo que de verdad importa y ya se ha mandado antes
// de llamar a esta función. El fallo queda igualmente en error_log vía
// graphSendMail().
function sendContactAutoreply(string $email, string $nombre, string $telefono, string $perfil, string $mensaje): void
{
    $primerNombre = explode(' ', trim($nombre))[0] ?: $nombre;
    $primerNombreSeguro = htmlspecialchars($primerNombre, ENT_QUOTES, 'UTF-8');
    $nombreSeguro = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
    $telefonoSeguro = htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8');
    $tituloH1 = $primerNombreSeguro !== '' ? "¡Gracias, {$primerNombreSeguro}!" : '¡Gracias por tu consulta!';

    // Fila "Perfil" en el resumen: solo si el visitante marcó uno de los dos
    // botones del formulario (particular/profesional es opcional).
    $perfilLabels = ['particular' => 'Particular', 'profesional' => 'Profesional'];
    $filaPerfil = '';
    if (isset($perfilLabels[$perfil])) {
        $filaPerfil = '<tr><td style="padding:5px 0; vertical-align:top; color:#6b6c64; white-space:nowrap;">Perfil</td><td style="padding:5px 0 5px 14px; color:#20211D; font-weight:600;">' . $perfilLabels[$perfil] . '</td></tr>';
    }

    // Fila "Mensaje": solo si escribió algo (el campo es opcional en el
    // formulario). nl2br para respetar los saltos de línea del textarea.
    $mensaje = trim($mensaje);
    $filaMensaje = '';
    if ($mensaje !== '') {
        $mensajeSeguro = nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'));
        $filaMensaje = '<tr><td style="padding:10px 0 0; vertical-align:top; color:#6b6c64; white-space:nowrap;">Mensaje</td><td style="padding:10px 0 0 14px; color:#20211D; line-height:1.5;">' . $mensajeSeguro . '</td></tr>';
    }

    $html = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0; padding:0; background-color:#E7DEC7; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E7DEC7; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid rgba(74,74,74,.12);">
          <tr>
            <td style="background-color:#41B718; height:6px; line-height:6px; font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="background-color:#E7DEC7; padding:32px 24px 22px;">
              <span style="font-size:24px; font-weight:800; letter-spacing:.03em; color:#20211D;">CONSTRU<span style="color:#2E8710;">DEPOT</span></span>
              <div style="font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#9C5216; margin-top:6px; font-weight:700;">Materiales de construcción · Elche</div>
            </td>
          </tr>
          <tr>
            <td style="padding:34px 40px 6px;">
              <div style="font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#2E8710; margin-bottom:10px;">&#10003; Consulta recibida</div>
              <h1 style="margin:0 0 12px; font-size:23px; line-height:1.3; color:#20211D;">{$tituloH1}</h1>
              <p style="margin:0; font-size:14.5px; line-height:1.65; color:#4A4A4A;">Hemos recibido tu consulta correctamente. Nuestro equipo la revisará y se pondrá en contacto contigo en breve. Si es urgente, escríbenos directamente por WhatsApp.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6EC; border:1px solid rgba(74,74,74,.16); border-radius:12px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <div style="font-size:12px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#20211D; margin-bottom:12px;">Resumen de tu consulta</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13.5px;">
                      <tr><td style="padding:5px 0; vertical-align:top; color:#6b6c64; white-space:nowrap;">Nombre</td><td style="padding:5px 0 5px 14px; color:#20211D; font-weight:600;">{$nombreSeguro}</td></tr>
                      <tr><td style="padding:5px 0; vertical-align:top; color:#6b6c64; white-space:nowrap;">Teléfono</td><td style="padding:5px 0 5px 14px; color:#20211D; font-weight:600;">{$telefonoSeguro}</td></tr>
                      {$filaPerfil}
                      {$filaMensaje}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px 6px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color:#2E8710; border-radius:10px;">
                    <a href="https://wa.me/34607224454" style="display:block; padding:14px 18px; font-size:14.5px; font-weight:700; color:#FFFFFF; text-decoration:none;">Escribir por WhatsApp &rarr;</a>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                <tr>
                  <td width="50%" style="padding-right:6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1.5px solid #2E8710; border-radius:10px;">
                      <tr><td align="center"><a href="https://construdepot.es/productos/" style="display:block; padding:11px 8px; font-size:13px; font-weight:600; color:#2E8710; text-decoration:none;">Ver productos</a></td></tr>
                    </table>
                  </td>
                  <td width="50%" style="padding-left:6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1.5px solid #2E8710; border-radius:10px;">
                      <tr><td align="center"><a href="https://construdepot.es/contacto/" style="display:block; padding:11px 8px; font-size:13px; font-weight:600; color:#2E8710; text-decoration:none;">Más formas de contacto</a></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#20211D; padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="font-size:12.5px; line-height:1.8; color:rgba(255,255,255,.72);">
                    <a href="https://www.instagram.com/construdepot_by_quiles/" style="color:#FFFFFF; text-decoration:none; margin:0 8px;">Instagram</a>
                    ·
                    <a href="https://www.facebook.com/ConstrudepotbyQuiles/" style="color:#FFFFFF; text-decoration:none; margin:0 8px;">Facebook</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:14px; font-size:12px; color:rgba(255,255,255,.45);">
                    N-340 Partida Jubalcoy, Elche (Alicante) · 965 79 91 79 · info@construdepot.es
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div style="max-width:600px; margin:16px auto 0; font-size:11.5px; color:#6b6c64; text-align:center;">Este es un correo automático de confirmación, no hace falta que respondas.</div>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

    $message = [
        'subject' => 'Hemos recibido tu consulta — Construdepot by Quiles',
        'body' => ['contentType' => 'HTML', 'content' => $html],
        'toRecipients' => [['emailAddress' => ['address' => $email, 'name' => $nombreSeguro]]],
    ];

    graphSendMail($message, 'Autorespondedor contacto');
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

// La foto es opcional (obra o material a igualar). El navegador ya la
// comprime antes de enviarla (ver contacto.astro), pero el límite se
// vuelve a comprobar aquí porque el cliente se puede saltar: Graph solo
// admite fileAttachment de hasta ~3 MB codificados en base64 en una sola
// llamada, así que el original debe quedarse en 2 MB — mismo límite y
// mismo patrón que el CV de enviar-empleo.php.
$attachments = [];
$fotoError = null;
if (isset($_FILES['foto']) && $_FILES['foto']['error'] !== UPLOAD_ERR_NO_FILE) {
    $foto = $_FILES['foto'];

    if ($foto['error'] === UPLOAD_ERR_INI_SIZE || $foto['error'] === UPLOAD_ERR_FORM_SIZE) {
        $fotoError = 'La foto pesa demasiado (máximo 2 MB).';
    } elseif ($foto['error'] !== UPLOAD_ERR_OK) {
        $fotoError = 'No se ha podido leer la foto adjunta.';
    } elseif ($foto['size'] > 2 * 1024 * 1024) {
        $fotoError = 'La foto pesa demasiado (máximo 2 MB).';
    } else {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        // finfo_open() puede devolver false si la extensión fileinfo no está
        // disponible en el hosting — sin esta comprobación, finfo_file(false, ...)
        // lanza un error fatal de PHP en vez de un mensaje controlado.
        $mimeType = $finfo !== false ? finfo_file($finfo, $foto['tmp_name']) : false;
        if ($finfo !== false) {
            finfo_close($finfo);
        }
        $extensionesPorTipo = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];

        if (!isset($extensionesPorTipo[$mimeType])) {
            $fotoError = 'La foto debe ser JPG, PNG o WEBP.';
        } else {
            $contentBytes = base64_encode(file_get_contents($foto['tmp_name']));
            $attachments[] = [
                '@odata.type' => '#microsoft.graph.fileAttachment',
                'name' => 'Foto - ' . $nombre . '.' . $extensionesPorTipo[$mimeType],
                'contentType' => $mimeType,
                'contentBytes' => $contentBytes,
            ];
        }
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
    'Foto adjunta: ' . (count($attachments) > 0 ? 'sí' : 'no'),
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
    if ($email !== '') {
        sendContactAutoreply($email, $nombre, $telefono, $perfil, $mensaje);
    }
    respond(true, 'Gracias, hemos recibido tu consulta.');
}

respond(false, 'No se ha podido enviar el mensaje.');
