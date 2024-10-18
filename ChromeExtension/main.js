// Функция создания кнопки с применением стилей
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
    let buttonBlock = document.querySelector('div[class^="styles_buttons__"], div[class^="styles_watchOnlineBlock__"]')
    // Если элемент не найден, завершаем функцию
    if (!buttonBlock) {
        buttonBlock = document.querySelector("#__next > div.styles_root__aLAvz > div.styles_contentContainer__nsyyt.styles_baseContainer__6TbY3 > div:nth-child(1) > div.styles_content__ZVhAZ > div.styles_wrapper__vMIQB > div.styles_buttonBar__WIIgP > div")
    }
    else if (!buttonBlock) {
        return
    }

    // Поиск элемента оригинального названия на странице по классу
    let titleElement = document.querySelector('.styles_originalTitle__JaNKM') || document.querySelector('.styles_originalTitle__QWSWS')
    // Заменяем пробелы на символ сложения
    let title = titleElement ? titleElement.textContent.replace(/ /g, '+') : ''
    // Опускаем регистр
    const _title = titleElement ? titleElement.textContent.toLowerCase().replace(/ /g, '-') : ''

    // Поиск элементов исходного названия
    let titleElements = document.querySelectorAll('[class^="styles_title__"]')
    // Забираем второй элемент из массива заголовков
    let secondTitleElement = titleElements[1]
    // Получаем первый элемент из массива secondTitleElement
    // let firstTitleElement = secondTitleElement.querySelector('[class^="styles_title__"]')
    // Получаем все дочерние элементы span, забираем только первый и его содержимое
    let nameElement = secondTitleElement.querySelectorAll('span')[0]?.textContent || document.querySelector('h1.styles_movieTitleRoot__sThGD')?.textContent
    // Обрезаем строку до скобки и удаляем пробелы в начале и в конце
    let indexOfBracket = nameElement.indexOf('(')
    let name = nameElement
    if (indexOfBracket !== -1) {
        name = nameElement.substring(0, indexOfBracket).trim()
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
        const yearElement = document.querySelectorAll('.styles_link__3QfAk')[0]?.textContent
        year = ''
        if (yearElement) {
            year = yearElement
        }

        // Torrent
        chrome.storage.local.get(['TorrentCheckBox'], function (result) {
            if (result.TorrentCheckBox) {
                // BitRu
                let urlBitRu = null
                if (url?.includes('series')) {
                    urlBitRu = `https://bitru.org/browse.php?tmp=serial&s=${title}+${year}`
                } else {
                    urlBitRu = `https://bitru.org/browse.php?tmp=movie&s=${title}+${year}`
                }
                const BitRuButton = newElementPadding({
                    tag: 'a',
                    id: 'NoNameClub-Button',
                    href: urlBitRu,
                    content: 'BitRu'
                })
                BitRuButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(BitRuButton, buttonBlock.nextSibling)

                // NoName-Club
                const NoNameClubButton = newElementPadding({
                    tag: 'a',
                    id: 'NoNameClub-Button',
                    href: `https://nnmclub.to/forum/tracker.php?nm=${title}+${year}`,
                    content: 'NoName-Club'
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
                const RuTrackerButton = newElementPadding({
                    tag: 'a',
                    id: 'RuTracker-Button',
                    href: `https://rutracker.org/forum/tracker.php?nm=${title}+${year}`,
                    content: 'RuTracker'
                })
                RuTrackerButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(RuTrackerButton, buttonBlock.nextSibling)

                // Kinozal
                let urlKinozal = null
                if (url?.includes('series')) {
                    urlKinozal = `https://kinozal.tv/browse.php?s=${title}&d=${year}&c=1001`
                } else {
                    urlKinozal = `https://kinozal.tv/browse.php?s=${title}&d=${year}&c=1002`
                }
                const KinozalButton = newElementPadding({
                    tag: 'a',
                    id: 'Kinozal-Button',
                    href: urlKinozal,
                    content: 'Кинозал'
                })
                KinozalButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(KinozalButton, buttonBlock.nextSibling)
            }
        })

        // Database RU
        chrome.storage.local.get(['DbRuCheckBox'], function (result) {
            if (result.DbRuCheckBox) {

                // Lostfilm
                const LostFilmButton = newElementPadding({
                    tag: 'a',
                    id: 'Toramp-Google-Button',
                    href: `https://lostfilm.tv/search/?q=${title}`,
                    content: 'LostFilm'
                })
                LostFilmButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(LostFilmButton, buttonBlock.nextSibling)
                
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

                // FilmRu
                const FilmRuButton = newElementPadding({
                    tag: 'a',
                    id: 'Toramp-Google-Button',
                    href: `https://www.film.ru/search/result?type=movies&text=${title}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:film.ru&btnI`,
                    content: 'Film.ru'
                })
                FilmRuButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(FilmRuButton, buttonBlock.nextSibling)

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
        chrome.storage.local.get(['DbEnCheckBox'], function (result) {
            if (result.DbEnCheckBox) {
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
                    href: `https://watch.plex.tv/${typePlex}/${_title}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:plex.tv/${typePlex}&btnI`,
                    content: 'Plex'
                })
                PlexButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(PlexButton, buttonBlock.nextSibling)

                // TMDb 
                const TMDbButton = newElementPadding({
                    tag: 'a',
                    id: 'TMDb-Google-Button',
                    href: `https://www.themoviedb.org/search?query=${title}`,
                    // href: `https://www.google.com/search?q=${title}+${year}+site:themoviedb.org&btnI`,
                    content: 'TMDB'
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

        // Online
        chrome.storage.local.get(['OnlineCheckBox'], function (result) {
            if (result.OnlineCheckBox) {
                // HDRezka
                const HDRezkaButton = newElementPadding({
                    tag: 'a',
                    id: 'HDRezka-Button',
                    href: `https://hdrezka.ag/search/?do=search&subaction=search&q=${title}+${year}`,
                    content: 'HDRezka'
                })
                HDRezkaButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(HDRezkaButton, buttonBlock.nextSibling)

                // Zona
                const Zona = newElementPadding({
                    tag: 'a',
                    id: 'Zona-Button',
                    href: `https://g1.zona.plus/search/${name}`,
                    content: 'Zona'
                })
                Zona.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(Zona, buttonBlock.nextSibling)

                // Zeflix
                const Zeflix = newElementPadding({
                    tag: 'a',
                    id: 'Zeflix-Button',
                    href: `https://zeflix.online/index.php?do=search&subaction=search&search_start=0&story=${name}`,
                    content: 'Zetflix'
                })
                Zeflix.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(Zeflix, buttonBlock.nextSibling)
            }
        })

        // Wikipedia 
        chrome.storage.local.get(['WikiCheckBox'], function (result) {
            if (result.WikiCheckBox) {
                const WikiGoogleButton = newElementPadding({
                    tag: 'a',
                    id: 'Wiki-Button',
                    href: `https://${language}.wikipedia.org/w/index.php?search=${title}`,
                    content: 'Wikipedia'
                })
                WikiGoogleButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(WikiGoogleButton, buttonBlock.nextSibling)
            }
        })

        // YouTube
        chrome.storage.local.get(['YouTubeCheckBox'], function (result) {
            if (result.YouTubeCheckBox) {
                const YouTubeButton = newElementPadding({
                    tag: 'a',
                    id: 'YouTube-Button',
                    href: `https://youtube.com/results?search_query=${title}+${year}+трейлер`,
                    content: 'YouTube'
                })
                YouTubeButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(YouTubeButton, buttonBlock.nextSibling)
            }
        })

        // Trailer
        chrome.storage.local.get(['TrailerCheckBox'], function (result) {
            if (result.TrailerCheckBox) {
                const kinopoiskID = url?.split('/')?.filter(itm => Number(itm)).pop()
                const TrailerButton = newElementPadding({
                    tag: 'a',
                    id: 'YouTube-Button',
                    href: `https://widgets.kinopoisk.ru/discovery/film/${kinopoiskID}`,
                    content: 'Трейлер'
                })
                TrailerButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(TrailerButton, buttonBlock.nextSibling)
            }
        })
    }

    // Kinobox
    // Source: https://kinobox.tv
    chrome.storage.local.get(['KinoboxCheckBox'], function (result) {
        // Проверка включенного CheckBox в настройках
        if (result.KinoboxCheckBox) {
            // Извлекаем ID фильма из URL
            const kinopoiskID = url?.split('/')?.filter(itm => Number(itm)).pop()

            // Создаем кнопку для открытия плеера Kinobox
            const KinoboxButton = newElementPadding({
                tag: 'a',
                id: 'Kinobox-Button',
                href: '#',
                content: 'Смотреть онлайн'
            })

            // Добавляем обработчик события для кнопки
            KinoboxButton.addEventListener('click', function (event) {
                event.preventDefault()

                // Создаем модальное окно
                const modal = document.createElement('div')
                modal.style.position = 'fixed'
                modal.style.top = '0'
                modal.style.left = '0'
                modal.style.width = '100%'
                modal.style.height = '100%'
                modal.style.backgroundColor = 'rgba(0,0,0,0.7)'
                modal.style.zIndex = '10000'
                modal.style.display = 'flex'
                modal.style.alignItems = 'center'
                modal.style.justifyContent = 'center'

                // Создаем контейнер для плеера Kinobox
                const playerContainer = document.createElement('div')
                playerContainer.className = 'kinobox_player'
                playerContainer.style.width = '80%'
                playerContainer.style.height = '80%'
                playerContainer.style.backgroundColor = '#000'
                playerContainer.style.position = 'relative'

                // Создаем кнопку для закрытия модального окна
                const closeButton = document.createElement('span')
                closeButton.textContent = '×'
                closeButton.style.position = 'absolute'
                closeButton.style.top = '5px'
                closeButton.style.right = '20px'
                closeButton.style.color = '#fff'
                closeButton.style.fontSize = '40px'
                closeButton.style.cursor = 'pointer'
                closeButton.addEventListener('click', function () {
                    document.body.removeChild(modal)
                })

                // modal.appendChild(iframe)
                modal.appendChild(playerContainer)
                modal.appendChild(closeButton)
                document.body.appendChild(modal)

                // Встраиваем и выполняем код плеера Kinobox
                kbox('.kinobox_player', { search: { kinopoisk: kinopoiskID } })
            })
            buttonBlock.parentNode.insertBefore(KinoboxButton, buttonBlock.nextSibling)
        } else {
            // Извлекаем идентификатора фильма из параметра с URL
            const kinopoiskID = url?.split('/')?.filter(itm => Number(itm)).pop()
            // Bedemp2
            // const Bedemp2Button = newElementPadding({
            //     tag: 'a',
            //     id: 'Kinobox-Button',
            //     href: `https://api.bedemp2.ws/embed/kp/${kinopoiskID}`,
            //     content: 'Плеер'
            // })
            // Bedemp2Button.setAttribute('target', '_blank')
            // buttonBlock.parentNode.insertBefore(Bedemp2Button, buttonBlock.nextSibling)

            // Kinobox
            const KinoboxButton = newElementPadding({
                tag: 'a',
                id: 'Kinobox-Button',
                href: `https://kinomix.web.app/#${kinopoiskID}`,
                content: 'Смотреть онлайн'
            })
            // Открывать ссылку в новой вкладке
            KinoboxButton.setAttribute('target', '_blank')
            buttonBlock.parentNode.insertBefore(KinoboxButton, buttonBlock.nextSibling)
        }
    })
}

// Функция добавления кнопок на странице hd.kinopoisk
const hd = async function (buttonBlock) {
    // Забираем название фильма
    const filmName = document.querySelector("#__next > div.styles_root__S2643 > div.styles_body__XTb_o.main-view.with-transition > div > div > main > div.FilmContent_wrapper__EicQU > div > div > section > div > div.ContentWrapper_title__uVspG.ContentWrapper_title_compact__nO1AL > h1 > img").getAttribute('alt').replace('Смотреть','').trim().replace(/ /g,'+')
    let url = ''
    if (filmName) {
        url = `https://kinomix.web.app/#${filmName}`
    } else {
        url = `https://kinomix.web.app`
    }
    const KinoboxButton = newElementPadding({
        tag: 'a',
        id: 'Kinobox-Button',
        href: url,
        content: '▶ Смотреть онлайн'
    })
    KinoboxButton.style.borderRadius = '40px' // Увеличиваем скругление углов
    KinoboxButton.style.padding = '30px' // Увеличиваем внутренний отступ
    KinoboxButton.style.fontSize = '26px' // Увеличиваем размер шрифта
    KinoboxButton.setAttribute('target', '_blank')
    buttonBlock.parentNode.insertBefore(KinoboxButton, buttonBlock.nextSibling)
}

// Функция наблюдения за DOM
function observeDOM() {
    const observer = new MutationObserver((mutations, observer) => {
        const buttonBlock = document.querySelector("#__next > div.styles_root__S2643 > div.styles_body__XTb_o.main-view.with-transition > div > div > main > div.FilmContent_wrapper__EicQU > div > div > section > div > div.ContentWrapper_content__J_a5d > section > div.ContentOverview_actions__wFERv.ContentOverview_align_top__d4BAW > div > div")
        // Запускаем функцию добавления кнопок, когда элемент найден
        if (buttonBlock) {
            hd(buttonBlock)
            // Останавливаем наблюдение
            observer.disconnect()
        }
    })
    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
}

// Ожидать полной загрузки страницы
// window.addEventListener('load', function() {
// Ожидать полной загрузки DOM (Document Object Model)
document.addEventListener("DOMContentLoaded", async function () {
    const url = window.location.href
    // Запускаем функция для версии сайта Кинопоиск HD
    if (url?.includes('hd.kinopoisk.ru/film')) {
        observeDOM()
    }
    // Запускаем основную функцию, только если url содержит фильм или сериал
    else if (url?.includes('film') || url?.includes('series')) {
        main(url)
    }
})