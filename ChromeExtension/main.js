// Ожидать полной загрузки страницы
// window.addEventListener('load', function() {})
// Ожидать полной загрузки Document Object Model
document.addEventListener("DOMContentLoaded", async function () {
    // Функция создания нового HTML элемента с применением стилей
    const newElementPadding = ({ tag, id, content, href }) => {
        const el = document.createElement(tag)
        el.setAttribute('id', id)
        el.setAttribute('href', href)
        el.innerHTML = content
        el.style.borderRadius = '20px' // скругление углов
        el.style.backgroundColor = '#ff6600' // цвет фона
        el.style.color = 'aliceblue' // цвет текста
        el.style.padding = '15px' // внутренний отступ
        el.style.fontSize = '16px' // размер шрифта
        el.style.fontWeight = '600' // насыщенность шрифта
        el.style.textDecoration = 'none' // отсутствие подчеркивания
        el.style.display = 'inline-block' // расположить кнопки рядом
        el.style.marginRight = '10px' // отступ между кнопками
        el.style.marginTop = '25px' // отступ сверху
        el.style.marginBottom = '-10px' // отступ снизу
        el.style.transition = 'transform 0.3s ease' // добавляем transition для анимации
        el.addEventListener('mouseenter', () => { // добавляем обработчик события для наведения курсора на кнопку
            el.style.transform = 'scale(1.05)' // увеличиваем размер кнопки при наведении
        })
        el.addEventListener('mouseleave', () => { // добавляем обработчик события для ухода курсора с кнопки
            el.style.transform = 'scale(1)' // возвращаем кнопку к исходному размеру
        })
        return el
    }

    // Функция для отрисовки кнопок на странице
    const main = async function (url) {
        // Поиск элемента кнопки на странице по классу, после которой будет отрисовка новых кнопок
        const buttonBlock = document.querySelector('div[class^="styles_buttons__"], div[class^="styles_watchOnlineBlock__"]')
        // Если элемент не найден, завершаем функцию
        if (!buttonBlock) {
            return
        }
        
        // Поиск элемента оригинального названия на странице по классу
        const titleElement = document.querySelector('.styles_originalTitle__JaNKM')
        const title = titleElement ? titleElement.textContent.replace(/ /g, '+') : ''

        // Добавить кнопки если находим оригинальное название
        if (title) {
            // Читаем массив и забираем год
            const yearElements = document.querySelectorAll('.styles_link__3QfAk')
            const yearElement = yearElements[0]
            const year = yearElement.textContent

            // Извлекаем содержимое токена из интерфейса расширения (локального хранилища)
            chrome.storage.local.get(['saveTokenKinopoisk'], function(result) {
                var Token = result.saveTokenKinopoisk
                // Google CSE (Custom Search Engine)
                // const Token = '' // API-ключ
                const cx = '35c78340f49eb474a' // ID поисковой системы 
                // IMDb
                const queryIMDb = `allintitle:${titleElement.textContent} ${year} site:imdb.com` // Формируем запрос поиска с фильтрацией по сайту
                const urlGoogleSearchIMDb = `https://www.googleapis.com/customsearch/v1?key=${Token}&cx=${cx}&q=${encodeURIComponent(queryIMDb)}`
                // Выполняем асинхронный запрос к API
                fetch(urlGoogleSearchIMDb)
                .then(response => response.json())
                .then(data => {
                    const IMDbGoogleButton = newElementPadding({
                        tag: 'a',
                        id: 'IMDb-Google-Button',
                        href: data.items[0].link, // Забираем из содержимого массива поиска ссылку первого элемента
                        content: 'IMDb'
                    })
                    IMDbGoogleButton.setAttribute('target', '_blank')
                    buttonBlock.parentNode.insertBefore(IMDbGoogleButton, buttonBlock.nextSibling)
                })
                // TMDb
                const queryTMDb = `allintitle:${titleElement.textContent} ${year} site:themoviedb.org`
                const urlGoogleSearchTMDb = `https://www.googleapis.com/customsearch/v1?key=${Token}&cx=${cx}&q=${encodeURIComponent(queryTMDb)}`
                fetch(urlGoogleSearchTMDb)
                .then(response => response.json())
                .then(data => {
                    const TMDbGoogleButton = newElementPadding({
                        tag: 'a',
                        id: 'TMDb-Google-Button',
                        href: data.items[0].link,
                        content: 'TMDb'
                    })
                    TMDbGoogleButton.setAttribute('target', '_blank')
                    buttonBlock.parentNode.insertBefore(TMDbGoogleButton, buttonBlock.nextSibling)
                })
                // Torrent
                // allintext:the rookie site:fasts-torrent.net
                const queryTorrent = `allintext:${titleElement.textContent} site:fasts-torrent.net`
                const urlGoogleSearchTorrent = `https://www.googleapis.com/customsearch/v1?key=${Token}&cx=${cx}&q=${encodeURIComponent(queryTorrent)}`
                fetch(urlGoogleSearchTorrent)
                .then(response => response.json())
                .then(data => {
                    const TorrentGoogleButton = newElementPadding({
                        tag: 'a',
                        id: 'Torrent-Google-Button',
                        href: data.items[0].link,
                        content: data.items[0].title
                    })
                    TorrentGoogleButton.setAttribute('target', '_blank')
                    buttonBlock.parentNode.insertBefore(TorrentGoogleButton, buttonBlock.nextSibling)
                })
            })
            // Поиск в Кинозал по шаблону
            const KinozalButton = newElementPadding({
                tag: 'a',
                id: 'Kinozal-Button',
                href: `https://kinozal.tv/browse.php?s=${title}&d=${year}`,
                content: 'Кинозал'
            })
            KinozalButton.setAttribute('target', '_blank')
            buttonBlock.parentNode.insertBefore(KinozalButton, buttonBlock.nextSibling)

            // Поиск на YouTube
            const YouTubeButton = newElementPadding({
                tag: 'a',
                id: 'YouTube-Button',
                href: `https://www.youtube.com/results?search_query=${title}+Trailer+Russian`,
                content: 'Трейлеры'
            })
            YouTubeButton.setAttribute('target', '_blank')
            buttonBlock.parentNode.insertBefore(YouTubeButton, buttonBlock.nextSibling)
        }

        // Извлекаем идентификатора фильма из параметра с URL
        const kinopoiskID = url?.split('/')?.filter(itm => Number(itm)).pop()
        // Создание кнопки для перехода на Kinobox
        const KinoboxButton = newElementPadding({
            tag: 'a',
            id: 'Kinobox-Button',
            href: `https://kinomix.web.app/#${kinopoiskID}`,
            content: 'Смотреть онлайн'
        })
        // Открывать ссылку в новой вкладке
        KinoboxButton.setAttribute('target', '_blank')
        // Добавляем кнопку после блока кнопок на странице
        buttonBlock.parentNode.insertBefore(KinoboxButton, buttonBlock.nextSibling)
    }

    // Функция для отображения кнопок на странице hd.kinopoisk
    const hd = async function () {
        const buttonBlock = document.querySelector('div[class^="ContentActions_root__"], div[class^="ContentActions_buttons__"]')
        if (!buttonBlock) {
            return
        }
        const KinoboxButton = newElementPadding({
            tag: 'a',
            id: 'Kinobox-Button',
            href: `https://kinomix.web.app`,
            content: 'Смотреть онлайн'
        })
        KinoboxButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(KinoboxButton, buttonBlock.nextSibling)
    }

    const url = window.location.href
    // Запускаем основную функцию, только если url содержит фильм или сериал
    if (url?.includes('film') || url?.includes('series')) {
        main(url)
    }
    if (url?.includes('hd.kinopoisk')) {
        hd()
    }
})