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
    let title = titleElement ? titleElement.textContent.replace(/ /g, '+') : ''
    // Опускаем регистр
    const _title = titleElement ? titleElement.textContent.toLowerCase().replace(/ /g, '-') : ''

    // Поиск элементов исходного названия
    var titleElements = document.querySelectorAll('[class^="styles_title__"]')
    // Забираем второй элемент из массива заголовков
    var secondTitleElement = titleElements[1]
    // Получаем первый элемент из массива secondTitleElement
    var firstTitleElement = secondTitleElement.querySelector('[class^="styles_title__"]')
    // Получаем все дочерние элементы span, забираем только первый и его содержимое
    var nameElement = firstTitleElement.querySelectorAll('span')[0].textContent
    // Обрезаем строку до скобки (не включая) и удаляем пробелы в начале и в конце
    var indexOfBracket = nameElement.indexOf('(')
    if (indexOfBracket !== -1) {
        var name = nameElement.substring(0, indexOfBracket).trim()
    }

    // Задаем исходный язык для Wikipedia
    let language = 'ru'
    // Если оригинальное название отсутствует, обновляем на исходное название
    if (!title) {
        if (name) {
            title = name
        }
    }

    // Добавить кнопки если находим оригинальное название
    if (title) {
        // Читаем массив и забираем год
        const yearElements = document.querySelectorAll('.styles_link__3QfAk')
        const yearElement = yearElements[0]
        const year = yearElement.textContent

        // Извлекаем содержимое токена из интерфейса расширения (локального хранилища)
        chrome.storage.local.get(['saveTokenKinopoisk'], function (result) {
            var Token = result.saveTokenKinopoisk
            // Google CSE (Custom Search Engine)
            // const Token = '' // API-ключ
            const cx = 'e37dd9d94f75f4c8d' // ID поисковой системы для поиска в rutor.org/torrent*
            // const cx = '357fa5a907d2f4437' // ID поисковой системы для поиска в nnmclub.to/forum/viewtopic**
            // const cx = '87cb27565e927482b' // ID поисковой системы для поиска в kinozal.tv/details*
            // Заголовок запроса для RapidAPI
            // const headers = new Headers({
            //     "X-RapidAPI-Key": Token,
            //     "X-RapidAPI-Host": "google-search72.p.rapidapi.com"
            // })
            const urlGoogleSearchTorrent = `https://www.googleapis.com/customsearch/v1?q=intitle:${titleElement.textContent}&key=${Token}&cx=${cx}&lr=lang_${language}&num=10&$start=1`
            // const urlGoogleSearchTMDb = `https://google-search72.p.rapidapi.com/search?q=${titleElement.textContent}`
            // fetch(urlGoogleSearchTMDb, { headers })
            fetch(urlGoogleSearchTorrent)
                .then(response => response.json())
                .then(data => {
                    // Проверяем, что массив не пустой (не выводить ошибки в консоль)
                    if (data.items && data.items.length > 0) {
                        data.items.forEach(item => {
                            // Проверяем заголовки содержимого поиска (отсеять ложные совпадения)
                            if (item.title.includes(titleElement.textContent)) {
                                let newTitle = item.title.replace(/- rutor\.info/g, '').replace(/rutor\.info ::/g, '').replace(/\.\.\./g, '')
                                let downloadLink = item.link.replace(/torrent/, 'download').replace(/(\d+).*/, '$1')
                                const TorrentGoogleButton = newElementPadding({
                                    tag: 'a',
                                    id: `Torrent-Google-Button-${item.id}`,
                                    href: downloadLink,
                                    content: newTitle
                                })
                                buttonBlock.parentNode.insertBefore(TorrentGoogleButton, buttonBlock.nextSibling)
                            }
                        })
                    }
                })
        })

        // Torrent
        // Проверка включенного CheckBox в настройках
        chrome.storage.local.get(['TorrentCheckBox'], function (result) {
            var TorrentCheckBox = result.TorrentCheckBox
            if (TorrentCheckBox) {
                // Rezka
                const RezkaButton = newElementPadding({
                    tag: 'a',
                    id: 'Rezka-Button',
                    href: `https://rezka.cc/ajax_search?q=${title}+${year}`,
                    content: 'Rezka'
                })
                RezkaButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(RezkaButton, buttonBlock.nextSibling)

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
                    content: 'NNM-Club'
                })
                NoNameClubButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(NoNameClubButton, buttonBlock.nextSibling)

                // RuTor
                const RuTorButton = newElementPadding({
                    tag: 'a',
                    id: 'RuTor-Button',
                    // Все слова (100) / Любое из слов (200) / Логическое выражение (300)
                    href: `https://rutor.info/search/0/0/300/0/${title}+${year}`,
                    content: 'RuTor'
                })
                RuTorButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(RuTorButton, buttonBlock.nextSibling)

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
            }
        })

        // Database RU
        // Проверка включенного CheckBox в настройках
        chrome.storage.local.get(['DbRuCheckBox'], function (result) {
            var DbRuCheckBox = result.DbRuCheckBox
            if (DbRuCheckBox) {
                // FilmRu
                const FilmRuButton = newElementPadding({
                    tag: 'a',
                    id: 'Toramp-Google-Button',
                    href: `https://www.film.ru/search/result?type=movies&text=${title}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:film.ru&btnI`,
                    content: 'Film'
                })
                FilmRuButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(FilmRuButton, buttonBlock.nextSibling)

                // MyShows
                const MyShowsButton = newElementPadding({
                    tag: 'a',
                    id: 'Toramp-Google-Button',
                    href: `https://myshows.me/search/?q=${title}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:myshows.me&btnI`,
                    content: 'MyShows'
                })
                MyShowsButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(MyShowsButton, buttonBlock.nextSibling)

                // Toramp 
                const TorampButton = newElementPadding({
                    tag: 'a',
                    id: 'Toramp-Google-Button',
                    href: `https://www.toramp.com/ru/search/?q=${title}+${year}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:toramp.com&btnI`,
                    content: 'Торамп'
                })
                TorampButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(TorampButton, buttonBlock.nextSibling)

                // Kinorium 
                const KinoriumButton = newElementPadding({
                    tag: 'a',
                    id: 'Kinorium-Google-Button',
                    href: `https://ru.kinorium.com/search/?type=movie&q=${title}+${year}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:ru.kinorium.com&btnI`,
                    content: 'Кинориум'
                })
                KinoriumButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(KinoriumButton, buttonBlock.nextSibling)

            }
        })

        // Database EN
        // Проверка включенного CheckBox в настройках
        chrome.storage.local.get(['DbEnCheckBox'], function (result) {
            var DbEnCheckBox = result.DbEnCheckBox
            if (DbEnCheckBox) {
                // Plex
                // let typePlex = null
                // if (url?.includes('film')) {
                //     typePlex = 'movie'
                // }
                // else if (url?.includes('series')) {
                //     typePlex = 'show'
                // }
                // const PlexButton = newElementPadding({
                //     tag: 'a',
                //     id: 'Plex-Button',
                //     href: `https://watch.plex.tv/${typePlex}/${_title}`,
                //     // href: `https://www.google.com/search?q=${title}+${year}+site:plex.tv/${typePlex}&btnI`,
                //     content: 'Plex'
                // })
                // PlexButton.setAttribute('target', '_blank')
                // buttonBlock.parentNode.insertBefore(PlexButton, buttonBlock.nextSibling)

                // TMDb 
                const TMDbButton = newElementPadding({
                    tag: 'a',
                    id: 'TMDb-Google-Button',
                    href: `https://www.themoviedb.org/search?query=${title}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:themoviedb.org&btnI`,
                    content: 'TMDb'
                })
                TMDbButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(TMDbButton, buttonBlock.nextSibling)

                // IMDb
                const IMDbButton = newElementPadding({
                    tag: 'a',
                    id: 'IMDb-Google-Button',
                    href: `https://www.imdb.com/find/?q=${title}+${year}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:imdb.com&btnI`,
                    content: 'IMDb'
                })
                IMDbButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(IMDbButton, buttonBlock.nextSibling)
            }
        })

        // Wikipedia 
        // Проверка включенного CheckBox в настройках
        chrome.storage.local.get(['WikiCheckBox'], function (result) {
            var WikiCheckBox = result.WikiCheckBox
            if (WikiCheckBox) {
                const WikiGoogleButton = newElementPadding({
                    tag: 'a',
                    id: 'Wiki-Button',
                    href: `https://${language}.wikipedia.org/w/index.php?search=${title}`,
                    content: 'Wiki'
                })
                WikiGoogleButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(WikiGoogleButton, buttonBlock.nextSibling)
            }
        })

        // YouTube
        // Проверка включенного CheckBox в настройках
        chrome.storage.local.get(['YouTubeCheckBox'], function (result) {
            var YouTubeCheckBox = result.YouTubeCheckBox
            if (YouTubeCheckBox) {
                const YouTubeButton = newElementPadding({
                    tag: 'a',
                    id: 'YouTube-Button',
                    href: `https://www.youtube.com/results?search_query=${title}+${year}+трейлер`,
                    content: 'Трейлеры'
                })
                YouTubeButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(YouTubeButton, buttonBlock.nextSibling)
            }
        })

        // Online
        // Проверка включенного CheckBox в настройках
        chrome.storage.local.get(['KinoboxCheckBox'], function (result) {
            var KinoboxCheckBox = result.KinoboxCheckBox
            if (KinoboxCheckBox) {
                // Zetflix
                // let typeZetflix = null
                // if (url?.includes('film')) {
                //     typeZetflix = 'films'
                // }
                // else if (url?.includes('series')) {
                //     typeZetflix = 'serials'
                // }
                // const ZetflixButton = newElementPadding({
                //     tag: 'a',
                //     id: 'Kinobox-Button',
                //     href: `https://online.ztflix.zone/${typeZetflix}/${_title}`,
                //     content: 'Zetflix'
                // })
                // ZetflixButton.setAttribute('target', '_blank')
                // buttonBlock.parentNode.insertBefore(ZetflixButton, buttonBlock.nextSibling)

                // HDRezka
                const HDRezkaButton = newElementPadding({
                    tag: 'a',
                    id: 'HDRezka-Button',
                    href: `https://hdrezka.ag/search/?do=search&subaction=search&q=${title}+${year}`,
                    content: 'HDRezka'
                })
                HDRezkaButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(HDRezkaButton, buttonBlock.nextSibling)
            }
        })
    }

    // Kinobox
    chrome.storage.local.get(['KinoboxCheckBox'], function (result) {
        var KinoboxCheckBox = result.KinoboxCheckBox;
        // Проверка включенного CheckBox в настройках
        if (KinoboxCheckBox) {
            // Извлекаем ID фильма из URL
            const kinopoiskID = url?.split('/')?.filter(itm => Number(itm)).pop();

            // Создаем кнопку для открытия плеера Kinobox
            const KinoboxButton = newElementPadding({
                tag: 'a',
                id: 'Kinobox-Button',
                href: '#',
                content: 'Смотреть онлайн'
            });

            // Добавляем обработчик события для кнопки
            KinoboxButton.addEventListener('click', function (event) {
                event.preventDefault();

                // Создаем модальное окно
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
                modal.style.zIndex = '10000';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';

                // const iframe = document.createElement('iframe')
                // iframe.src = `https://kinomix.web.app/#${kinopoiskID}`
                // iframe.style.width = '80%'
                // iframe.style.height = '80%'
                // iframe.style.border = 'none'

                // Создаем контейнер для плеера Kinobox
                const playerContainer = document.createElement('div');
                playerContainer.className = 'kinobox_player';
                playerContainer.style.width = '80%';
                playerContainer.style.height = '80%';
                playerContainer.style.backgroundColor = '#000';
                playerContainer.style.position = 'relative';

                // Создаем кнопку для закрытия модального окна
                const closeButton = document.createElement('span');
                closeButton.textContent = '×';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '10px';
                closeButton.style.right = '20px';
                closeButton.style.color = '#fff';
                closeButton.style.fontSize = '30px';
                closeButton.style.cursor = 'pointer';
                closeButton.addEventListener('click', function () {
                    document.body.removeChild(modal);
                });

                // modal.appendChild(iframe)
                modal.appendChild(playerContainer);
                modal.appendChild(closeButton);
                document.body.appendChild(modal);

                // Встраиваем и выполняем код плеера Kinobox
                (function () {
                    kbox('.kinobox_player', { search: { kinopoisk: kinopoiskID } });
                })();
            });

            buttonBlock.parentNode.insertBefore(KinoboxButton, buttonBlock.nextSibling);
        }
    });
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