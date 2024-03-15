### 🎞️ Open Kinopoisk Chrome Extension

Расширение, которое добавляет кнопки на сайт [Кинопоиск](http://kinopoisk.ru) для поиска фильмов и сериалов в открытых источниках ✖️🏴‍☠️.

Этот проект является обновленной версией расширения 🍿 [YoK](https://github.com/mrzlab630/chrome-extension-YoK) ввиду неработоспособности запрашиваемых плееров через API Kinobox. Весь код полностью переписан без использования `API`. для получения информации на сайте Кинопоиск (оригинальное название зарубежного фильма или сериала и год выхода) используется интерфейс [DOM](https://ru.wikipedia.org/wiki/Document_Object_Model).

Реализовано:

- ✅ Онлайн просмотр выбранного фильма или сериала (прямой переход на сайт [Kinobox](https://kinomix.web.app) с рабочими плеерами без рекламы).
- ✅ Поиск трейлеров на [YouTube](https://youtube.com).
- ✅ Прямой поиск информации на [Wikipedia](https://ru.wikipedia.org).
- ✅ Поиск фильмов и сериалов в зарубежных базах данных и онлайн кинотеатрах [IMDb](https://imdb.com), [TMDb](https://themoviedb.org) и [Plex](https://plex.tv) через перенаправление поисковой системы Google (без использования Google Custom Search).
- ✅ Поиск в трекерах [RuTor](https://rutor.info) (не требует авторизации для загрузки), [Кинозал](https://kinozal.tv), [RuTrucker](https://rutracker.org) и [NoName-Club](https://nnmclub.to) с фильтрацией по оригинальному названию и году выхода.
- ✅ Интерфейс расширения для настройки отображения кнопок.
- ❎ Доступ к [TorrentAPI](https://github.com/Lifailon/TorrentAPI) для получения приямого доступа к загрузке торрент файлов (💡 серверная часть в разработке). 

💡 Для доступа к некоторым ресурсам может потребоваться `VPN`, например, вы можете воспользоваться расширением [Browsec](https://browsec.com).

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/kinopoisk-buttons.jpg)

### ▶️ Установка

💡 В скором времени панируется публикация в [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) (не хватает 5$ и карты...).

- [Скачайте расширение](https://github.com/Lifailon/OpenKinopoisk/archive/refs/heads/rsa.zip) из GitHub и распакуйте zip-архив
- Откройте страницу с расширениями Google Chrome: `chrome://extensions`
- Включите `Режим разработчика`
- Загрузите распакованное расширение и выберите директорию `ChromeExtension` из архива

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/add-extension.jpg)

💡 Если кнопки отображаются на странице и сразу пропадают, отключите блокировщик рекламы в интерфейсе расширения (например, [Adblock](https://adblockplus.org)), находясь на странице [Кинопоиска](www.kinopoisk.ru) (может потребоваться перезагрузка расширения).

- Настройте отображение кнопок в интерфейсе расширения (опционально):

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/popup-settings.jpg)

💡 Главное меню для передачи токена системы Google Custom Search больше не используется.

<!--
Токен хранится в локальном хранилище вашего браузера Google Chrome и сохраняется после перезагрузки компьютера.

Узнайте, как получить токен доступа [Google](https://developers.google.com/custom-search/v1/overview?hl=ru) или [Rapid API](https://rapidapi.com/neoscrap-net/api/google-search72/pricing).
-->