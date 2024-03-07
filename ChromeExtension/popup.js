document.getElementById('saveButton').addEventListener('click', function() {
    var text = document.getElementById('textInput').value;
    // Сохраняем текст в локальное хранилище
    chrome.storage.local.set({ 'saveTokenKinopoisk': text }, function() {
        // Оповещаем пользователя о сохранении
        var messageBox = document.getElementById('messageBox');
        messageBox.textContent = 'Токен сохранен в расширении';
        messageBox.style.display = 'block';
    });
});

// Получаем все ссылки на странице
var links = document.querySelectorAll('a');
// Добавляем обработчик события для каждой ссылки
links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Отменяем стандартное действие ссылки
        event.preventDefault();
        // Получаем URL, на который ссылается ссылка
        var url = link.href;
        // Открываем этот URL в новой вкладке
        chrome.tabs.create({ url: url });
    });
});