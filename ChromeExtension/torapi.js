function displayTorrentsOnPage() {
    chrome.storage.local.get(['TorApiServer'], function(result) {
        var TorApiServer = result.TorApiServer;

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
        modal.style.fontFamily = 'Lato, sans-serif'; // Устанавливаем шрифт для модального окна
        modal.style.fontSize = '16px'; // Размер шрифта

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
        tableContainer.style.fontFamily = 'Lato, sans-serif';
        tableContainer.style.fontSize = '16px';

        // Контейнер для поля ввода и кнопки поиска
        const searchContainer = document.createElement('div');
        searchContainer.style.display = 'flex';
        searchContainer.style.alignItems = 'center';
        searchContainer.style.marginBottom = '10px';
        searchContainer.style.gap = '10px';
        searchContainer.style.fontFamily = 'Lato, sans-serif';
        searchContainer.style.fontSize = '16px';

        // Стили для placeholder
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            #torrent-table {
                width: 100%; /* Занимает всю ширину экрана */
                border-collapse: collapse; /* Убирает пробелы между ячейками */
            }
          
            #torrent-table th, #torrent-table td {
                text-align: left; /* Выравнивание текста */
            }
            
            /* Адаптировать интерфейс таблицы под мобильные устройства */
            @media (max-width: 1000px) {
                #torrent-table {
                    display: block; /* Позволяет прокрутку */
                    overflow-x: auto; /* Включает горизонтальную прокрутку */
                }
            
                #torrent-table thead {
                    display: none; /* Скрыть заголовки таблицы на маленьких экранах */
                }
            
                #torrent-table tr {
                    display: flex; /* Используем flexbox для строк */
                    flex-direction: column; /* Вертикальное расположение ячеек */
                    margin-bottom: 10px; /* Отступ между строками */
                }
            
                #torrent-table td {
                    display: flex; /* Используем flexbox для ячеек */
                    justify-content: space-between; /* Распределение ячеек по ширине */
                    /* border: 1px solid #1e90ff; */
                }
            }
        `;
        document.head.appendChild(styleElement);
        
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
        searchInput.style.flexGrow = '1';
        searchInput.style.height = '42px';
        searchInput.style.backgroundColor = '#333';
        searchInput.style.color = '#ffffff';
        searchInput.style.fontFamily = 'Lato, sans-serif';
        searchInput.style.fontSize = '16px';

        // Кнопка для выполнения поиска
        const searchButton = document.createElement('button');
        searchButton.textContent = 'Поиск';
        searchButton.style.padding = '10px 20px';
        searchButton.style.backgroundColor = '#1e90ff';
        searchButton.style.color = '#ffffff';
        searchButton.style.border = 'none';
        searchButton.style.borderRadius = '5px';
        searchButton.style.cursor = 'pointer';
        searchButton.style.marginLeft = '10px';
        searchButton.style.height = '42px';
        searchButton.style.lineHeight = '22px';
        searchButton.style.marginTop = '-10px';
        searchButton.style.fontFamily = 'Lato, sans-serif';
        searchButton.style.fontSize = '16px';

        // Создаем элемент счетчика (span) для кнопки
        const countSpan = document.createElement('span');
        countSpan.style.marginLeft = '5px'; // Отступ слева от счетчика
        countSpan.textContent = '(0)'; // Начальное значение счетчика по умолчанию
        searchButton.appendChild(countSpan); // Добавляем счетчик в кнопку

        // Обработчик события для кнопки поиска
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Использование прокси (https://github.com/Rob--W/cors-anywhere), который добавляет заголовки CORS к запросам
                // const corsProxy = 'https://cors-anywhere.herokuapp.com/';
                // const apiUrl = `https://torapi.vercel.app/api/search/title/all?query=${title}`;
                // fetch(corsProxy + apiUrl)
                // Локальный сервер (https://github.com/Lifailon/TorAPI)
                // fetch(`http://localhost:8443/api/search/title/all?query=${title}`)
                // Публичный сервер на Vercel
                // fetch(`https://torapi.vercel.app/api/search/title/all?query=${title}`)
                // Используем переменную из хранилища
                fetch(`${TorApiServer}/api/search/title/all?query=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        displayTorrents(data);
                        // Обновляем счетчик
                        countSpan.textContent = `(${data.RuTracker.length + data.Kinozal.length + data.RuTor.length + data.NoNameClub.length})`;
                    })
                    .catch(error => {
                        console.error(error);
                        countSpan.textContent = `(0)`;
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
        filterInput.style.flexGrow = '1';
        filterInput.style.height = '42px';
        filterInput.style.marginLeft = '10px';
        filterInput.style.backgroundColor = '#333';
        filterInput.style.color = '#ffffff';
        filterInput.style.fontFamily = 'Lato, sans-serif';
        filterInput.style.fontSize = '16px';

        // Функция для фильтрации
        filterInput.addEventListener('input', function() {
            const filterValue = filterInput.value.toLowerCase();
            let filterWords = [];
            chrome.storage.local.get(['SearchCheckBox'], function (result) {
                if (result.SearchCheckBox) {
                    // Разбиваем на слова для неточного поиска
                    filterWords = filterValue.split(' ').filter(word => word.length > 0);
                }
                const rows = tableBody.querySelectorAll('tr');
                let visibleCount = 0; // Счетчик видимых строк
                rows.forEach(row => {
                    const titleCell = row.querySelectorAll('td')[3]; // Используем четвертый столбец для фильтрации
                    if (titleCell) {
                        const titleText = titleCell.textContent.toLowerCase();
                        // Проверяем, содержится ли каждое слово в заголовке
                        if (result.SearchCheckBox) {
                            const matches = filterWords.every(word => titleText.includes(word));
                            if (matches) {
                                row.style.display = ''; // Показываем строку
                                visibleCount++; // Увеличиваем счетчик
                            } else {
                                row.style.display = 'none'; // Скрываем строку
                            }
                        } else {
                            // Для точного поиска
                            if (titleText.includes(filterValue)) {
                                row.style.display = ''; // Показываем строку
                                visibleCount++; // Увеличиваем счетчик
                            } else {
                                row.style.display = 'none'; // Скрываем строку
                            }
                        }
                      
                    }
                });
                // Обновляем счетчик
                countSpan.textContent = `(${visibleCount})`;
            });
                                                                                             
        });

        // Создаем таблицу
        const table = document.createElement('table');
        table.id = 'torrent-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.color = '#ffffff';
        table.style.fontFamily = 'Lato, sans-serif';
        table.style.fontSize = '18px';

        // Заголовки таблицы
        const tableHead = document.createElement('thead');
        tableHead.innerHTML = `
            <tr style="background-color: #444;">
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Трекер</th>
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: default; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;"></th>
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: default; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;"></th>
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Название</th>
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Размер</th>
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Сиды</th>
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Пиры</th>
                <th style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Дата</th>
            </tr>
        `;
        table.appendChild(tableHead);

        // Функция сортировки
        function sortTable(columnIndex, ascending) {
            const rows = Array.from(tableBody.querySelectorAll('tr'));
            rows.sort((a, b) => {
                let cellA = a.querySelectorAll('td')[columnIndex].textContent.trim().toLowerCase();
                let cellB = b.querySelectorAll('td')[columnIndex].textContent.trim().toLowerCase();
                // Проверка формата даты
                if (isDate(cellA) && isDate(cellB)) {
                    cellA = parseDate(cellA);
                    cellB = parseDate(cellB);
                }
                // Проверка размер файла
                else if (cellA.includes('kb') || cellA.includes('mb') || cellA.includes('gb')) {
                    cellA = parseFileSize(cellA);
                    cellB = parseFileSize(cellB);
                }
                // Проверка числовых значений (целое или с плавающей точкой)
                else if (!isNaN(cellA) && !isNaN(cellB)) {
                    cellA = parseFloat(cellA);
                    cellB = parseFloat(cellB);
                }
                // Сравнение значений
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
                'b': 1,
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

        // Функция для преобразования даты из формата строки в объект Date (формат YYYY-MM-DD)
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

        // Добавляем элементы в контейнер
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchButton);
        searchContainer.appendChild(filterInput);

        // Добавляем контейнер в tableContainer
        tableContainer.appendChild(searchContainer);

        // Тело таблицы
        const tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        // Добавляем таблицу
        tableContainer.appendChild(table);

        // Создаем кнопку для закрытия модального окна
        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '20px';
        closeButton.style.color = '#ffffff';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontFamily = 'Lato, sans-serif';
        closeButton.style.fontSize = '40px';
        closeButton.addEventListener('click', function() {
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
    });

    // Функция для отображения данных в таблице модального окна
    function displayTorrents(data) {
        const tableBody = document.querySelector('#torrent-table tbody');
        tableBody.innerHTML = '';
        for (let source in data) {
            if (data.hasOwnProperty(source)) {
                const torrents = data[source];
                torrents.forEach(item => {
                    const row = document.createElement('tr');
                    row.style.backgroundColor = '#333333';
                    row.style.borderBottom = '1px solid #555555';
                    row.style.fontFamily = 'Lato, sans-serif';
                    row.style.fontSize = '16px';
                    let ico
                    if (source.toLowerCase().trim() === "rutracker") {
                        ico = chrome.runtime.getURL('icons/rutracker.ico');
                    } else if (source.toLowerCase() === "kinozal") {
                        ico = chrome.runtime.getURL('icons/kinozal.ico');
                    } else if (source.toLowerCase() === "rutor") {
                        ico = chrome.runtime.getURL('icons/rutor.ico');
                    } else if (source.toLowerCase() === "nonameclub") {
                        ico = chrome.runtime.getURL('icons/nonameclub.ico');
                    }
                    row.innerHTML = `
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: default; font-family: Lato, sans-serif; font-size: 16px;">
                            <div style="display: flex; align-items: center;">
                                <img src="${ico}" alt="${source}" style="max-width: 16px; margin-right: 16px;">
                                <span style="vertical-align: middle;">${source}</span>
                            </div>
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            <a href="${item.Torrent}" target="_blank" style="color: #1e90ff; text-decoration: none;">💾</a>
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            <magnetButton></magnetButton>
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: pointer; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            <a href="${item.Url}" target="_blank" style="color: #1e90ff; text-decoration: none;">${item.Name}</a>
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Size}
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Seeds}
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Peers}
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #555555; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Date.split(' ')[0].includes(':') ? item.Date.split(':')[0].slice(0, -2) : item.Date.split(' ')[0]}
                        </td>
                    `;
                    // Обработчик для получения Magnet link
                    const magnetButton = row.querySelector('magnetButton');
                    magnetButton.style.padding = '0'; // Убираем отступы
                    magnetButton.style.background = 'none'; // Убираем фон
                    magnetButton.style.border = 'none'; // Убираем границу
                    magnetButton.style.fontSize = '16px'; // Увеличиваем размер символа
                    magnetButton.style.color = '#1e90ff'; // Цвет символа
                    magnetButton.style.cursor = 'pointer'; // Курсор при наведении 
                    magnetButton.innerHTML = '🧲';
                    magnetButton.addEventListener('click', function() {
                        fetch(`https://torapi.vercel.app/api/search/id/${source.toLowerCase()}?query=${item.Id}`)
                            .then(response => response.json())
                            .then(magnetData => {
                                const magnetLink = magnetData[0].Magnet;
                                if (magnetLink) {
                                    chrome.storage.local.get(['MagnetCheckBox'], function (result) {
                                        if (result.MagnetCheckBox) {
                                            window.open(magnetLink, '_blank');
                                        } else {
                                            const infoHash = magnetData[0].Hash
                                            if (infoHash) {
                                                alert(`info hash: ${infoHash}`);
                                            }
                                        }
                                    })
                                } else {
                                    alert('Магнитная ссылка не найдена');
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                alert('Ошибка при получении магнитной ссылки');
                            });
                    });
                    tableBody.appendChild(row);
                });
            }
        }
    }
}