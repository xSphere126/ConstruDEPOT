<?php
/**
 * Verificación server-side de Cloudflare Turnstile, compartida por los
 * formularios de contacto y empleo — descarta bots que mandan POST
 * directo a los scripts sin pasar por el navegador (el honeypot _gotcha
 * de cada formulario solo pilla bots que rellenan TODOS los campos,
 * incluidos los ocultos; uno que solo mande los campos que le interesan
 * lo esquiva sin más). La clave secreta vive en config-local.php
 * (TURNSTILE_SECRET_KEY), nunca en el navegador — la que sí es pública es
 * la site key, en sitio/.env como PUBLIC_TURNSTILE_SITE_KEY.
 *
 * Opcional a propósito: si TURNSTILE_SECRET_KEY no está definida (todavía
 * no se ha dado de alta Cloudflare Turnstile), turnstileConfigured()
 * devuelve false y los formularios siguen funcionando exactamente igual
 * que antes, sin exigir verificación — activarlo es cuestión de rellenar
 * la clave, no de tocar código.
 */

function turnstileConfigured(): bool
{
    return defined('TURNSTILE_SECRET_KEY') && TURNSTILE_SECRET_KEY !== '';
}

function verifyTurnstile(string $token, string $remoteIp): bool
{
    if ($token === '') {
        return false;
    }

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => TURNSTILE_SECRET_KEY,
            'response' => $token,
            'remoteip' => $remoteIp,
        ]),
        CURLOPT_TIMEOUT => 10,
    ]);
    $raw = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($raw === false) {
        error_log('Turnstile: fallo de red al verificar — ' . $curlError);
        return false;
    }

    $data = json_decode($raw, true);
    return ($data['success'] ?? false) === true;
}
