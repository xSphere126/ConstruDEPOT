# Restringe el permiso "Mail.Send" (Microsoft Graph, permiso de
# aplicación) de la app registrada para el formulario de contacto, para
# que solo pueda enviar correo como el buzón web@construdepot.es — sin
# esta política, ese permiso deja a la app enviar como CUALQUIER buzón
# del tenant, no solo el que usa el formulario.
#
# EJECUTAR A MANO, de forma interactiva, con una cuenta de administrador
# de Microsoft 365/Exchange Online. Nadie ejecuta esto automáticamente;
# es un paso de endurecimiento de seguridad que se hace una sola vez.
#
# Requisito: módulo ExchangeOnlineManagement instalado.
#   Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser

Connect-ExchangeOnline -UserPrincipalName admin@construdepot.es  # <- cambia por tu cuenta de administrador real

# Sustituye por el "Id. de aplicación (cliente)" real de la app
# registrada en Azure Portal (Entra ID > Registros de aplicaciones > la
# app del formulario > "Id. de aplicación (cliente)"). Es el mismo valor
# que va como GRAPH_CLIENT_ID en config-local.php.
$appId = 'CAMBIA-ESTO-por-el-Client-ID-de-la-app'

# Buzón al que se restringe el permiso Mail.Send de esta app.
$mailbox = 'web@construdepot.es'

New-ApplicationAccessPolicy `
    -AppId $appId `
    -PolicyScopeGroupId $mailbox `
    -AccessRight RestrictAccess `
    -Description 'Formulario de contacto de la web: solo puede enviar como web@construdepot.es'

# Verificación (la política puede tardar unos minutos en aplicarse antes
# de que estos comandos den el resultado esperado):

# 1) Confirma que la app SÍ puede acceder al buzón que necesita:
# Test-ApplicationAccessPolicy -AppId $appId -Identity $mailbox

# 2) Confirma que la app NO puede acceder a ningún otro buzón del tenant
#    (cambia por una dirección real distinta para comprobarlo, por
#    ejemplo la del propio destinatario del formulario):
# Test-ApplicationAccessPolicy -AppId $appId -Identity 'info@construdepot.es'
