function displayTorrentsOnPage() {

    let tableBackgroundColor = '#dddddd'; // мягкий светло-серый фон контейнера таблицы и статуса счетчиков
    let inputBackgroundColor = '#f0f0f0'; // немного темнее для поля ввода и таблицы
    let tableHeadBackgroundColor = '#e8e8e8'; // более светлый серый для заголовков столбцов
    let buttonBackgroundColor = '#0078d4'; // фон кнопок, ссылок в таблице (менее яркий синий)
    let buttonColor = '#000000'; // цвет текста на кнопке и в таблице
    let tableBorderBottomColor = "#dddddd"; // мягкий светло-серый для нижней границы таблицы

    chrome.storage.local.get(['darkModeBox'], function (result) {
        if (result.darkModeBox) {
            tableBackgroundColor = '#2d2d2d'; // фон контейнера таблицы и статуса счетчиков
            inputBackgroundColor = '#333'// фон поля ввода и таблицы
            tableHeadBackgroundColor = '#444'// фон заголовков столбцов таблицы
            buttonBackgroundColor = '#1e90ff'; // фон кнопок, ссылок в таблице
            buttonColor = '#ffffff'; // цвет букв на кнопке и в таблице
            tableBorderBottomColor = "#555555"
        }
    })

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
        tableContainer.style.width = '90%';
        tableContainer.style.height = '85%';
        tableContainer.style.backgroundColor = tableBackgroundColor;
        tableContainer.style.padding = '20px';
        tableContainer.style.borderRadius = '10px';
        tableContainer.style.overflowY = 'auto';
        tableContainer.style.position = 'relative';
        tableContainer.style.display = 'flex';
        tableContainer.style.flexDirection = 'column';
        tableContainer.style.fontFamily = 'Lato, sans-serif';
        tableContainer.style.fontSize = '16px';

        // Контейнер для полей ввода (поиск и фильтрация) и кнопки поиска
        const searchContainer = document.createElement('div');
        searchContainer.id = 'torrent-search-container';
        searchContainer.style.display = 'flex';
        // searchContainer.style.flexDirection = 'column';
        searchContainer.style.alignItems = 'center';
        searchContainer.style.marginBottom = '10px';
        searchContainer.style.gap = '10px';
        searchContainer.style.fontFamily = 'Lato, sans-serif';
        searchContainer.style.fontSize = '16px';

        // Стили для placeholder
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Анимация кнопки загрузки */
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

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

                #category-counter {
                    display: none; /* Скрыть список категорий и счетчики */
                }

                .category-counter {
                    display: none !important; /* Скрыть список категорий и счетчики глобально по классу */
                }

                #torrent-table tr {
                    display: flex; /* Используем flexbox для строк */
                    /* Вертикальное расположение ячеек */
                    /* flex-direction: column; */
                    flex-wrap: wrap; /* Позволяем обтекание строк */
                    margin-bottom: 15px; /* Отступ между строками */
                }
                    
                /* Стили для первых двух ячеек, чтобы они располагались горизонтально */
                .source-cell, .download-cell, .magnet-cell, .seeds-cell, .peers-cell {
                    display: flex; /* Позволяет использовать flexbox внутри ячеек */
                    justify-content: flex-start; /* Выравнивание по левому краю */
                }
                    
                /* Остальные ячейки остаются вертикальными и занимают 100% ширины */
                .name-cell, .category-cell, .size-cell, .date-cell {
                    flex: 1 1 100%; /* Занимают 100% ширины */
                }

                #torrent-search-container {
                    display: flex;
                    flex-direction: column; /* Вертикальное расположение элементов */
                }

                #torrent-search-button {
                    width: 100%; /* Занимает всю ширину контейнера */
                    margin-right: 10px; /* Убрать отступ слева */
                    margin-bottom: 10px; /* Добавить отступ снизу */
                }

                #torrent-search-all-page-button {
                    width: 100%; /* Занимает всю ширину контейнера */
                    margin-right: 10px; /* Убрать отступ слева */
                }
                    
                #torrent-filter-input {
                    margin-right: 10px; /* Убрать отступ слева */
                }
            }
        `;
        document.head.appendChild(styleElement);
        
        // Поле ввода для ввода запроса вручную
        const searchInput = document.createElement('input');
        searchInput.id = 'torrent-search-input';
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
        searchInput.style.backgroundColor = inputBackgroundColor;
        searchInput.style.color = buttonColor;
        searchInput.style.fontFamily = 'Lato, sans-serif';
        searchInput.style.fontSize = '16px';

        // Кнопка для выполнения быстрого поиска 🔎
        const searchButton = document.createElement('button');
        searchButton.id = 'torrent-search-button';
        searchButton.style.display = 'flex'; // Используем flexbox для центрирования
        searchButton.style.alignItems = 'center'; // Выравниваем по вертикали
        searchButton.style.padding = '10px 20px';
        searchButton.style.backgroundColor = buttonBackgroundColor;
        searchButton.style.color = buttonColor;
        searchButton.style.border = 'none';
        searchButton.style.borderRadius = '5px';
        searchButton.style.cursor = 'pointer';
        searchButton.style.marginLeft = '5px'; // отступы после предыдущего элемента (searchInput)
        searchButton.style.height = '42px';
        searchButton.style.lineHeight = '22px';
        searchButton.style.marginTop = '-10px';
        searchButton.style.fontFamily = 'Lato, sans-serif';
        searchButton.style.fontSize = '18px';
        searchButton.style.whiteSpace = 'nowrap';

        // Индикатор загрузки
        const loadingSpinner = document.createElement('div');
        loadingSpinner.style.width = '25px'; // Увеличиваем ширину
        loadingSpinner.style.height = '25px'; // Увеличиваем высоту
        loadingSpinner.style.border = '4px solid #05cc63'; // Увеличиваем толщину границы
        loadingSpinner.style.borderTop = '4px solid #ffffff'; // Цвет верхней части
        loadingSpinner.style.borderRadius = '50%';
        loadingSpinner.style.animation = 'spin 1s linear infinite'; // Анимация
        loadingSpinner.style.display = 'none'; // Скрыт по умолчанию
        searchButton.appendChild(loadingSpinner); // Добавляем спиннер в кнопку
        searchButton.appendChild(document.createTextNode('Поиск')); // Добавляем текст кнопки
        
        // Обработчик события для кнопки поиска
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                loadingSpinner.style.display = 'block'; // Показываем спиннер
                const originalText = searchButton.childNodes[1].textContent; // Сохраняем оригинальный текст
                searchButton.childNodes[1].textContent = ''; // Очищаем текст кнопки
                searchButton.disabled = true; // Делаем кнопку неактивной
                searchButton.style.cursor = 'default'; // Отключаем курсор
                searchAllPageButton.disabled = true;
                searchAllPageButton.style.cursor = 'default';
                // Использовать прокси CORS Anywhere (https://github.com/Rob--W/cors-anywhere), который добавляет заголовки CORS к запросам
                // const corsProxy = 'https://cors-anywhere.herokuapp.com/';
                // Thing Proxy (https://github.com/Freeboard/thingproxy)
                // const corsProxy = 'https://thingproxy.freeboard.io/fetch/';
                // fetch(corsProxy + apiUrl)
                // Используем переменную из хранилища
                fetch(`${TorApiServer}/api/search/title/all?query=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        displayTorrents(data);
                        // Обновляем счетчик
                        const count = data.RuTracker.length + data.Kinozal.length + data.RuTor.length + data.NoNameClub.length;
                        textBox.innerHTML = `Количество найденных раздач: <strong>${count}</strong> (RuTracker: <strong>${data.RuTracker.length}</strong>, Kinozal: <strong>${data.Kinozal.length}</strong>, RuTor: <strong>${data.RuTor.length}</strong>, NoName-Club: <strong>${data.NoNameClub.length}</strong>)`;
                    })
                    .catch(error => {
                        console.error(error);
                        textBox.innerHTML = 'Количество найденных раздач: <strong>0</strong> (RuTracker: <strong>0</strong>, Kinozal: <strong>0</strong>, RuTor: <strong>0</strong>, NoName-Club: <strong>0</strong>)';
                    })
                    .finally(() => {
                        loadingSpinner.style.display = 'none'; // Скрываем спиннер
                        searchButton.childNodes[1].textContent = originalText; // Восстанавливаем текст кнопки
                        searchButton.disabled = false; // Активируем кнопку снова
                        searchButton.style.cursor = 'pointer'; // Активируем курсор
                        searchAllPageButton.disabled = false;
                        searchAllPageButton.style.cursor = 'pointer';
                    });
            }
        });

        // Кнопка для выполнения расширенного поиска по всем страницам
        const searchAllPageButton = document.createElement('button');
        searchAllPageButton.id = 'torrent-search-all-page-button';
        searchAllPageButton.style.display = 'flex';
        searchAllPageButton.style.alignItems = 'center';
        searchAllPageButton.style.padding = '10px 20px';
        searchAllPageButton.style.backgroundColor = buttonBackgroundColor;
        searchAllPageButton.style.color = buttonColor;
        searchAllPageButton.style.border = 'none';
        searchAllPageButton.style.borderRadius = '5px';
        searchAllPageButton.style.cursor = 'pointer';
        searchAllPageButton.style.marginLeft = '5px';
        searchAllPageButton.style.height = '42px';
        searchAllPageButton.style.lineHeight = '22px';
        searchAllPageButton.style.marginTop = '-10px';
        searchAllPageButton.style.fontFamily = 'Lato, sans-serif';
        searchAllPageButton.style.fontSize = '18px';
        searchAllPageButton.style.whiteSpace = 'nowrap';

        // Индикатор загрузки
        const loadingSpinnerAllPage = document.createElement('div');
        loadingSpinnerAllPage.style.width = '25px';
        loadingSpinnerAllPage.style.height = '25px';
        loadingSpinnerAllPage.style.border = '4px solid #05cc63';
        loadingSpinnerAllPage.style.borderTop = '4px solid #ffffff';
        loadingSpinnerAllPage.style.borderRadius = '50%';
        loadingSpinnerAllPage.style.animation = 'spin 2s linear infinite';
        loadingSpinnerAllPage.style.display = 'none';
        searchAllPageButton.appendChild(loadingSpinnerAllPage);
        searchAllPageButton.appendChild(document.createTextNode('Найти все'));
        
        // Обработчик события для кнопки поиска
        searchAllPageButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                loadingSpinnerAllPage.style.display = 'block';
                const originalText = searchAllPageButton.childNodes[1].textContent;
                searchAllPageButton.childNodes[1].textContent = ''
                searchAllPageButton.disabled = true;
                searchAllPageButton.style.cursor = 'default';
                searchButton.disabled = true;
                searchButton.style.cursor = 'default';
                fetch(`${TorApiServer}/api/search/title/all?query=${query}&page=all`)
                    .then(response => response.json())
                    .then(data => {
                        displayTorrents(data);
                        // Обновляем счетчик
                        const count = data.RuTracker.length + data.Kinozal.length + data.RuTor.length + data.NoNameClub.length;
                        textBox.innerHTML = `Количество найденных раздач: <strong>${count}</strong> (RuTracker: <strong>${data.RuTracker.length}</strong>, Kinozal: <strong>${data.Kinozal.length}</strong>, RuTor: <strong>${data.RuTor.length}</strong>, NoName-Club: <strong>${data.NoNameClub.length}</strong>)`;
                    })
                    .catch(error => {
                        console.error(error);
                        textBox.innerHTML = 'Количество найденных раздач: <strong>0</strong> (RuTracker: <strong>0</strong>, Kinozal: <strong>0</strong>, RuTor: <strong>0</strong>, NoName-Club: <strong>0</strong>)';
                    })
                    .finally(() => {
                        loadingSpinnerAllPage.style.display = 'none';
                        searchAllPageButton.childNodes[1].textContent = originalText;
                        searchAllPageButton.disabled = false;
                        searchAllPageButton.style.cursor = 'pointer';
                        searchButton.disabled = false;
                        searchButton.style.cursor = 'pointer';
                    });
            }
        });

        // Поле ввода для фильтрации
        const filterInput = document.createElement('input');
        filterInput.id = 'torrent-filter-input';
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
        filterInput.style.marginLeft = '5px';
        filterInput.style.backgroundColor = inputBackgroundColor;
        filterInput.style.color = buttonColor;
        filterInput.style.fontFamily = 'Lato, sans-serif';
        filterInput.style.fontSize = '16px';

        // Функция для выделения текста при фильтрации
        function highlightText(text, words) {
            if (!words.length) return text; // Если нет слов для поиска, возвращаем оригинальный текст
            const regex = new RegExp(`(${words.join('|')})`, 'gi'); // Создаем регулярное выражение для поиска
            // Добавляем обертку для текста с фоном
            return text.replace(regex, '<span style="background-color: yellow;">$1</span>'); // Оборачиваем найденные слова в тег span с желтым фоном
        }

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
                // Счетчики для каждого провайдера
                let countRuTracker = 0;
                let countKinozal = 0;
                let countRuTor = 0;
                let countNoNameClub = 0;
                // Получаем выбранную категорию
                const selectedCategory = dropdown.value;
                rows.forEach(row => {
                    const titleCell = row.querySelectorAll('td')[3]; // Используем четвертый столбец для фильтрации
                    const providerCell = row.querySelectorAll('td')[0]; // Используем первый столбец для провайдера
                    const categoryCell = row.querySelectorAll('td')[4]; // Используем пятую ячейку для категории
                    const categoryText = categoryCell ? categoryCell.textContent.trim() : '';
                    if (titleCell && providerCell) {
                        const linkElement = titleCell.querySelector('a'); // Ищем ссылку внутри ячейки
                        const titleText = linkElement ? linkElement.textContent.toLowerCase() : titleCell.textContent.toLowerCase();
                        const providerText = providerCell.textContent.trim(); // Получаем текст провайдера
                        let matches = false;
                        // Проверяем, соответствует ли категория выбранной
                        if (selectedCategory !== 'Все' && categoryText !== selectedCategory) {
                            row.style.display = 'none'; // Скрываем строку, если категория не совпадает
                        } else {
                            // Проверяем текст
                            if (result.SearchCheckBox) {
                                // Проверяем, содержится ли каждое слово в заголовке
                                matches = filterWords.every(word => titleText.includes(word));
                            } else {
                                // Для точного поиска
                                matches = titleText.includes(filterValue);
                            }
                            if (matches) {
                                row.style.display = ''; // Показываем строку
                                visibleCount++; // Увеличиваем счетчик
                                // Увеличиваем счетчик для соответствующего провайдера
                                if (providerText === 'RuTracker') countRuTracker++;
                                if (providerText === 'Kinozal') countKinozal++;
                                if (providerText === 'RuTor') countRuTor++;
                                if (providerText === 'NoNameClub') countNoNameClub++;
                                // Выделяем найденный текст в ссылке
                                if (linkElement) {
                                    linkElement.innerHTML = highlightText(linkElement.textContent, filterWords);
                                }
                            } else {
                                row.style.display = 'none'; // Скрываем строку
                                if (linkElement) {
                                    linkElement.innerHTML = linkElement.textContent; // Сбрасываем выделение
                                }
                            }
                        }
                    }
                });
                // Обновляем счетчик
                textBox.innerHTML = `Количество найденных раздач: <strong>${visibleCount}</strong> (RuTracker: <strong>${countRuTracker}</strong>, Kinozal: <strong>${countKinozal}</strong>, RuTor: <strong>${countRuTor}</strong>, NoName-Club: <strong>${countNoNameClub}</strong>)`;
            });
        });

        // Создаем таблицу
        const table = document.createElement('table');
        table.id = 'torrent-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.color = buttonColor;
        table.style.fontFamily = 'Lato, sans-serif';
        table.style.fontSize = '18px';

        // Заголовки таблицы
        const tableHead = document.createElement('thead');
        tableHead.innerHTML = `
            <tr style="background-color: ${tableHeadBackgroundColor};">
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Трекер</th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;"></th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;"></th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Название</th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Категория</th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Размер</th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Сиды</th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Пиры</th>
                <th style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 18px; text-align: center; font-weight: bold;">Дата</th>
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
        searchContainer.appendChild(searchAllPageButton);
        searchContainer.appendChild(filterInput);

        // Установить фокус на поле ввода для поиска при запуске
        setTimeout(() => {
            searchInput.focus(); 
        })

        // Слушатель события для поиска при нажатии Enter в поле ввода
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Отключаем стандартное поведение Enter
                searchButton.click(); // Имитируем нажатие на кнопку поиска
            }
        });

        // Добавляем контейнер в tableContainer
        tableContainer.appendChild(searchContainer);

        // Контейнер для выпадающего списка и текста с счетчиками резултатов поиска
        const statusContainer = document.createElement('div');
        statusContainer.id = 'category-counter';
        statusContainer.classList.add('category-counter');
        statusContainer.style.display = 'flex';
        statusContainer.style.alignItems = 'center';
        statusContainer.style.backgroundColor = tableBackgroundColor;
        statusContainer.style.width = '100%';
        statusContainer.style.paddingBottom = '20px'; // Отступ снизу

        // Скрыть контейнер на маленьких экранах
        // if (window.innerWidth < 1000) {
        //     statusContainer.style.display = 'none';
        // }

        // Текст перед выпадающим списком
        const filterLabel = document.createElement('span');
        filterLabel.textContent = 'Фильтрация по категории:';
        filterLabel.style.fontFamily = 'Lato, sans-serif';
        filterLabel.style.fontSize = '16px';
        filterLabel.style.marginRight = '10px'; // Отступ справа
        filterLabel.style.color = buttonColor;
            
        // Добавляем текстовую метку перед выпадающим списком
        statusContainer.appendChild(filterLabel);
            
        // Создаем выпадающий список
        const dropdown = document.createElement('select');
        dropdown.style.fontFamily = 'Lato, sans-serif';
        dropdown.style.fontSize = '16px'; // Размер текста
        dropdown.style.padding = '3px'; // Ширина окна относительно текста
        dropdown.style.borderRadius = '5px'; // Скругление
        dropdown.style.border = `1px solid ${buttonColor}`; // Толщина и цвет окна
        // dropdown.style.width = 'auto'; // Автоматическая ширина окна
        dropdown.style.minWidth = '150px'; // Минимальная ширина окна
        dropdown.style.maxWidth = '150px'; // Максимальная ширина окна
        dropdown.style.marginRight = '10px'; // Отступ справа
        dropdown.style.backgroundColor = tableBackgroundColor;
        dropdown.style.color = buttonColor;
            
        // Добавляем опцию по умолчанию
        const allOption = document.createElement('option');
        allOption.value = 'Все';
        allOption.textContent = 'Все';
        dropdown.appendChild(allOption);
            
        // Добавляем выпадающий список в контейнер
        statusContainer.appendChild(dropdown);
            
        // Создаем текст со статусом
        const textBox = document.createElement('div');
        textBox.innerHTML = 'Количество найденных раздач: <strong>0</strong> (RuTracker: <strong>0</strong>, Kinozal: <strong>0</strong>, RuTor: <strong>0</strong>, NoName-Club: <strong>0</strong>)';
        textBox.style.color = buttonColor;
            
        // Добавляем текст со статусом в контейнер
        statusContainer.appendChild(textBox);
            
        // Добавляем контейнер со списком и текстом перед таблицей
        tableContainer.appendChild(statusContainer);

        // Добавляем обработчик события для изменения значения в выпадающем списке
        dropdown.addEventListener('change', function() {
            const selectedCategory = dropdown.value; // Получаем выбранную категорию
            filterByCategory(selectedCategory); // Вызываем функцию фильтрации по категории
        });

        // Функция для фильтрации таблицы по выбранной категории
        function filterByCategory(selectedCategory) {
            const rows = tableBody.querySelectorAll('tr');
            let visibleCount = 0; // Счетчик видимых строк
            // Счетчики для каждого провайдера
            let countRuTracker = 0;
            let countKinozal = 0;
            let countRuTor = 0;
            let countNoNameClub = 0;
            rows.forEach(row => {
                const categoryCell = row.querySelectorAll('td')[4]; // Используем пятую ячейку для категории
                const providerCell = row.querySelectorAll('td')[0]; // Используем первый столбец для провайдера
                const categoryText = categoryCell ? categoryCell.textContent.trim() : '';
                const providerText = providerCell ? providerCell.textContent.trim() : '';
                // Проверяем, соответствует ли категория выбранной
                if (selectedCategory === 'Все' || categoryText === selectedCategory) {
                    row.style.display = ''; // Показываем строку
                    visibleCount++; // Увеличиваем счетчик видимых строк
                    // Увеличиваем счетчик для соответствующего провайдера
                    if (providerText === 'RuTracker') countRuTracker++;
                    if (providerText === 'Kinozal') countKinozal++;
                    if (providerText === 'RuTor') countRuTor++;
                    if (providerText === 'NoNameClub') countNoNameClub++;
                } else {
                    row.style.display = 'none'; // Скрываем строку
                }
            });
            // Обновляем счетчик
            updateVisibleCount(visibleCount, countRuTracker, countKinozal, countRuTor, countNoNameClub);
        }

        // Функция для обновления текстового блока с количеством найденных раздач
        function updateVisibleCount(visibleCount, countRuTracker, countKinozal, countRuTor, countNoNameClub) {
            // Обновляем текст с количеством
            textBox.innerHTML = `
                Количество найденных раздач: <strong>${visibleCount}</strong>
                (RuTracker: <strong>${countRuTracker}</strong>, 
                Kinozal: <strong>${countKinozal}</strong>, 
                RuTor: <strong>${countRuTor}</strong>, 
                NoName-Club: <strong>${countNoNameClub}</strong>)
            `;
        }

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
        // Очищаем выпадающий список категорий и создаем Set для уникальных значений
        const dropdown = document.querySelector('select'); // Получаем выпадающий список
        dropdown.innerHTML = ''; // Очищаем выпадающий список
        const uniqueCategories = new Set(); // Множество для уникальных категорий
        uniqueCategories.add('Все');
        uniqueCategories.add('Без категории');
        // Заполняем таблицу в цикле
        for (let source in data) {
            if (data.hasOwnProperty(source)) {
                const torrents = data[source];
                torrents.forEach(item => {
                    // Добавляем категорию в Set
                    uniqueCategories.add(item?.Category || 'Без категории');
                    // Заполняем строки таблицы
                    const row = document.createElement('tr');
                    row.style.backgroundColor = inputBackgroundColor;
                    row.style.borderBottom = `1px solid ${tableBorderBottomColor}`;
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
                        <td class="source-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; height: 100%;"> <!-- Исключить перенос текста от логотипа на новую строку, высота 100% для выравнивания -->
                                <img src="${ico}" alt="${source}" style="max-width: 16px; margin-right: 16px;">
                                <span>${source}</span>
                            </div>
                        </td>
                        <td class="download-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                                <a href="${item.Torrent}" target="_blank" style="color: ${buttonBackgroundColor}; text-decoration: none;">💾</a>
                        </td>
                        <td class="magnet-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                                <magnetButton></magnetButton>
                        </td>
                        <td class="name-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: pointer; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            <a href="${item.Url}" target="_blank" style="color: ${buttonBackgroundColor}; text-decoration: none;">${item.Name}</a>
                        </td>
                        <td class="category-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item?.Category || 'Без категории'}
                        </td>
                        <td class="size-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Size}
                        </td>
                        <td class="seeds-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Seeds}
                        </td>
                        <td class="peers-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Peers}
                        </td>
                        <td class="date-cell" style="padding: 10px; border-bottom: 1px solid ${tableBorderBottomColor}; cursor: default; font-family: Lato, sans-serif; font-size: 16px; vertical-align: middle;">
                            ${item.Date.split(' ')[0].includes(':') ? item.Date.split(':')[0].slice(0, -2) : item.Date.split(' ')[0]}
                        </td>
                    `;
                    // Обработчик для получения Magnet link
                    const magnetButton = row.querySelector('magnetButton');
                    magnetButton.style.padding = '0'; // Убираем отступы
                    magnetButton.style.background = 'none'; // Убираем фон
                    magnetButton.style.border = 'none'; // Убираем границу
                    magnetButton.style.fontSize = '16px'; // Увеличиваем размер символа
                    magnetButton.style.color = buttonBackgroundColor; // Цвет символа
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
                                                navigator.clipboard.writeText(infoHash).then(() => {
                                                    alert(`Хеш ${infoHash} скопирован в буфер обмена`);
                                                }).catch(error => {
                                                    alert(`Ошибка копирования (${error})`);
                                                });
                                            }
                                        }
                                    })
                                } else {
                                    alert('Магнитная ссылка не найдена');
                                }
                            })
                            .catch(error => {
                                alert(`Ошибка при получении магнитной ссылки (${error})`);
                            });
                    });
                    tableBody.appendChild(row);
                });
            }
        }
        // Добавляем уникальные категории в выпадающий список
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            dropdown.appendChild(option);
        });
    }
}