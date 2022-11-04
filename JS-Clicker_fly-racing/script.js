
// Выбираем игрока
let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');
// Финиш
let end = document.querySelector(".line-finish");
// Скорость игроков
let left1 = 150;
let left2 = 150;
// Комьпьютер
let bot = document.querySelector('.bot');
// Скорость компа
let left3 = 150;

// СТАРТ
let startButton = document.querySelector('.start-btn');
startButton.onclick = function() {
        countdown();
}
// Таймер обратного отсчета
let x = 5;
function countdown(){  // функция обратного отсчета
    startButton.classList.add('timer');
    startButton.classList.remove('start-btn');
    startButton.innerHTML = x;
    x--; // уменьшаем число на единицу
    if (x<0){
      clearTimeout(timer); // таймер остановится на нуле
      startButton.innerHTML = '';
      compSpeed(bot);
      playerSpeed();
    }
    else {
      timer = setTimeout(countdown, 1000);
    }
  }

// Движение компа
function compSpeed() {
    let timerId = setInterval(function() {
        bot.style.left = left3 + 20 + "px";
        left3 += 20;
        if(end.offsetLeft <= player1.offsetLeft || end.offsetLeft <= player2.offsetLeft) {
            clearInterval(timerId);
            bot.style.left = bot.style.left + "px";
            return;
        }
        // Если победил комп
        if(end.offsetLeft <= bot.offsetLeft) {
            clearInterval(timerId);
            document.body.innerHTML = "";
            alert("Победил компьютер :) ");
            location.reload();
            return;
        }
    }, 110);
}

// Добавляем событие нажатия клавиши
function playerSpeed() {
    document.addEventListener('keyup', function(event) {

        switch(event.keyCode) {
            //Нажали 's' вниз
            case 39:
                player1.style.left = left1 + 30 + "px";
                left1 += 30;
                break;

            //Нажали 'w' вверх
            case 17:
                player2.style.left = left2 + 30 + "px";
                left2 += 30;
                break;
        }
        // Если победили игроки
        if( end.offsetLeft <= player1.offsetLeft || end.offsetLeft <= player2.offsetLeft) {
            bot.classList.remove('bot');
            endGame();
        }
    });
}
// Конец игры
function endGame() {
    if (player1.offsetLeft > player2.offsetLeft && player1.offsetLeft > bot.offsetLeft) {
        document.body.innerHTML = "";
        alert("Победил красный :) ");
        location.reload();
    }
    if (player2.offsetLeft > player1.offsetLeft && player2.offsetLeft > bot.offsetLeft) {
        document.body.innerHTML = "";
        alert("Победил синий :) ");
        location.reload();
    }
}