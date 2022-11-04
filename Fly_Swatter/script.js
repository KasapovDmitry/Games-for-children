/* План создания игры

1. Сделать движение игрока (вверх, вниз) на стрелочках
2. Выстрел при нажатии на пробел
3. Делаем пулю летящей
4. Удалять пулю, которая пролетела мимо цели
5. Проверка на попадание пули в муху
6. Если пуля попала, эффект взрыва

*/

/*Сделать движение игрока (вверх, вниз) на стрелочках */
// Выбираем игрока
player = document.querySelector("#player");

// Количество жизней
lifes = 3;

// Добавляем событие нажатия клавиши
document.addEventListener('keydown', function(event) {

    switch(event.keyCode) {
        //Нажали 's' вниз
        case 83:
            player.style.top = player.offsetTop + 80 + "px";
            break;

        //Нажали 'w' вверх
        case 87:
            player.style.top = player.offsetTop - 80 + "px";
            break;
        //Нажали пробел
        case 32:
            createBull();
            break;
    }

 
    console.dir(event);
});

// Создаем пулю
/* <div class="bullet"></div> */
function createBull() {
    let bullet = document.createElement("div");
// Даем класс пули
    bullet.className = "bullet";
// Задаем начальное значение пули
    bullet.style.top = player.offsetTop + 150 + 'px';
//Добавляем пулю на игровое поле
    document.body.appendChild(bullet);
// Делаем движение пули
    bulletMove(bullet);
}
createEnemy();

function bulletMove(bullet) {
    // Полет пули по таймеру
    let timerId = setInterval(function() {
        bullet.style.left = bullet.offsetLeft + 10 + "px";
// Проверяем попала ли пуля в мишень
        isShot(bullet, timerId);
// Очищаем пули, которые пролетели мимо
        if(bullet.offsetLeft > document.body.clientWidth) {
            bullet.remove();
            clearInterval(timerId);
        }
    }, 10); 
}

function isShot(bullet, timer) {
// Координаты пули верх и низ
    let topB = bullet.offsetTop;
    let bottomB = bullet.offsetTop + bullet.offsetHeight;

    let enemy = document.querySelector(".enemy");
    if(enemy != null) {
        // Координаты мухи (верх и низ)
        let topE = enemy.offsetTop;
        let bottomE = enemy.offsetTop + enemy.offsetHeight

        // Координаты пули и мухи слева    
        let leftB = bullet.offsetLeft;
        let leftE = enemy.offsetLeft;

        if(topB >= topE && topB <= bottomE && leftB >= leftE) {

            enemy.className = 'boom';
            enemy.style.top = (topE - 50) + "px";
            enemy.style.left = (leftE - 50) + "px";
            clearInterval(enemy.dataset.timer);
            setTimeout(function() {
                enemy.remove();
                createEnemy();
                bullet.remove();
                clearInterval(timer);
            }, 1000);
        } 
    }

}

function isDie() {
    
    let enemy = document.querySelector(".enemy");
    if(enemy.offsetTop > player.offsetTop && 
        enemy.offsetTop < player.offsetTop + player.offsetHeight && 
        enemy.offsetLeft <= player.offsetLeft + player.offsetWidth) {
        enemy.className = 'boom';
            enemy.style.top = (player.offsetTop + 50) + "px";
            enemy.style.left = (player.offsetLeft + 50) + "px";
            clearInterval(enemy.dataset.timer);
            setTimeout(function() {
                enemy.remove();
                createEnemy();
            }, 500);
       die();
    }
}


// Создаем врага - муху
/* <div class="enemy"></div> */
function createEnemy() {
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.top = random(200, document.body.offsetHeight - 100) + "px";

   
    document.body.appendChild(enemy);
// Полет мухи
    let timerId = setInterval(function() {
        enemy.style.left = (enemy.offsetLeft - 10) + "px";
// Очищаем пули, которые пролетели мимо
        if(enemy.offsetLeft + enemy.offsetWidth < 0) {
            enemy.remove();
            clearInterval(timerId);
            createEnemy();
// Отнимаем жизнь
            die();
        }
        isDie();
    }, 100);
    enemy.dataset.timer = timerId;
}

function die() {
    lifes--;
    if(lifes != 0) {
        let lifesBlock = document.querySelector('#lifes');
        let life = lifesBlock.querySelector("span");
        life.remove();
    } else {
        endGame();
        
    }

    
}

function endGame() {
    document.body.innerHTML = "";
    alert("Вы проиграли! :( ");
    location.reload();
}

// Получаем рандомное число для вывода мухи
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}



