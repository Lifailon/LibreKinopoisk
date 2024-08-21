chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get([
        'torSrv',
        'textInput',
        'KinoboxCheckBox',
        'YouTubeCheckBox', 
        'WikiCheckBox', 
        'DbEnCheckBox', 
        'DbRuCheckBox', 
        'TorrentCheckBox'
    ], function(data) {
        if (typeof data.torSrv === 'undefined') {
            chrome.storage.local.set({ 'torSrv': 'https://torapi.vercel.app' })
        }
        if (typeof data.KinoboxCheckBox === 'undefined') {
            chrome.storage.local.set({ 'KinoboxCheckBox': true })
        }
        if (typeof data.YouTubeCheckBox === 'undefined') {
            chrome.storage.local.set({ 'YouTubeCheckBox': true })
        }
        if (typeof data.WikiCheckBox === 'undefined') {
            chrome.storage.local.set({ 'WikiCheckBox': true })
        }
        if (typeof data.DbEnCheckBox === 'undefined') {
            chrome.storage.local.set({ 'DbEnCheckBox': true })
        }
        if (typeof data.DbRuCheckBox === 'undefined') {
            chrome.storage.local.set({ 'DbRuCheckBox': true })
        }
        if (typeof data.TorrentCheckBox === 'undefined') {
            chrome.storage.local.set({ 'TorrentCheckBox': true })
        }
    })
})
