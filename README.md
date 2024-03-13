### 🎞️ Open Kinopoisk Chrome Extension

Расширение, которое добавляет кнопки на сайт [Кинопоиск](http://kinopoisk.ru) для поиска фильмов и сериалов в открытых источниках ✖️🏴‍☠️.

Этот проект является обновленной версией расширения 🍿 [YoK](https://github.com/mrzlab630/chrome-extension-YoK) ввиду неработоспособности запрашиваемых плееров через API Kinobox. Весь код полностью переписан без использования `REST API`, для получения информации на сайте Кинопоиск (оригинальное название и год выхода) используется интерфейс [DOM](https://ru.wikipedia.org/wiki/Document_Object_Model).

Реализовано:

- ✅ Онлайн просмотр выбранного фильма или сериала в плеере на сайте [Kinobox](https://kinomix.web.app).
- ✅ Поиск трейлеров на [YouTube](https://youtube.com).
- ✅ Поиск информации на [Wikipedia](https://ru.wikipedia.org).
- ✅ Поиск в трекерах [Кинозал](https://kinozal.tv), [RuTrucker](https://rutracker.org) и [NoName-Club](https://nnmclub.to) с фильтрацией по оригинальному названию и году выхода (может потребоваться использование `VPN`).
- ✅ Поиск фильмов и сериалов на [IMDb](https://imdb.com), [TMDb](https://themoviedb.org) [Plex](https://plex.tv) через перенаправление поисковика Google (ранее использовался `Google Custom Search API`).
- ✅ Интерфейс расширения для передачи токена.
- ❎ Доступ к [TorrentAPI](https://github.com/Lifailon/TorrentAPI) для получения приямого доступа к загрузке торрент файлов (💡 серверная часть в разработке). 
- ❎ Поддержка версии сайта [Кинопоиск HD](https://hd.kinopoisk.ru).

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/kinopoisk-buttons.jpg)

### ▶️ Установка

💡 Панируется публикация в [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) после реализации API функционала.

- [Скачайте расширение](https://github.com/Lifailon/OpenKinopoisk/archive/refs/heads/rsa.zip) из GitHub и распакуйте zip-архив
- Откройте страницу с расширениями Google Chrome: `chrome://extensions`
- Включите `Режим разработчика`
- Загрузите распакованное расширение и выберите директорию `ChromeExtension` из архива

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/add-extension.jpg)

- Введите свой токен доступа для поисковой системы Google:

> 💡 Данный функционал больше не используется

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/popup.jpg)

💡 Если кнопки отображаются на странице и сразу пропадают, выключите расширение [Adblock](https://adblockplus.org) для страницы `kinopoisk.ru`. Для Windows достаточно перезагрузите страницу и включить расширение Adblock обратно, в случае с Macbook расширение необходимо оставить выключенным.

<!--
Узнайте, как получить токен доступа [здесь](https://developers.google.com/custom-search/v1/overview?hl=ru). Токен хранится в локальном хранилище вашего браузера Google Chrome и сохраняется после перезагрузки компьютера.
-->