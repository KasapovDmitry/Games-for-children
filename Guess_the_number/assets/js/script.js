
const startBtn = document.querySelector('.start'); //Кнопка переход в меню
const menuBtn = document.querySelector('.in-menu-btn'); //Кнопка переход в меню
const menuBtn2 = document.querySelector('.in-menu-btn2'); //Кнопка переход в меню
const checkBtn = document.querySelector('.check'); // Кнопка сравнить числа
const num = document.querySelector('.help-num'); // Сколько раз пользователь пытается угадать
let unit = document.querySelector('#unit'); // Поле для персонажа
let napominanie = document.querySelector('.napominanie'); // Напоминание об уровне игры
let overDiv = document.querySelector('.overGame'); // Обратный отсчет ходов
let over = document.querySelector('.overCount'); // Обратный отсчет ходов
let inCount; // Счетчик обратный отсчет ходов
let NoinCount; // Коунтер не проиграл
let attempt = 1; // Счетчик ходов


let dialog = document.querySelector('.dialog-img'); // div для вывода результата сравнения
let myNum = document.querySelector('#add'); //Поле для ввода числа
let help = document.querySelector('.help-text'); //Поле для показа уже введенных чисел

let numMin = 1; // Минимальное число для рандома
// Максимальное число для рандома
let inp = document.querySelectorAll('.levelInput'); 
function numberMax() {
    for (let i = 0; i < inp.length; i++) {
        if (inp[i].checked) {
            return inp[i].value;
        }
    }
}
let numMax = numberMax();
var check = document.querySelectorAll('.levelInput[type="radio"]');
for (var i=0;i<check.length;i++){
    check[i].addEventListener('change', function(event) {
        numMax = +this.value;
        number(numMin, numMax);

        if (numMax == 10){
            unit.className = '';
            unit.classList.add('unit1');
            napominanie.innerHTML = 'Играем от 1 до 10';
        }
        if (numMax == 100) {
            unit.className = '';
            unit.classList.add('unit2');
            napominanie.innerHTML = 'Играем от 1 до 100';
        }  
        if (numMax == 1000) {
            unit.className = '';
            unit.classList.add('unit3');
            napominanie.innerHTML = 'Играем от 1 до 1000';
        } 
    });
}

// Получаем рандомное число
let numRandom;
function number(a, b) {
    numRandom = Math.floor(Math.random() * (b - a + 1) ) + a;
}
number(numMin, numMax);

// Влючаем режим с обратным отсчетом ходов
var checkHard = document.querySelectorAll('.hard[type="radio"]');
for (var i=0;i<checkHard.length;i++){
    checkHard[i].addEventListener('change', function(event) {
        overDiv.style.display = 'block';
        over.innerHTML = '';
        over.innerHTML = +this.value;
        inCount = over.innerHTML;
        
    });
}

// Сверяем рандомное число с нашим при клике на кнопку
function compary() {
   
        over.innerHTML = inCount;
        if (numRandom > myNum.value) {
            dialog.src = './assets/image/frazi/texmax.png';
        } else if (numRandom < myNum.value) {
            dialog.src = './assets/image/frazi/textmin.png';
        } else {
            dialog.src = './assets/image/frazi/textfin.png';
            NoinCount = 1;
        }

        // Выводим числа, которые ввели
        let text = document.createElement('span');
        text.innerHTML = '|' + ' ' + myNum.value + ' ';
        help.append(text);

        //Счетчики попыток
        inCount--;
        over.innerHTML = inCount;
        console.log(numRandom);
        if (inCount === 0 && NoinCount !== 1) {
            document.querySelector('.screen2').style.display = 'none';
            document.querySelector('.screen3').style.display = 'block';
        }
        num.innerHTML = attempt++;
    
    
}

checkBtn.onclick = compary;
// Добавляем событие нажатия клавиши
document.getElementById('add').onkeydown = function(event){
    var e = event || window.event;
    if(e.keyCode == 13){
        compary();
    }
}

// Начало игры
startBtn.onclick = function() {
    document.querySelector('.screen1').style.display = 'none';
    document.querySelector('.screen2').style.display = 'block';
}

// Выход в меню
menuBtn.onclick = function() {
    window.location.reload();
}
menuBtn2.onclick = function() {
    window.location.reload();
}


// Палим рандомное число
console.log(numRandom);