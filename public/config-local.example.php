<?php
// Plantilla de configuración del formulario de contacto.
//
// Copia este archivo a "config-local.php" (mismo directorio, con GUION no
// punto: IONOS renombra "config.local.php" a "config-local.php" al
// subirlo — comprobado con el gestor de archivos y con curl, pedir la
// versión con punto responde con un 301 a la de guion) y rellena los
// valores reales. config-local.php NUNCA se sube a git (está en
// .gitignore) porque el repositorio de GitHub es público — solo debe
// existir en el servidor de IONOS, subido a mano por FTP junto al resto
// de la web.

// El correo se envía a través de Microsoft Graph API (OAuth2, client
// credentials), como el buzón dedicado web@construdepot.es en Microsoft
// 365 — NO por SMTP con usuario y contraseña: el tenant tiene activados
// los "Security Defaults", que bloquean la autenticación básica de SMTP
// sin importar el interruptor de "SMTP AUTH" del buzón individual.
//
// Para conseguir estos 4 valores hace falta registrar una aplicación en
// portal.azure.com (con permisos de administrador de Microsoft 365):
//
// 1. Entra ID > Registros de aplicaciones > Nuevo registro. Cualquier
//    nombre (p. ej. "Formulario web Construdepot"), tipos de cuenta
//    "solo este directorio".
// 2. En la página de la app recién creada: "Id. de aplicación (cliente)"
//    → GRAPH_CLIENT_ID. "Id. de directorio (inquilino)" → GRAPH_TENANT_ID.
// 3. Certificados y secretos > Nuevo secreto de cliente. El VALOR (no el
//    "Id. de secreto") se copia justo al crearlo, no se puede volver a
//    ver después → GRAPH_CLIENT_SECRET.
// 4. Permisos de API > Agregar un permiso > Microsoft Graph > Permisos de
//    aplicación > buscar "Mail.Send" > agregarlo. Luego el botón
//    "Conceder consentimiento de administrador" (imprescindible, si no
//    se queda en "no concedido" y el envío falla).
define('GRAPH_TENANT_ID', 'CAMBIA-ESTO-por-el-Id-de-directorio-tenant');
define('GRAPH_CLIENT_ID', 'CAMBIA-ESTO-por-el-Id-de-aplicacion-cliente');
define('GRAPH_CLIENT_SECRET', 'CAMBIA-ESTO-por-el-valor-del-secreto-de-cliente');

// Buzón dedicado desde el que se envía (no a leer) los mensajes del
// formulario, alojado en Microsoft 365 / Outlook (NO en IONOS).
define('GRAPH_SENDER', 'web@construdepot.es');

// Dirección donde deben llegar las consultas del formulario.
define('MAIL_TO', 'info@construdepot.es');
define('MAIL_TO_NAME', 'Construdepot by Quiles');
