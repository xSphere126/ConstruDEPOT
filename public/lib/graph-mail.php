<?php
/**
 * Envío de correo compartido vía Microsoft Graph API (OAuth2, client
 * credentials), usado por todos los formularios del sitio (contacto,
 * empleo...) contra el mismo buzón dedicado — ver config-local.example.php
 * en la raíz de /public/. No usa SMTP con usuario y contraseña: el tenant
 * de Microsoft 365 tiene activados los "Security Defaults", que bloquean
 * la autenticación básica de SMTP aunque el interruptor de "SMTP AUTH" del
 * buzón individual esté activado. OAuth2 vía Graph funciona igual con
 * Security Defaults puesto, sin tener que bajar la seguridad de toda la
 * organización.
 *
 * Requiere que quien lo incluya haya cargado ya config-local.php (define
 * GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, GRAPH_SENDER).
 */

// Paso 1: conseguir un token de acceso (OAuth2, client credentials) de la
// aplicación de Azure registrada para los formularios de la web.
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

// Paso 2: enviar el correo de verdad, como el buzón GRAPH_SENDER, vía Graph.
// $message es el objeto "message" tal cual lo espera la API de Graph
// (subject, body, toRecipients, replyTo, attachments...) — quien llama
// arma ese contenido, esta función solo se encarga de la autenticación y
// el envío HTTP. $logContext identifica el origen en los logs de error
// (qué formulario ha fallado) sin exponer detalle interno a quien lo rellena.
function graphSendMail(array $message, string $logContext): bool
{
    $tokenResult = graphToken();
    if (!$tokenResult['token']) {
        error_log($logContext . ': fallo al pedir token de Graph — ' . ($tokenResult['curlError'] ?: $tokenResult['raw']));
        return false;
    }

    $payload = ['message' => $message, 'saveToSentItems' => true];

    $ch = curl_init('https://graph.microsoft.com/v1.0/users/' . rawurlencode(GRAPH_SENDER) . '/sendMail');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $tokenResult['token'], 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 20,
    ]);
    $sendRaw = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status === 202) {
        return true;
    }

    error_log($logContext . ': fallo al enviar por Graph (' . $status . ') — ' . $sendRaw);
    return false;
}
