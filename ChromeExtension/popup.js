document.getElementById('saveButton').addEventListener('click', function() {
    var button = document.getElementById('saveButton')
    var text = document.getElementById('textInput').value
    // Отключаем обработчики событий для изменения цвета фона при наведении
    button.onmouseover = null
    button.onmouseleave = null
    // Сохраняем текст в локальное хранилище
    chrome.storage.local.set({ 'saveTokenKinopoisk': text }, function() {
        // Оповещаем пользователя о сохранении
        button.innerHTML = 'Токен сохранен'
        button.style.backgroundColor = '#4CAF50' // Зеленый цвет фона
        button.style.animation = 'savedEffect 3s ease-in-out'
        // Очищаем поле ввода текста
        textInput.value = ''
        // Убираем эффект через 3 секунды и возвращаем исходный цвет и эффекты
        setTimeout(function() {
            button.innerHTML = 'Сохранить'
            button.style.backgroundColor = '#ff6600cb' // Возвращаем исходный цвет фона
            // Включаем обработчики событий для изменения цвета фона при наведении 
            button.onmouseover = function() {
                button.style.backgroundColor = '#ff6600'
            }
            button.onmouseleave = function() {
                button.style.backgroundColor = '#ff6600cb'
            }
        }, 3000)
    })
})

// Получаем все ссылки на странице
var links = document.querySelectorAll('a')
// Добавляем обработчик события для каждой ссылки
links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Отменяем стандартное действие ссылки
        event.preventDefault()
        // Получаем URL, на который ссылается ссылка
        var url = link.href
        // Открываем этот URL в новой вкладке
        chrome.tabs.create({ url: url })
    })
})