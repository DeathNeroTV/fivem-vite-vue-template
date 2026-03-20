RegisterNUICallback(Config.closeEvent, function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = Config.closeEvent })
    cb('ok')
end)

RegisterCommand(Config.openCommand, function()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = Config.openCommand })
    SendNUIMessage({
        action = 'open'
    })
end)