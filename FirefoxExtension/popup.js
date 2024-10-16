// Сохранение адреса сервера в поле ввода интерфейса
var textInput = document.getElementById('textInput')
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('TorApiServer', function(data) {
        textInput.value = data.TorApiServer
    })
})

// Сохранение адреса сервера TorAPI в локальное хранилище
document.getElementById('saveButton').addEventListener('click', function() {
    var button = document.getElementById('saveButton')
    var text = document.getElementById('textInput').value
    // Отключаем обработчики событий для изменения цвета фона при наведении
    button.onmouseover = null
    button.onmouseleave = null
    // Если поле ввода пустое, обновить на значение по умолчанию
    if (text === 'undefined' || text === '' || text === null) {
        text = 'https://torapi.vercel.app'
    }
    // Сохраняем текст в локальное хранилище
    chrome.storage.local.set({ 'TorApiServer': text }, function() {
        // Оповещаем пользователя о сохранении
        button.innerHTML = 'Адрес сервера сохранен'
        button.style.backgroundColor = '#4CAF50' // Зеленый цвет фона
        button.style.animation = 'savedEffect 3s ease-in-out'
        // Обновляем поле ввода текста
        textInput.value = text
        // Убираем эффект через 3 секунды и возвращаем исходный цвет и эффекты
        setTimeout(function() {
            button.innerHTML = 'Сохранить'
            button.style.backgroundColor = '#ff6600cb' // Возвращаем исходный цвет фона
            // Включаем обработчики событий для изменения цвета фона при наведении 
            button.onmouseover = function() {
                button.style.backgroundColor = '#ff6600'
            }
            button.onmouseleave = function() {
                button.style.backgroundColor = '#ff6600cb'
            }
        }, 3000)
    })
})

// Логика запуска функции открытия модального окна для поиска раздач в торрент трекерах через TorAPI
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('showTorrentTableButton').addEventListener('click', function() {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            if (tabs.length > 0) {
                browser.tabs.executeScript(
                    tabs[0].id, {
                        file: 'torapi.js'
                    }
                ).then(() => {
                    browser.tabs.executeScript(tabs[0].id, {
                        code: 'displayTorrentsOnPage()'
                    })
                })
                // Закрытие всплывающего окна расширения
                setTimeout(() => {
                    window.close()
                }, 100)
            }
        })
    })
})

// Получаем все ссылки на странице
var links = document.querySelectorAll('a')
// Добавляем обработчик события для каждой ссылки
links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Отменяем стандартное действие ссылки
        event.preventDefault()
        // Получаем URL, на который ссылается ссылка
        var url = link.href
        // Открываем этот URL в новой вкладке
        chrome.tabs.create({ url: url })
    })
})

// Забираем элементы кнопок Настройки и Начало и контейнеры их состояний
var settingsButton = document.getElementById('settingsButton')
var homeButton = document.getElementById('homeButton')
var settingsState = document.getElementById('settingsState')
var homeState = document.getElementById('homeState')

// Обработчик события для кнопки "Настройки"
settingsButton.addEventListener('click', function() {
    homeState.style.display = 'none' // Скрываем начальное состояние
    settingsState.style.display = 'block' // Отображаем состояние настроек
})

// Обработчик события для кнопки "Начало"
homeButton.addEventListener('click', function() {
    settingsState.style.display = 'none' // Скрываем состояние настроек
    homeState.style.display = 'block' // Отображаем начальное состояние
})

// Забираем все CheckBox
var MagnetCheckBox = document.getElementById('MagnetCheckBox')
var darkModeBox = document.getElementById('darkModeBox')
var SearchCheckBox = document.getElementById('SearchCheckBox')
var KinoboxCheckBox = document.getElementById('KinoboxCheckBox')
var TrailerCheckBox = document.getElementById('TrailerCheckBox')
var YouTubeCheckBox = document.getElementById('YouTubeCheckBox')
var WikiCheckBox = document.getElementById('WikiCheckBox')
var OnlineCheckBox = document.getElementById('OnlineCheckBox')
var DbEnCheckBox = document.getElementById('DbEnCheckBox')
var DbRuCheckBox = document.getElementById('DbRuCheckBox')
var TorrentCheckBox = document.getElementById('TorrentCheckBox')

// При загрузке страницы, загружаем значение из chrome.storage и устанавливаем его для чекбокса
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('darkModeBox', function(data) {
        darkModeBox.checked = data.darkModeBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('MagnetCheckBox', function(data) {
        MagnetCheckBox.checked = data.MagnetCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('SearchCheckBox', function(data) {
        SearchCheckBox.checked = data.SearchCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('KinoboxCheckBox', function(data) {
        KinoboxCheckBox.checked = data.KinoboxCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('TrailerCheckBox', function(data) {
        TrailerCheckBox.checked = data.TrailerCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('YouTubeCheckBox', function(data) {
        YouTubeCheckBox.checked = data.YouTubeCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('WikiCheckBox', function(data) {
        WikiCheckBox.checked = data.WikiCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('OnlineCheckBox', function(data) {
        OnlineCheckBox.checked = data.OnlineCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('DbEnCheckBox', function(data) {
        DbEnCheckBox.checked = data.DbEnCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('DbRuCheckBox', function(data) {
        DbRuCheckBox.checked = data.DbRuCheckBox
    })
})
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('TorrentCheckBox', function(data) {
        TorrentCheckBox.checked = data.TorrentCheckBox
    })
})

// При изменении состояния чекбокса сохраняем состояние чекбокса в chrome.storage
darkModeBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'darkModeBox': this.checked })
})
MagnetCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'MagnetCheckBox': this.checked })
})
SearchCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'SearchCheckBox': this.checked })
})
KinoboxCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'KinoboxCheckBox': this.checked })
})
TrailerCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'TrailerCheckBox': this.checked })
})
YouTubeCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'YouTubeCheckBox': this.checked })
})
WikiCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'WikiCheckBox': this.checked })
})
OnlineCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'OnlineCheckBox': this.checked })
})
DbEnCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'DbEnCheckBox': this.checked })
})
DbRuCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'DbRuCheckBox': this.checked })
})
TorrentCheckBox.addEventListener('change', function() {
    chrome.storage.local.set({ 'TorrentCheckBox': this.checked })
})