<?php
// Plantilla de configuración del formulario de contacto.
//
// Copia este archivo a "config.local.php" (mismo directorio) y rellena los
// valores reales. config.local.php NUNCA se sube a git (está en .gitignore)
// porque el repositorio de GitHub es público — solo debe existir en el
// servidor de IONOS, subido a mano por FTP junto al resto de la web.

// Buzón dedicado a enviar (no a leer) los mensajes del formulario:
// web@construdepot.es, alojado en Microsoft 365 / Outlook (NO en IONOS),
// por eso el host SMTP es de Microsoft y no smtp.ionos.es.
//
// Aviso importante: muchos tenants de Microsoft 365 tienen la autenticación
// SMTP (SMTP AUTH) desactivada por defecto para buzones nuevos, y si el
// buzón tiene verificación en dos pasos activada, la contraseña normal NO
// sirve para esto — hace falta una "contraseña de aplicación" específica.
// Si el envío falla con error de autenticación, revisar ambas cosas en
// admin.microsoft.com (Usuarios > el buzón > Correo > Administrar SMTP AUTH).
define('SMTP_HOST', 'smtp.office365.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'web@construdepot.es');
define('SMTP_PASS', 'CAMBIA-ESTO-por-la-contraseña-real-del-buzón (o contraseña de aplicación)');

// Dirección donde deben llegar las consultas del formulario.
define('MAIL_TO', 'info@construdepot.es');
define('MAIL_TO_NAME', 'Construdepot by Quiles');
