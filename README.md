<p align="center">
    <img src="image/kinopoisk-buttons.jpg" alt="Image alt">
</p>

<h2 align="center">
     🎞️ Open Kinopoisk Chrome Extension 🎞️
</h2>

Расширение, которое добавляет кнопки на сайт [Кинопоиск](http://kinopoisk.ru) для поиска фильмов и сериалов в открытых источниках ✖️🏴‍☠️.

Проект вдохновлен расширением 🍿 [YoK](https://github.com/mrzlab630/chrome-extension-YoK) для поиска плееров и интерфейсом 🧥 [Jackett](https://github.com/Jackett/Jackett) для централизованного поиска раздач в торрент трекерах.

### ✨ Реализовано:

- [x] Онлайн просмотр выбранного фильма или сериала в интегрированном плеере ▶ [Kinobox](https://kinomix.web.app) через модальное окно (не покидая текущую страницу в браузере).
- [x] Интерфейс для одновременного поиска раздач в нескольких торрент трекерах через [TorAPI](https://github.com/Lifailon/TorAPI) с поддержкой фильтрации и сортировки в стиле [Jackett](https://github.com/Jackett/Jackett), без необходимости устанавливать серверную часть и использвать VPN для поиска.
- [x] Интерфейс расширения для настройки отображения кнопок.
- [x] Кнопки для прямого поиска во внешних источниках:
- Трейлеры на [YouTube](https://youtube.com).
- Информация на [Wikipedia](https://ru.wikipedia.org).
- Просмотр онлайн на [Zetflix](https://zeflix.online) и [HDRezka](https://hdrezka.ag).
- Зарубежные базах данных [IMDb](https://imdb.com) и [TMDb](https://themoviedb.org).
- Базы данных [Кинориум](https://ru.kinorium.com), [Торамп](https://www.toramp.com), [Film.ru](https://www.film.ru), [MyShows](https://myshows.me) и [Lostfilm](https://lostfilm.tv) с распианием даты выхода сериалов.
- Торрент трекеры [Кинозал](https://kinozal.tv), [RuTrucker](https://rutracker.org), [RuTor](https://rutor.info), [NoName-Club](https://nnmclub.to) и [HDRezka Tracker](https://rezka.cc) с фильтрацией по оригинальному названию и году выхода.

\* Для загрузки торрент файлов через интерфейс поиска раздач, достаточно воспользоваться любым браузерным VPN, например, [Browsec](https://browsec.com/ru).

<h1 align="center">
    <img src="image/kinobox-player.jpg" width="400"/></a> <img src="image/torapi-search.jpg" width="400"></a>
</h1>

### 🚀 Установка

- [Скачайте расширение](https://github.com/Lifailon/OpenKinopoisk/archive/refs/heads/rsa.zip) из GitHub репозитория и распакуйте zip-архив.
- Откройте страницу с расширениями Google Chrome: `chrome://extensions`.
- Включите **режим разработчика** в правом верхнем углу.
- **Загрузите распакованное расширение** и выберите директорию `ChromeExtension` из архива.

![Image alt](image/add-extension.jpg)

> Если кнопки отображаются на странице и сразу пропадают, отключите блокировщик рекламы в интерфейсе расширения (например, [Adblock](https://adblockplus.org)), находясь на странице [Кинопоиска](www.kinopoisk.ru) (может потребоваться перезагрузка расширения OpenKinopoisk).

- Настройте отображение кнопок в интерфейсе расширения:

![Image alt](image/popup-settings.jpg)
