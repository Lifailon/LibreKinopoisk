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
        const element = document.querySelector('.styles_originalTitle__JaNKM')
        const title = element ? element.textContent.replace(/ /g, '+') : ''

        // Добавить кнопки если находим оригинальное название
        if (title) {
            // Поиск на YouTube
            const YouTubeButton = newElementPadding({
                tag: 'a',
                id: 'YouTube-Button',
                href: `https://www.youtube.com/results?search_query=${title}+Trailer`,
                content: 'Трейлер',
            })
            YouTubeButton.setAttribute('target', '_blank')
            buttonBlock.parentNode.insertBefore(YouTubeButton, buttonBlock.nextSibling)

            // Читаем массив и забираем год
            const yearElements = document.querySelectorAll('.styles_link__3QfAk')
            const yearElement = yearElements[0]
            const year = yearElement.textContent

            // Поиск в Кинозал по шаблону
            const KinozalButton = newElementPadding({
                tag: 'a',
                id: 'Google-Button',
                href: `https://kinozal.tv/browse.php?s=${title}&d=${year}`,
                content: `Кинозал`,
            })
            KinozalButton.setAttribute('target', '_blank')
            buttonBlock.parentNode.insertBefore(KinozalButton, buttonBlock.nextSibling)
        }

        // Извлекаем идентификатора фильма из параметра с URL
        const kinopoiskID = url?.split('/')?.filter(itm => Number(itm)).pop()
        // Создание кнопки для перехода на Kinobox
        const KinoboxButton = newElementPadding({
            tag: 'a',
            id: 'Kinobox-Button',
            href: `https://kinomix.web.app/#${kinopoiskID}`,
            content: 'Смотреть онлайн',
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
            content: 'Смотреть онлайн',
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