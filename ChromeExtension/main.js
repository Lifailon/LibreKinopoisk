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
    // Опускаем регистр
    const titlePlex = titleElement ? titleElement.textContent.toLowerCase().replace(/ /g, '-') : '';

    // Добавить кнопки если находим оригинальное название
    if (title) {
        // Читаем массив и забираем год
        const yearElements = document.querySelectorAll('.styles_link__3QfAk')
        const yearElement = yearElements[0]
        const year = yearElement.textContent

        // Извлекаем содержимое токена из интерфейса расширения (локального хранилища)
        chrome.storage.local.get(['saveTokenKinopoisk'], function(result) {
            var Token = result.saveTokenKinopoisk
            /// // Google CSE (Custom Search Engine)
            /// // const Token = '' // API-ключ
            /// const cx = '35c78340f49eb474a' // ID поисковой системы 
            /// // Заголовок запроса для RapidAPI
            /// const headers = new Headers({
            ///     "X-RapidAPI-Key": Token,
            ///     "X-RapidAPI-Host": "google-search72.p.rapidapi.com"
            /// });
            /// // IMDb
            /// const queryIMDb = `allintitle:${titleElement.textContent} ${year} site:imdb.com` // Формируем запрос поиска с фильтрацией по сайту
            /// const urlGoogleSearchIMDb = `https://www.googleapis.com/customsearch/v1?key=${Token}&cx=${cx}&q=${encodeURIComponent(queryIMDb)}`
            /// // const urlGoogleSearchIMDb = `https://google-search72.p.rapidapi.com/search?q=${encodeURIComponent(queryIMDb)}`
            /// // Выполняем асинхронный запрос к API
            /// // fetch(urlGoogleSearchIMDb, { headers })
            /// fetch(urlGoogleSearchIMDb)
            /// .then(response => response.json())
            /// .then(data => {
            ///     const IMDbGoogleButton = newElementPadding({
            ///         tag: 'a',
            ///         id: 'IMDb-Google-Button',
            ///         href: data.items[0].link, // Забираем из содержимого массива поиска ссылку первого элемента
            ///         content: 'IMDb'
            ///     })
            ///     IMDbGoogleButton.setAttribute('target', '_blank')
            ///     buttonBlock.parentNode.insertBefore(IMDbGoogleButton, buttonBlock.nextSibling)
            /// })
            /// // TMDb
            /// const queryTMDb = `allintitle:${titleElement.textContent} ${year} site:themoviedb.org`
            /// const urlGoogleSearchTMDb = `https://www.googleapis.com/customsearch/v1?key=${Token}&cx=${cx}&q=${encodeURIComponent(queryTMDb)}`
            /// // const urlGoogleSearchTMDb = `https://google-search72.p.rapidapi.com/search?q=${encodeURIComponent(queryTMDb)}`
            /// // fetch(urlGoogleSearchTMDb, { headers })
            /// fetch(urlGoogleSearchTMDb)
            /// .then(response => response.json())
            /// .then(data => {
            ///     const TMDbGoogleButton = newElementPadding({
            ///         tag: 'a',
            ///         id: 'TMDb-Google-Button',
            ///         href: data.items[0].link,
            ///         content: 'TMDb'
            ///     })
            ///     TMDbGoogleButton.setAttribute('target', '_blank')
            ///     buttonBlock.parentNode.insertBefore(TMDbGoogleButton, buttonBlock.nextSibling)
            /// })
            /// // Torrent
            /// const queryTorrent = `allintext:${titleElement.textContent}`
            /// const urlGoogleSearchTorrent = `https://www.googleapis.com/customsearch/v1?key=${Token}&cx=${cx}&q=${encodeURIComponent(queryTorrent)}`
            /// fetch(urlGoogleSearchTorrent)
            /// .then(response => response.json())
            /// .then(data => {
            ///     data.items.forEach(item => {
            ///         const TorrentGoogleButton = newElementPadding({
            ///             tag: 'a',
            ///             id: `Torrent-Google-Button-${item.id}`, // Уникальный ID для каждой кнопки
            ///             href: item.link,
            ///             content: item.title
            ///         });
            ///         TorrentGoogleButton.setAttribute('target', '_blank');
            ///         buttonBlock.parentNode.insertBefore(TorrentGoogleButton, buttonBlock.nextSibling);
            ///     });
            /// });
        })
        // NoName-Club
        let urlNoNameClub = null
        if (url?.includes('series')) {
            urlNoNameClub = `https://nnmclub.to/forum/tracker.php?nm=${title}+${year}+сезон`
        } else {
            urlNoNameClub = `https://nnmclub.to/forum/tracker.php?nm=${title}+${year}`
        }
        const NoNameClubButton = newElementPadding({
            tag: 'a',
            id: 'NoNameClub-Button',
            href: urlNoNameClub,
            content: 'NoName-Club'
        })
        NoNameClubButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(NoNameClubButton, buttonBlock.nextSibling)

        // RuTracker
        let urlRuTracker = null
        if (url?.includes('series')) {
            urlRuTracker = `https://rutracker.org/forum/tracker.php?nm=${title}+${year}+сезон`
        } else {
            urlRuTracker = `https://rutracker.org/forum/tracker.php?nm=${title}+${year}`
        }
        const RuTrackerButton = newElementPadding({
            tag: 'a',
            id: 'RuTracker-Button',
            href: urlRuTracker,
            content: 'RuTracker'
        })
        RuTrackerButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(RuTrackerButton, buttonBlock.nextSibling)

        // Kinozal
        const KinozalButton = newElementPadding({
            tag: 'a',
            id: 'Kinozal-Button',
            href: `https://kinozal.tv/browse.php?s=${title}&d=${year}`,
            content: 'Кинозал'
        })
        KinozalButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(KinozalButton, buttonBlock.nextSibling)

        // Plex
        let typePlex = null
        if (url?.includes('film')) {
            typePlex = 'movie'
        }
        else if (url?.includes('series')) {
            typePlex = 'show'
        }
        const PlexButton = newElementPadding({
            tag: 'a',
            id: 'Plex-Button',
            href: `https://www.google.com/search?q=allintitle:${title}+${year}+site:plex.tv/${typePlex}&btnI`,
            // href: `https://watch.plex.tv/${typePlex}/${titlePlex}`,
            content: 'Plex'
        })
        PlexButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(PlexButton, buttonBlock.nextSibling)

        // TMDb 
        const TMDbGoogleButton = newElementPadding({
            tag: 'a',
            id: 'TMDb-Google-Button',
            href: `https://www.google.com/search?q=allintitle:${title}+${year}+site:themoviedb.org&btnI`,
            content: 'TMDb'
        })
        TMDbGoogleButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(TMDbGoogleButton, buttonBlock.nextSibling)

        // IMDb
        const IMDbGoogleButton = newElementPadding({
            tag: 'a',
            id: 'IMDb-Google-Button',
            href: `https://www.google.com/search?q=allintitle:${title}+${year}+site:imdb.com&btnI`,
            content: 'IMDb'
        })
        IMDbGoogleButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(IMDbGoogleButton, buttonBlock.nextSibling)

        // Wiki 
        const WikiGoogleButton = newElementPadding({
            tag: 'a',
            id: 'Wiki-Button',
            href: `https://ru.wikipedia.org/w/index.php?search=${title}`,
            content: 'Wikipedia'
        })
        WikiGoogleButton.setAttribute('target', '_blank')
        buttonBlock.parentNode.insertBefore(WikiGoogleButton, buttonBlock.nextSibling)

        // YouTube
        const YouTubeButton = newElementPadding({
            tag: 'a',
            id: 'YouTube-Button',
            href: `https://www.youtube.com/results?search_query=${title}+${year}+Trailer+Russian`,
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

// Ожидать полной загрузки страницы
// window.addEventListener('load', function() {
// Ожидать полной загрузки DOM (Document Object Model)
document.addEventListener("DOMContentLoaded", async function () {
    const url = window.location.href
    // Запускаем функция для версии сайта Кинопоиск HD
    if (url?.includes('hd.kinopoisk.ru/film')) {
        hd()
    }
    // Запускаем основную функцию, только если url содержит фильм или сериал
    else if (url?.includes('film') || url?.includes('series')) {
        main(url)
    }
})