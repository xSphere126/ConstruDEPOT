<?php
// Plantilla de configuración del formulario de contacto.
//
// Copia este archivo a "config.local.php" (mismo directorio) y rellena los
// valores reales. config.local.php NUNCA se sube a git (está en .gitignore)
// porque el repositorio de GitHub es público — solo debe existir en el
// servidor de IONOS, subido a mano por FTP junto al resto de la web.

// Buzón dedicado a enviar (no a leer) los mensajes del formulario.
// Crear en el panel de IONOS como Correo Básico, ej. web@construdepot.es.
define('SMTP_HOST', 'smtp.ionos.es');
define('SMTP_PORT', 587);
define('SMTP_USER', 'web@construdepot.es');
define('SMTP_PASS', 'CAMBIA-ESTO-por-la-contraseña-real-del-buzón');

// Dirección donde deben llegar las consultas del formulario.
define('MAIL_TO', 'info@construdepot.es');
define('MAIL_TO_NAME', 'Construdepot by Quiles');
