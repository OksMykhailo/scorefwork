document.addEventListener('DOMContentLoaded', () => {
    loadScores(); // Восстановить сохранённые значения
    updateOrder(); // Обновить порядок смен
  });
  
  // Переключение между страницами
  function goToPage(pageNumber) {
    document.getElementById('page1').style.display = pageNumber === 1 ? 'block' : 'none';
    document.getElementById('page2').style.display = pageNumber === 2 ? 'block' : 'none';
    updateOrder(); // Обновить порядок смен
  }
  
  // Запрос пароля
  function requestPassword() {
    const password = prompt('Введите пароль:');
    if (password === '1234') {
      goToPage(2);
    } else {
      alert('Неверный пароль!');
    }
  }
  
  // Обновление количества смен
  function updateScore(shiftNumber, action) {
    const input = document.getElementById(`input${shiftNumber}`);
    const scoreElement = document.getElementById(`score${shiftNumber}`);
    let score = parseInt(scoreElement.textContent, 10);
    const value = parseInt(input.value, 10);
  
    if (isNaN(value) || value <= 0) {
      alert('Введите положительное число');
      return;
    }
  
    if (action === 'add') {
      score += value;
    } else if (action === 'subtract') {
      score = Math.max(0, score - value);
    }
  
    scoreElement.textContent = score;
    input.value = ''; // Очистить поле ввода
  
    saveScores(); // Сохранить данные
    updateOrder(); // Обновить порядок смен
  }
  
  // Сохранение данных в LocalStorage
  function saveScores() {
    const scores = Array.from(document.querySelectorAll('.score')).map(score =>
      parseInt(score.textContent, 10)
    );
    localStorage.setItem('shiftScores', JSON.stringify(scores));
    console.log('Данные сохранены в LocalStorage:', scores); // Проверка
  }
  
  // Загрузка данных из LocalStorage
  function loadScores() {
    const savedScores = JSON.parse(localStorage.getItem('shiftScores'));
    console.log('Загруженные данные из LocalStorage:', savedScores); // Проверка
    if (savedScores) {
      savedScores.forEach((score, index) => {
        document.getElementById(`score${index + 1}`).textContent = score;
      });
    } else {
      // Если данных нет в LocalStorage, установить значения по умолчанию
      const defaultScores = [0, 0, 0, 0];
      defaultScores.forEach((score, index) => {
        document.getElementById(`score${index + 1}`).textContent = score;
      });
    }
    updateOrder(); // Обновить порядок смен
  }
  
  // Обновление порядка смен в DOM
  function updateOrder() {
    const shifts = Array.from(document.querySelectorAll('.shift'));
    const scores = shifts.map(shift => {
      const score = parseInt(shift.querySelector('.score').textContent, 10);
      return { element: shift, score: score };
    });
  
    // Сортируем смены по убыванию количества
    scores.sort((a, b) => b.score - a.score);
  
    // Перемещаем смены в DOM в нужном порядке
    const container = document.getElementById('shifts');
    scores.forEach(({ element }) => {
      container.appendChild(element);
    });
  }