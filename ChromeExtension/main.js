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
    const buttonBlock = document.querySelector('div[class^="styles_buttons__"], div[class^="styles_watchOnlineBlock__"]')
    // Если элемент не найден, завершаем функцию
    if (!buttonBlock) {
        return
    }

    // Поиск элемента оригинального названия на странице по классу
    const titleElement = document.querySelector('.styles_originalTitle__JaNKM')
    // Заменяем пробелы на символ сложения
    let title = titleElement ? titleElement.textContent.replace(/ /g, '+') : ''
    // Опускаем регистр
    const _title = titleElement ? titleElement.textContent.toLowerCase().replace(/ /g, '-') : ''

    // Поиск элементов исходного названия
    var titleElements = document.querySelectorAll('[class^="styles_title__"]')
    // Забираем второй элемент из массива заголовков
    var secondTitleElement = titleElements[1]
    // Получаем первый элемент из массива secondTitleElement
    // var firstTitleElement = secondTitleElement.querySelector('[class^="styles_title__"]')
    // Получаем все дочерние элементы span, забираем только первый и его содержимое
    var nameElement = secondTitleElement.querySelectorAll('span')[0].textContent
    // Обрезаем строку до скобки и удаляем пробелы в начале и в конце
    var indexOfBracket = nameElement.indexOf('(')
    if (indexOfBracket !== -1) {
        var name = nameElement.substring(0, indexOfBracket).trim()
    } else {
        var name = nameElement
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

        // Torrent
        chrome.storage.local.get(['TorrentCheckBox'], function (result) {
            var TorrentCheckBox = result.TorrentCheckBox
            if (TorrentCheckBox) {
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
        chrome.storage.local.get(['DbRuCheckBox'], function (result) {
            var DbRuCheckBox = result.DbRuCheckBox
            if (DbRuCheckBox) {

                // Lostfilm
                const LostfilmButton = newElementPadding({
                    tag: 'a',
                    id: 'Toramp-Google-Button',
                    href: `https://lostfilm.tv/search/?q=${title}`,
                    content: 'Lostfilm'
                })
                LostfilmButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(LostfilmButton, buttonBlock.nextSibling)
                
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
            var OnlineCheckBox = result.OnlineCheckBox
            if (OnlineCheckBox) {
                // HDRezka Tracker 
                const RezkaButton = newElementPadding({
                    tag: 'a',
                    id: 'Rezka-Button',
                    href: `https://rezka.cc/ajax_search?q=${title}+${year}`,
                    content: 'HDRezka Tracker'
                })
                RezkaButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(RezkaButton, buttonBlock.nextSibling)

                // HDRezka
                const HDRezkaButton = newElementPadding({
                    tag: 'a',
                    id: 'HDRezka-Button',
                    href: `https://hdrezka.ag/search/?do=search&subaction=search&q=${title}+${year}`,
                    content: 'HDRezka'
                })
                HDRezkaButton.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(HDRezkaButton, buttonBlock.nextSibling)

                // Zeflix
                const Zeflix = newElementPadding({
                    tag: 'a',
                    id: 'Zeflix-Button',
                    href: `https://zeflix.online/index.php?do=search&subaction=search&search_start=0&story=${name}`,
                    content: 'Zetflix'
                })
                Zeflix.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(Zeflix, buttonBlock.nextSibling)

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
                //     id: 'Zetflix-Button',
                //     href: `https://online.ztflix.zone/${typeZetflix}/${_title}`,
                //     content: 'Zetflix'
                // })
                // ZetflixButton.setAttribute('target', '_blank')
                // buttonBlock.parentNode.insertBefore(ZetflixButton, buttonBlock.nextSibling)

                // Zona
                const Zona = newElementPadding({
                    tag: 'a',
                    id: 'Zona-Button',
                    href: `https://g1.zona.plus/search/${name}`,
                    content: 'Zona'
                })
                Zona.setAttribute('target', '_blank')
                buttonBlock.parentNode.insertBefore(Zona, buttonBlock.nextSibling)
            }
        })

        // Wikipedia 
        chrome.storage.local.get(['WikiCheckBox'], function (result) {
            var WikiCheckBox = result.WikiCheckBox
            if (WikiCheckBox) {
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

        // TorAPI
        // Source: https://github.com/Lifailon/TorAPI
        chrome.storage.local.get(['TorApiServer'], function(result) {
            var TorApiServer = result.TorApiServer
            // Создаем кнопку для отображения таблицы раздач
            const torrentButton = newElementPadding({
                tag: 'a',
                id: 'TorAPI-Button',
                href: '#',
                content: 'Раздачи'
            });
        
            // Добавляем обработчик события для кнопки
            torrentButton.addEventListener('click', function (event) {
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
                modal.style.flexDirection = 'column';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
        
                // Контейнер для таблицы
                const tableContainer = document.createElement('div');
                tableContainer.style.width = '80%';
                tableContainer.style.height = '80%';
                tableContainer.style.backgroundColor = '#2d2d2d';
                tableContainer.style.padding = '20px';
                tableContainer.style.borderRadius = '10px';
                tableContainer.style.overflowY = 'auto';
                tableContainer.style.position = 'relative';
                tableContainer.style.display = 'flex';
                tableContainer.style.flexDirection = 'column';
        
                // Контейнер для поля ввода и кнопки поиска
                const searchContainer = document.createElement('div');
                searchContainer.style.display = 'flex';
                searchContainer.style.alignItems = 'center';
                searchContainer.style.marginBottom = '10px';
                searchContainer.style.gap = '10px'; // добавляет промежуток между элементами

                // Поле ввода для ввода запроса вручную
                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Поиск по названию';
                searchInput.style.marginBottom = '10px';
                searchInput.style.padding = '10px';
                searchInput.style.borderRadius = '5px';
                searchInput.style.border = '1px solid #ddd';
                searchInput.style.width = '100%';
                searchInput.style.boxSizing = 'border-box';
                searchInput.style.flexGrow = '1'; // Расширяет input на всю оставшуюся ширину
                searchInput.style.height = '42px'; // Устанавливает высоту поля ввода
                searchInput.style.backgroundColor = '#333';
                searchInput.style.color = '#fff';

                // Кнопка для выполнения поиска
                const searchButton = document.createElement('button');
                searchButton.textContent = 'Поиск';
                searchButton.style.padding = '10px 20px';
                searchButton.style.backgroundColor = '#1e90ff';
                searchButton.style.color = '#fff';
                searchButton.style.border = 'none';
                searchButton.style.borderRadius = '5px';
                searchButton.style.cursor = 'pointer';
                searchButton.style.marginLeft = '10px'; // Отступ от поля ввода до кнопки
                searchButton.style.height = '42px'; // Устанавливает высоту кнопки
                searchButton.style.lineHeight = '22px'; // Выровнить текст по центру
                searchButton.style.marginTop = '-10px'; // Поднимаем кнопку на 5px
                
                // Обработчик события для кнопки поиска
                searchButton.addEventListener('click', function () {
                    const query = searchInput.value.trim();
                    if (query) {
                        // Выполняем запрос с новым значением
                        fetch(`${TorApiServer}/api/search/title/all?query=${query}`)
                        .then(response => response.json())
                        .then(data => {
                            displayTorrents(data);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    }
                });

                // Поле ввода для фильтрации
                const filterInput = document.createElement('input');
                filterInput.type = 'text';
                filterInput.placeholder = 'Фильтрация по названию';
                filterInput.style.marginBottom = '10px';
                filterInput.style.padding = '10px';
                filterInput.style.borderRadius = '5px';
                filterInput.style.border = '1px solid #ddd';
                filterInput.style.width = '100%';
                filterInput.style.boxSizing = 'border-box';
                filterInput.style.flexGrow = '1'; // Позволяет полю фильтрации занимать оставшееся пространство
                filterInput.style.height = '42px'; // Устанавливает высоту поля фильтрации
                filterInput.style.marginLeft = '10px'; // Отступ между кнопкой и фильтром
                filterInput.style.backgroundColor = '#333';
                filterInput.style.color = '#fff';

                // Функция для фильтрации
                filterInput.addEventListener('input', function () {
                    const filterValue = filterInput.value.toLowerCase();
                    const rows = tableBody.querySelectorAll('tr');
                    rows.forEach(row => {
                        const titleCell = row.querySelectorAll('td')[1];
                        if (titleCell) {
                            const titleText = titleCell.textContent.toLowerCase();
                            if (titleText.includes(filterValue)) {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        }
                    });
                });

                // Создаем таблицу
                const table = document.createElement('table');
                table.id = 'torrent-table';
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                table.style.color = '#fff';
        
                // Заголовки таблицы
                const tableHead = document.createElement('thead');
                tableHead.innerHTML = `
                    <tr style="background-color: #444;">
                        <th style="padding: 10px; border-bottom: 1px solid #555; cursor: pointer;">Трекер</th>
                        <th style="padding: 10px; border-bottom: 1px solid #555; cursor: pointer;">Название</th>
                        <th style="padding: 10px; border-bottom: 1px solid #555; cursor: pointer;">Размер</th>
                        <th style="padding: 10px; border-bottom: 1px solid #555; cursor: pointer;">Сиды</th>
                        <th style="padding: 10px; border-bottom: 1px solid #555; cursor: pointer;">Пиры</th>
                        <th style="padding: 10px; border-bottom: 1px solid #555; cursor: pointer;">Дата</th>
                        <th style="padding: 10px; border-bottom: 1px solid #555; cursor: pointer;">Торрент</th>
                    </tr>
                `;
                table.appendChild(tableHead);

                // Функция сортировки
                function sortTable(columnIndex, ascending) {
                    const rows = Array.from(tableBody.querySelectorAll('tr'));
                    rows.sort((a, b) => {
                        let cellA = a.querySelectorAll('td')[columnIndex].textContent.toLowerCase();
                        let cellB = b.querySelectorAll('td')[columnIndex].textContent.toLowerCase();
                        // Числовые значения
                        if (!isNaN(cellA) && !isNaN(cellB)) {
                            cellA = parseFloat(cellA);
                            cellB = parseFloat(cellB);
                        // Размер файла
                        } else if (cellA.includes('mb') || cellA.includes('gb')) {
                            cellA = parseFileSize(cellA);
                            cellB = parseFileSize(cellB);
                        }
                        // Формат даты
                        else if (isDate(cellA) && isDate(cellB)) {
                            cellA = parseDate(cellA);
                            cellB = parseDate(cellB);
                        }
                        if (cellA < cellB) {
                            return ascending ? -1 : 1;
                        } else if (cellA > cellB) {
                            return ascending ? 1 : -1;
                        } else {
                            return 0;
                        }
                    });
                    // Удаление существующих строк и добавление отсортированных
                    rows.forEach(row => tableBody.appendChild(row));
                }
                
                // Функция для преобразования размера файла в числовое значение в байтах
                function parseFileSize(size) {
                    const units = {
                        'b':  1,
                        'kb': 1024,
                        'mb': 1024 ** 2,
                        'gb': 1024 ** 3
                    };
                    const match = size.match(/(\d+(\.\d+)?)(\s*)([kmgt]?b)/i);
                    if (match) {
                        const value = parseFloat(match[1]);
                        const unit = match[4].toLowerCase();
                        return value * (units[unit] || 1);
                    }
                    return 0;
                }

                // Функция для проверки, является ли строка датой в формате dd.mm.yyyy
                function isDate(str) {
                    return /^\d{2}\.\d{2}\.\d{4}$/.test(str);
                }

                // Функция для преобразования даты из формата строки в объект Date
                function parseDate(dateStr) {
                    const [day, month, year] = dateStr.split('.');
                    return new Date(`${year}-${month}-${day}`);
                }

                // Обработчики клика к заголовкам таблицы для сортировки
                const tableHeaders = tableHead.querySelectorAll('th');
                tableHeaders.forEach((header, index) => {
                    // Начинаем с сортировки по возрастанию
                    let ascending = true;
                    header.addEventListener('click', () => {
                        sortTable(index, ascending);
                        // Переключаем порядок сортировки
                        ascending = !ascending;
                    });
                });
        
                // Тело таблицы
                const tableBody = document.createElement('tbody');
                table.appendChild(tableBody);
                
                // Добавляем элементы в контейнер
                searchContainer.appendChild(searchInput);
                searchContainer.appendChild(searchButton);
                searchContainer.appendChild(filterInput);

                // Добавляем контейнер в tableContainer
                tableContainer.appendChild(searchContainer);

                // Добавляем таблицу
                tableContainer.appendChild(table);

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
                
                // Добавляем контейнер и кнопку закрытия в модальное окно
                modal.appendChild(tableContainer);
                modal.appendChild(closeButton);
                document.body.appendChild(modal);

                // Обработчик события кнопки Esc для закрытия модального окна
                document.addEventListener('keydown', function(event) {
                    if (event.key === 'Escape') {
                        document.body.removeChild(modal);
                    }
                });
        
                // Загрузка данных из API
                // Использование прокси, который добавляет заголовки CORS к запросам
                // const corsProxy = 'https://cors-anywhere.herokuapp.com/';
                // const apiUrl = `https://torapi.vercel.app/api/search/title/all?query=${title}`;
                // fetch(corsProxy + apiUrl)
                // Локальный сервер
                // fetch(`http://localhost:8443/api/search/title/all?query=${title}`)
                // Публичный сервер на Vercel
                // fetch(`https://torapi.vercel.app/api/search/title/all?query=${title}`)
                // Используем переменную из хранилища
                fetch(`${TorApiServer}/api/search/title/all?query=${title}`)
                    .then(response => response.json())
                    .then(data => {
                        displayTorrents(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        
            // Добавляем кнопку
            buttonBlock.parentNode.insertBefore(torrentButton, buttonBlock.nextSibling);
        });
        
        // Функция для отображения данных в таблице модального окна
        function displayTorrents(data) {
            const tableBody = document.querySelector('#torrent-table tbody');
            tableBody.innerHTML = ''; // Очистить старые данные
            // Проходим по всем ключам в объекте data
            for (let source in data) {
                if (data.hasOwnProperty(source)) {
                    const torrents = data[source]; // Получаем массив данных для каждого источника
                    // Проходим по каждому элементу в массиве
                    torrents.forEach(item => {
                        const row = document.createElement('tr');
                        row.style.backgroundColor = '#333';
                        row.style.borderBottom = '1px solid #555';
                        row.style.padding = '10px';
                        row.innerHTML = `
                            <td style="padding: 10px; border-bottom: 1px solid #555;">${source}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #555;">
                                <a href="${item.Url}" target="_blank" style="color: #1e90ff; text-decoration: none;">${item.Name}</a>
                            </td>
                            <td style="padding: 10px; border-bottom: 1px solid #555;">${item.Size}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #555;">${item.Seeds}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #555;">${item.Peers}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #555;">${item.Date.split(' ')[0]}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #555;">
                                <a href="${item.Torrent}" target="_blank" style="color: #1e90ff; text-decoration: none;">Скачать</a>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });
                }
            }
        }
    }

    // Kinobox
    // Source: https://kinobox.tv
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
                closeButton.style.top = '5px';
                closeButton.style.right = '20px';
                closeButton.style.color = '#fff';
                closeButton.style.fontSize = '40px';
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

    chrome.storage.local.get(['KinoboxCheckBox'], function(result) {
        var KinoboxCheckBox = result.KinoboxCheckBox
        if (!KinoboxCheckBox) {
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
            // Добавляем кнопку после блока кнопок на странице
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
    KinoboxButton.style.borderRadius = '40px'; // Увеличиваем скругление углов
    KinoboxButton.style.padding = '30px'; // Увеличиваем внутренний отступ
    KinoboxButton.style.fontSize = '26px'; // Увеличиваем размер шрифта
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