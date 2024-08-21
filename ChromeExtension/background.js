// Значения по умолчанию при установке расширения
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get([
        'TorApiServer',
        'textInput',
        'KinoboxCheckBox',
        'OnlineCheckBox',
        'YouTubeCheckBox', 
        'WikiCheckBox', 
        'DbEnCheckBox', 
        'DbRuCheckBox', 
        'TorrentCheckBox'
    ], function(data) {
        if (typeof data.TorApiServer === 'undefined') {
            chrome.storage.local.set({ 'TorApiServer': 'https://torapi.vercel.app' })
        }
        if (typeof data.KinoboxCheckBox === 'undefined') {
            chrome.storage.local.set({ 'KinoboxCheckBox': true })
        }
        if (typeof data.OnlineCheckBox === 'undefined') {
            chrome.storage.local.set({ 'OnlineCheckBox': true })
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

// Отключение интерфейса расширения на системных вкладках

function isSystemPage(url) {
    return url.startsWith("chrome://")
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (isSystemPage(tab.url)) {
            chrome.action.disable(tabId)
        } else {
            chrome.action.enable(tabId)
        }
    }
})

chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
        if (tab.url) {
            if (isSystemPage(tab.url)) {
                chrome.action.disable(tab.id)
            } else {
                chrome.action.enable(tab.id)
            }
        }
    })
})