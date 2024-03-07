document.addEventListener("DOMContentLoaded", function () {
    // Определение асинхронной функции action
    const action = async function () {
        // Объект YOK с настройками и данными
        const YOK = {
            targetApi: 'kinobox', // Целевой API
            kinopoiskId: null, // Идентификатор фильма
            moviesList: null, // Список фильмов
            error: null, // Ошибка (если есть)
            apis: [ // Настройки для доступных API
                {
                    name: 'kinobox',
                    apiLink: 'https://kinobox.tv/api',
                    players: ['all', 'main'],
                    method: 'GET',
                    headers: {
                        'origin': 'https://kinomix.web.app',
                        'referer': 'https://kinomix.web.app/',
                        'Content-Type': 'application/json',
                    }
                }
            ]
        }

        // Функция для извлечения данных о фильме из JSON-LD скрипта на странице
        const getMovieData = function () {
            try {
                const context = document.querySelector('script[type="application/ld+json"]')
                if (!context) {
                    throw new Error('context не найден')
                }
                return JSON.parse(context.innerHTML)
            } catch (e) {
                return { error: e?.message }
            }
        }

        // Функция для получения списка фильмов с API
        const getMovies = async function ({ url, method, headers, body }) {
            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'accept': '*/*',
                        'accept-encoding': 'gzip, deflate, br',
                        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                        ...headers
                    },
                    body
                })
                const result = await response.json()
                return { result }
            } catch (e) {
                return { error: e.message }
            }
        }

        // Функция для создания нового элемента HTML
        const newElement = ({ tag, id, className, content, href }) => {
            const el = document.createElement(tag)
            el.setAttribute('id', id)
            el.setAttribute('class', className)
            el.setAttribute('href', href)
            el.innerHTML = content
            return el
        }

        // Функция для отрисовки данных на странице
        const renderData = function (content) {
            try {
                // Поиск блока кнопок на странице
                const buttonBlockVone = document.querySelectorAll('div[class^="styles_buttons__"]')[0]
                const buttonBlockVtwo = document.querySelectorAll('div[class^="styles_watchOnlineBlock__"]')[0]
                const buttonBlockVthree = document.querySelectorAll('div[class^="styles_watchOnlineDescription__"]')[0]
                const buttonBlock = buttonBlockVthree || buttonBlockVtwo || buttonBlockVone
                // Если блок кнопок не найден, выбрасываем ошибку
                if (!buttonBlock) {
                    throw new Error('Блок кнопок не найден ')
                }
                // Создание и добавление нового элемента блока с данными контента
                buttonBlock.appendChild(newElement({
                    tag: 'div',
                    id: 'YOK-block',
                    className: 'YOK-block',
                    content: `<div>${yoLogo('🍿')}</div><div id="YOK-block-content">${content}</div>`
                }))
                // Создание и добавление кнопки для перехода на Kinomix
                const kinomixButton = newElement({
                    tag: 'a',
                    id: 'YOK-kinomix-button',
                    className: 'YOK-kinomix-button YOK-itm', // добавляем общий класс и класс для стилизации
                    content: 'Kinomix',
                    href: `https://kinomix.web.app/#${YOK.kinopoiskId}`,
                    target: '_blank'
                });
                buttonBlock.appendChild(kinomixButton);

            } catch (e) {
                // Если произошла ошибка, добавляем сообщение об ошибке на страницу
                document.body.appendChild(newElement({
                    tag: 'div',
                    id: 'YOK-block-error',
                    className: 'YOK-block-error',
                    content: `<div class="YOK-block-error-wrap"><div>${yoLogo('🍿')}</div><div>${content || e?.message}</div></div>`
                }))
            }
        }

        // Функция для отрисовки информации на странице
        const renderInfo = (content) => {
            const yokBlock = document.querySelector('div[id="YOK-block-content"]')
            if (yokBlock) {
                // Если блок с данными уже существует, обновляем его содержимое
                yokBlock.innerHTML = content
                return
            }
            // Если блок с данными не существует, создаем его
            return renderData(content)
        }

        // Функция для создания ссылки на фильм
        const linkMovie = ({ lable, href }) => `<a class="YOK-itm" href='${href}' target='_blank'>${lable}</a>`

        // Функция для создания правой стрелки SVG
        const rightSvg = (width = 32, height = 32, fill = '#FFFFFF') => `<span class="YOK-svg-right"><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${fill}" viewBox="0 0 24 24"><path d="M15.2929 14.2929L16 15L19 12L16 9L15.2929 9.70711L17.0858 11.5L5 11.5V12.5L17.0857 12.5L15.2929 14.2929Z"/></svg></span>`

        // Функция для создания логотипа YoK
        const yoLogo = (info = '') => `<span id="YOK-logo-info" class="YOK-logo-info">YoK${rightSvg()} ${info}</span>`

        // HTML-код прогресс бара
        const progressBar = `<div class="YOK-spinner-box">
                      <div class="YOK-pulse-container">  
                        <div class="YOK-pulse-bubble YOK-pulse-bubble-1"></div>
                        <div class="YOK-pulse-bubble YOK-pulse-bubble-2"></div>
                        <div class="YOK-pulse-bubble YOK-pulse-bubble-3"></div>
                      </div>
                    </div>`

        try {
            // Получение данных о фильме
            const { url, error } = getMovieData()
            if (error) {
                throw new Error(error)
            }
            // Извлечение идентификатора фильма из URL
            const kinopoisk = url.split('/')?.filter(itm => Number(itm)).pop()
            if (!kinopoisk) {
                throw new Error('id фильма не найден')
            }
            YOK.kinopoiskId = kinopoisk
            // Отрисовка прогресс бара
            renderData(progressBar)
            // Получение настроек API для выбранного API
            const { apiLink, players, method, headers } = YOK.apis.filter(itm => itm.name === YOK.targetApi)?.pop()
            let apiUrl = apiLink
            if (!apiLink) {
                throw new Error('api link не найден')
            }
            // Формирование URL для запроса данных о фильме
            switch (YOK.targetApi) {
                case 'kinobox':
                    apiUrl = `${apiLink}/players/${players[0]}?kinopoisk=${YOK?.kinopoiskId}`
                    break
            }
            // Получение списка фильмов с API
            const { result: moviesList, error: loadingErr, message: loadingError } = await getMovies({
                url: apiUrl,
                method,
                headers
            })
            if (loadingErr || loadingError) {
                throw new Error(loadingErr || loadingError)
            }
            YOK.moviesList = moviesList
            let linkMovieList = []
            // Обработка списка фильмов в зависимости от целевого API
            switch (YOK.targetApi) {
                case 'kinobox':
                    // Если список фильмов пустой, выводим сообщение об ошибке
                    if (!Array.isArray(moviesList) || moviesList.length === 0) {
                        renderInfo(`<span class="YOK-error">😿 не найдено</span>`)
                        return
                    }
                    // Создание списка ссылок на фильмы
                    linkMovieList = moviesList.map(({ iframeUrl, quality, translation }) => linkMovie({
                        href: iframeUrl,
                        lable: quality ? `${quality} ${translation}` : 'смотреть'
                    }))
                    break
            }
            // Отрисовка списка ссылок на фильмы или сообщения об ошибке
            renderInfo(linkMovieList.length === 0 ? `<span class="YOK-error">😿 не найдено</span>` : linkMovieList.join(''))
        } catch (e) {
            // Обработка ошибок и отображение сообщения об ошибке
            YOK.error = e.message
            renderInfo(`<span class="YOK-error">😿 ${e?.message || 'не найдено'}</span>`)
        }
    }

    // Функция для заполнения контента на странице
    const fillContent = () => {
        const url = window.location.href
        const yBlock = document.getElementById('YOK-block')
        // Проверка наличия ключевых слов в URL
        if (!url?.includes('series') && !url?.includes('film')) {
            return
        }
        // Если блок с данными уже существует, удаляем его
        if (yBlock) {
            yBlock.remove()
        }
        // Запуск функции action для заполнения контента
        action()
    }

    // Слушатель изменений в хранилище Chrome
    chrome.storage.onChanged.addListener(changes => {
        try {
            const { YOK } = changes
            const { newValue, oldValue } = YOK
            if (newValue?.title === oldValue?.title) {
                return
            }
            // Перезаполнение контента при изменении данных в хранилище
            fillContent()
        } catch (e) {
            console.error({ YOK: e.message })
        }
    })

    // Запуск функции fillContent для заполнения контента на странице
    fillContent()
});