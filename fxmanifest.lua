fx_version 'cerulean'
game 'gta5'
author ''
version ''

lua54 'yes'
use_experimental_fxv2_oal 'yes'

ui_page 'dist/index.html'

files {
    'dist/index.html',
    'dist/assets/**/*'
}

client_scripts { 
    '@qbx_core/modules/playerdata.lua',
    'client/**/*.lua'
}

server_scripts { 
    '@oxmysql/lib/MySQL.lua',
    'server/**/*.lua'
}

shared_scripts { 
    '@ox_lib/init.lua',
    '@qbx_core/modules/lib.lua',
    'config.lua',
    'shared/**/*.lua'
}