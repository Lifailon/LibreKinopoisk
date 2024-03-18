![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/kinopoisk-buttons.jpg)

### 🎞️ Open Kinopoisk Chrome Extension

Расширение, которое добавляет кнопки на сайт [Кинопоиск](http://kinopoisk.ru) для поиска фильмов и сериалов в открытых источниках ✖️🏴‍☠️.

Этот проект является обновленной версией расширения 🍿 [YoK](https://github.com/mrzlab630/chrome-extension-YoK) ввиду неработоспособности запрашиваемых плееров через API Kinobox. Весь код полностью переписан без использования `API`.

Реализовано:

- ✅ Онлайн просмотр выбранного фильма или сериала (прямой переход на сайт [Kinobox](https://kinomix.web.app) и другие источники с плеерами без рекламы).
- ✅ Поиск трейлеров на [YouTube](https://youtube.com).
- ✅ Поиск информации на [Wikipedia](https://ru.wikipedia.org).
- ✅ Поиск фильмов и сериалов в базах данных [Кинориум](https://ru.kinorium.com), [Торамп](https://www.toramp.com), [MyShows](https://myshows.me) и [FilmRu](https://www.film.ru) с распианием даты выхода сериалов.
- ✅ Поиск в зарубежных базах данных [IMDb](https://imdb.com) и [TMDb](https://themoviedb.org).
- ✅ Поиск в торрент трекерах [Кинозал](https://kinozal.tv), [RuTrucker](https://rutracker.org), [RuTor](https://rutor.info) и [NoName-Club](https://nnmclub.to) с фильтрацией по оригинальному названию и году выхода (rutor и nnm-club не требуют авторизации для загрузки).
- ✅ Интерфейс расширения для настройки отображения кнопок.
- ✅ Формирование списка раздач для прямой загрузки торрент файлов.

💡 Для доступа к некоторым ресурсам может потребоваться использование сервисов `VPN`, например, вы можете воспользоваться расширением [Browsec](https://browsec.com).

### ▶️ Установка

- [Скачайте расширение](https://github.com/Lifailon/OpenKinopoisk/archive/refs/heads/rsa.zip) из GitHub и распакуйте zip-архив
- Откройте страницу с расширениями Google Chrome: `chrome://extensions`
- Включите `Режим разработчика`
- Загрузите распакованное расширение и выберите директорию `ChromeExtension` из архива

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/add-extension.jpg)

💡 Если кнопки отображаются на странице и сразу пропадают, отключите блокировщик рекламы в интерфейсе расширения (например, [Adblock](https://adblockplus.org)), находясь на странице [Кинопоиска](www.kinopoisk.ru) (может потребоваться перезагрузка расширения).

Настройте отображение кнопок в интерфейсе расширения:

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/popup-settings.jpg)

В главном меню расширения можно передать свой токен системы [Google Custom Search Engine](https://developers.google.com/custom-search/docs/overview?hl=ru), которая используется для поиска раздач в трекере RuTor и формирования списка кнопок для прямого доступа к загрузке торрент файлов.

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/google-cse-api.jpg)

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/google-cse-save.jpg)

Токен хранится в локальном хранилище вашего браузера Google Chrome и сохраняется после перезагрузки системы. Узнайте, как получить токен доступа [здесь](https://developers.google.com/custom-search/v1/overview?hl=ru) (бесплатно доступно 100 запросов в сутки). Что бы отключить функционал, просто сохраните пустое значение.
