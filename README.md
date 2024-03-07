### 🎞️ Open Kinopoisk Chrome Extension

Добавляет кнопки на сайте [Кинопоиск](http://kinopoisk.ru) для поиска фильмов и сериалов в открытых ресурсах ✖️🏴‍☠️.

Этот проект является обновленной версией расширения 🍿 [YoK](https://github.com/mrzlab630/chrome-extension-YoK) ввиду отсутствия поддержки. Весь код полностью переписан, для доступа к информации на сайте используется интерфейс [DOM](https://ru.wikipedia.org/wiki/Document_Object_Model).

Реализовано:

- ✅ Открытие плеера [Kinobox](https://kinomix.web.app) для просмотра выбранного фильма или сериала онлайн (без использования `REST API`).
- ✅ Поиск в [Кинозал](https://kinozal.tv) с фильтрацией по оригинальному названию и году выхода.
- ✅ Поиск трейлеров на [YouTube](https://youtube.com) по названию.
- ✅ Передача токена через интерфейс расширения.
- ❎ Поддержка на сайта [Кинопоиск HD](https://hd.kinopoisk.ru).
- ❎ Поиск в [IMDb](https://imdb.com) и в других ресурсах по id через API.

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/kinopoisk-buttons.jpg)

### ▶️ Установка

- [Скачайте расширение](https://github.com/Lifailon/OpenKinopoisk/archive/refs/heads/rsa.zip) из GitHub и распакуйте zip-архив
- Откройте страницу с расширениями Google Chrome: `chrome://extensions`
- Включите `Режим разработчика`
- Загрузите распакованное расширение и выберите директорию `ChromeExtension` из архива

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/add-extension.jpg)

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/popup.jpg)