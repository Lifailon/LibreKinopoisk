<p align="center">
    <img src="image/kinopoisk-buttons.jpg" alt="Image alt">
</p>

<h1 align="center">
  <img src="ChromeExtension/icons/icon128.png" width="30" />
  Libre Kinopoisk Chrome Extension
</h1>

Расширение Google Chrome, которое добавляет кнопки на сайт [Кинопоиск](http://kinopoisk.ru) для свободного поиска фильмов и сериалов в открытых источниках.

Проект вдохновлен расширением 🍿 [YoK](https://github.com/mrzlab630/chrome-extension-YoK) для поиска плееров и интерфейсом 🧥 [Jackett](https://github.com/Jackett/Jackett) для централизованного поиска раздач в торрент трекерах.

### ✨ Реализовано:

- [x] Онлайн просмотр выбранного фильма или сериала в интегрированном плеере ▶ [Kinobox](https://kinomix.web.app) через модальное окно (не покидая текущую страницу в браузере).
- [x] Интерфейс для одновременного поиска раздач в нескольких торрент трекерах через [TorAPI](https://github.com/Lifailon/TorAPI) с поддержкой фильтрации и сортировки в стиле [Jackett](https://github.com/Jackett/Jackett), без необходимости устанавливать серверную часть и использвать VPN для поиска.
- [x] Интерфейс для настройки расширения.
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

---

### 🚀 Установка

- [Скачайте расширение](https://github.com/Lifailon/LibreKinopoisk/archive/refs/heads/rsa.zip) из GitHub репозитория и распакуйте zip-архив.
- Откройте страницу с расширениями Google Chrome: `chrome://extensions`.
- Включите **режим разработчика** в правом верхнем углу.
- **Загрузите распакованное расширение** и выберите директорию `ChromeExtension` из архива.

![Image alt](image/add-extension.jpg)

> Если кнопки отображаются на странице и сразу пропадают, отключите блокировщик рекламы в интерфейсе расширения (например, [Adblock](https://adblockplus.org)), находясь на странице [Кинопоиска](www.kinopoisk.ru) (может потребоваться перезагрузка расширения LibreKinopoisk).

- Вы можете вызывать интерфейс поиска раздач в торрент трекерах находясь на любой странице браузера, а также изменить адрес сервера и настроить отображение кнопок в **интерфейсе расширения**:

<h1 align="center">
    <img src="image/popup-interface.jpg" width="400"/></a> <img src="image/popup-settings.jpg" width="400"></a>
</h1>

Что бы запустить свой **TorAPI** сервер в Docker контейнере или развернуть его на Vercel, воспользуйтесь инструкций в репозитории на [GitHub](https://github.com/Lifailon/TorAPI).

---

## Другие проекты:

- ✨ [TorAPI](https://github.com/Lifailon/TorAPI) - неофициальный `API` сервер (backend) для торрент трекеров RuTracker, Kinozal, RuTor и NoNameClub, который используется для централизованного получения торрент файлов и подробной информации о раздаче по названию фильма, сериала или идентификатору раздачи в формате `JSON`, а также предоставляет новостную `RSS` ленту для всех провайдеров.



- 🧲 [Telegram бот для Кинозал](https://github.com/Lifailon/Kinozal-Bot) - позволяет автоматизировать процесс доставки контента до вашего телевизора, используя только телефон, предоставляющий привычный и удобный интерфейс для взаимодействия с торрент трекером [Кинозал](https://kinozal.tv), а также возможность управлять торрент клиентом [qBittorrent](https://github.com/qbittorrent/qBittorrent) или [Transmission](https://github.com/transmission/transmission) на вашем компьютере и синхронизацию с [Plex Media Server](https://www.plex.tv/personal-media-server), находясь удаленно от дома.

- ❤️ [WebTorrent Desktop api](https://github.com/Lifailon/webtorrent-desktop-api) - форк [WebTorrent Desktop](https://github.com/webtorrent/webtorrent-desktop) клиента, в котором добавлен механизм удаленного управления через `REST API` на базе [Express Framework](https://github.com/expressjs/express).

- 📡 [Reverse Proxy .NET](https://github.com/Lifailon/rpnet) - кроссплатформенная утилита командной строки для реализации обратного прокси-сервер на базе .NET. Используется для предоставления доступа хостам с одного сетевого интерфейса к удаленным приложениям через протоколы TCP, UDP или HTTP/HTTPS доступных через другой сетевой интерфейс без лишних настроек и с поддержкой авторизации.