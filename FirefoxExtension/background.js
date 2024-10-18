// Значения по умолчанию при установке расширения
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get([
        'darkModeBox',
        'MagnetCheckBox',
        'SearchCheckBox',
        'TorApiServer',
        'KinoboxCheckBox',
        'TrailerCheckBox', 
        'YouTubeCheckBox', 
        'WikiCheckBox', 
        'OnlineCheckBox',
        'DbEnCheckBox', 
        'DbRuCheckBox', 
        'TorrentCheckBox'
    ], function(data) {
        if (typeof data.darkModeBox === 'undefined') {
            chrome.storage.local.set({ 'darkModeBox': true })
        }
        if (typeof data.MagnetCheckBox === 'undefined') {
            chrome.storage.local.set({ 'MagnetCheckBox': true })
        }
        if (typeof data.SearchCheckBox === 'undefined') {
            chrome.storage.local.set({ 'SearchCheckBox': true })
        }
        if (typeof data.TorApiServer === 'undefined') {
            chrome.storage.local.set({ 'TorApiServer': 'https://torapi.vercel.app' })
        }
        if (typeof data.KinoboxCheckBox === 'undefined') {
            chrome.storage.local.set({ 'KinoboxCheckBox': true })
        }
        if (typeof data.TrailerCheckBox === 'undefined') {
            chrome.storage.local.set({ 'TrailerCheckBox': true })
        }
        if (typeof data.YouTubeCheckBox === 'undefined') {
            chrome.storage.local.set({ 'YouTubeCheckBox': true })
        }
        if (typeof data.WikiCheckBox === 'undefined') {
            chrome.storage.local.set({ 'WikiCheckBox': true })
        }
        if (typeof data.OnlineCheckBox === 'undefined') {
            chrome.storage.local.set({ 'OnlineCheckBox': true })
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

// Контекстное меню для поиска на сайте Kinopoisk
chrome.runtime.onInstalled.addListener(function () {
    // Создание родительского элемента меню
    chrome.contextMenus.create({
        id: "LibreKinopoisk",
        title: "Поиск на сайте",
        contexts: ["selection"]
    })
    // Создание дочерних элементов меню
    chrome.contextMenus.create({
        id: "KinopoiskSearch",
        title: "Кинопоиск",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "IMDbSearch",
        title: "IMDb",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "TMDBSearch",
        title: "TMDB",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "KinoboxSearch",
        title: "Kinobox",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "YouTubeSearch",
        title: "YouTube",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "WikipediaSearch",
        title: "Wikipedia",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "ZetflixSearch",
        title: "Zetflix",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "ZonaSearch",
        title: "Zona",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "HDRezkaSearch",
        title: "HDRezka",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "KinoriumSearch",
        title: "Кинориум",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "TorampSearch",
        title: "Торамп",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "FilmRuSearch",
        title: "Film.ru",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "MyShowsSearch",
        title: "MyShows",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "LostFilmSearch",
        title: "LostFilm",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "KinozalSearch",
        title: "Кинозал",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "RuTrackerSearch",
        title: "RuTracker",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "RuTorSearch",
        title: "RuTor",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "NoNameClubSearch",
        title: "NoNameClub",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "BitRuSearch",
        title: "BitRu",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
    chrome.contextMenus.create({
        id: "GitHubSearch",
        title: "GitHub",
        parentId: "LibreKinopoisk",
        contexts: ["selection"]
    })
})

// Обработка нажатий по элементам контекстного меню
chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.selectionText) {
        let query = encodeURIComponent(clickData.selectionText)
        let url
        if (clickData.menuItemId === "KinopoiskSearch") {
            url = `https://kinopoisk.ru/index.php?kp_query=${query}`
        }
        else if (clickData.menuItemId === "IMDbSearch") {
            url = `https://imdb.com/find/?q=${query}`
        }
        else if (clickData.menuItemId === "TMDBSearch") {
            url = `https://themoviedb.org/search?query=${query}`
        }
        else if (clickData.menuItemId === "KinoboxSearch") {
            url = `https://kinomix.web.app/?q=${query}`
        }
        else if (clickData.menuItemId === "YouTubeSearch") {
            url = `https://youtube.com/results?search_query=${query}`
        }
        else if (clickData.menuItemId === "ZetflixSearch") {
            url = `https://zeflix.online/index.php?do=search&subaction=search&search_start=0&story=${query}`
        }
        else if (clickData.menuItemId === "ZonaSearch") {
            url = `https://g1.zona.plus/search/${query}`
        }
        else if (clickData.menuItemId === "HDRezkaSearch") {
            url = `https://hdrezka.ag/search/?do=search&subaction=search&q=${query}`
        }
        else if (clickData.menuItemId === "WikipediaSearch") {
            url = `https://ru.wikipedia.org/wiki/${query}`
        }
        else if (clickData.menuItemId === "KinoriumSearch") {
            url = `https://ru.kinorium.com/search/?q=${query}`
        }
        else if (clickData.menuItemId === "TorampSearch") {
            url = `https://toramp.com/ru/search/?q=${query}`
        }
        else if (clickData.menuItemId === "FilmRuSearch") {
            url = `https://film.ru/search/result?text=${query}`
        }
        else if (clickData.menuItemId === "MyShowsSearch") {
            url = `https://myshows.me/search/?q=${query}`
        }
        else if (clickData.menuItemId === "LostFilmSearch") {
            url = `https://lostfilm.tv/search/?q=${query}`
        }
        else if (clickData.menuItemId === "KinozalSearch") {
            url = `https://kinozal.tv/browse.php?s=${query}`
        }
        else if (clickData.menuItemId === "RuTrackerSearch") {
            url = `https://rutracker.org/forum/tracker.php?nm=${query}`
        }
        else if (clickData.menuItemId === "RuTorSearch") {
            url = `https://rutor.info/search/0/0/300/0/${query}`
        }
        else if (clickData.menuItemId === "NoNameClubSearch") {
            url = `https://nnmclub.to/forum/tracker.php?nm=${query}`
        }
        else if (clickData.menuItemId === "BitRuSearch") {
            url = `https://bitru.org/browse.php?s=${query}`
        }
        else if (clickData.menuItemId === "GitHubSearch") {
            url = `https://github.com/search?type=repositories&q=${query}`
        }
        if (url) {
            chrome.tabs.create({ url: url })
        }
    }
})

// Открытие модального окна при нажатии Ctrl+Shift+F
browser.commands.onCommand.addListener((command) => {
    if (command === "toggle-interface") {
        // Загружаем скрипт
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            if (tabs.length > 0) {
                browser.tabs.executeScript(tabs[0].id, { file: 'torapi.js' })
                // После загрузки скрипта выполняем функцию displayTorrentsOnPage
                .then(() => {
                    browser.tabs.executeScript(tabs[0].id, {
                        code: 'if (typeof displayTorrentsOnPage === "function") { displayTorrentsOnPage(); }'
                    })
                })
            }
        })
    }
})