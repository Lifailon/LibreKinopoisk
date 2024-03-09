### 🎞️ Open Kinopoisk Chrome Extension

Расширение, которое добавляет кнопки на сайт [Кинопоиск](http://kinopoisk.ru) для поиска фильмов и сериалов в открытых источниках ✖️🏴‍☠️.

Этот проект является обновленной версией расширения 🍿 [YoK](https://github.com/mrzlab630/chrome-extension-YoK) ввиду отсутствия поддержки. Весь код полностью переписан без использоваться `REST API` для доступа к плееру Kinobox. Для получения информации на сайте используется интерфейс [DOM](https://ru.wikipedia.org/wiki/Document_Object_Model).

Реализовано (без использования `REST API`):

- ✅ Открытие плеера [Kinobox](https://kinomix.web.app) для просмотра выбранного фильма или сериала онлайн.
- ✅ Поиск в [Кинозал](https://kinozal.tv) с фильтрацией по оригинальному названию и году выхода.
- ✅ Поиск трейлеров на [YouTube](https://youtube.com) по названию.
- ❎ Поддержка версии сайта [Кинопоиск HD](https://hd.kinopoisk.ru).

Функционал с использованием **Google Custom Search API**:

- ✅ Интерфейс расширения для передачит токена.
- ✅ [IMDb](https://imdb.com).
- ❎ Прямые ссылки для перехода на страницу или загрузки торрентов из трекеров.

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/kinopoisk-buttons.jpg)

### ▶️ Установка

- [Скачайте расширение](https://github.com/Lifailon/OpenKinopoisk/archive/refs/heads/rsa.zip) из GitHub и распакуйте zip-архив
- Откройте страницу с расширениями Google Chrome: `chrome://extensions`
- Включите `Режим разработчика`
- Загрузите распакованное расширение и выберите директорию `ChromeExtension` из архива

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/add-extension.jpg)

- Введите свой токен доступа для поисковика Google:

![Image alt](https://github.com/Lifailon/OpenKinopoisk/blob/rsa/image/popup.jpg)

Узнайте, как получить токен доступа [здесь](https://developers.google.com/custom-search/v1/overview?hl=ru). Токен сохраняется в локальное хранилище вашего браузера Google Chrome и хранится там после перезагрузки компьютера.