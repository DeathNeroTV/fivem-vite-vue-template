Config = {}

Config.CommandName = 'resourcename'

Config.Events = {
    NUI = {
        Open = 'resourceName:nui:open',
        Close = 'resourceName:nui:close'
    },
    Server = {},
    Client = {
        Close = 'resourceName:client:close'
    }
}