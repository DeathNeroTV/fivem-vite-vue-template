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
    'server/**/*.lua'
}

shared_scripts { 
    'shared/**/*.lua'
}