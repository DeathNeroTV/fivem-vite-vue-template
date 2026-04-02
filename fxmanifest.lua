fx_version 'cerulean'
game 'gta5'
author ''
version ''

ui_page 'dist/index.html'

files {
    'dist/index.html',
    'dist/assets/**/*'
}

client_scripts { 
    'client/**/*.lua'
}

server_scripts { 
    '@oxmysql/lib/MySQL.lua',
    'server/**/*.lua'
}

shared_scripts { 
    '@ox_lib/init.lua',
    'shared/**/*.lua'
}