
    let key = document.querySelectorAll('.piano-desk-keys');
    let audio = document.querySelectorAll('.audio');
    let picture = document.querySelectorAll('.piano-img');


    for (let i = 0; i < key.length; i++) {
        key[i].onmousedown = () => {
            for (let k = 0; k < audio.length; k++) {
                if (i == k) {
                    audio[k].play();
                }
            }

            for (let j = 0; j < picture.length; j++) {
                if (j == i) {
                    picture[j].innerHTML = `<img src="./img/cat${j + 1}-2.png" alt="photo">`;
                    picture[j].classList.add('active');
                }
            };
        }
        key[i].ontouchstart = () => {
            for (let k = 0; k < audio.length; k++) {
                if (i == k) {
                    audio[k].play();
                }
            }

            for (let j = 0; j < picture.length; j++) {
                if (j == i) {
                    picture[j].innerHTML = `<img src="./img/cat${j + 1}-2.png" alt="photo">`;
                    picture[j].classList.add('active');
                }
            };
        }

        key[i].onmouseup = () => {
            for (let j = 0; j < picture.length; j++) {
                if (j == i) {
                    picture[j].innerHTML = `<img src="./img/cat${j + 1}.png" alt="photo">`;
                    picture[j].classList.remove('active');
                }
            };
        }
        key[i].ontouchend = () => {
            for (let j = 0; j < picture.length; j++) {
                if (j == i) {
                    picture[j].innerHTML = `<img src="./img/cat${j + 1}.png" alt="photo">`;
                    picture[j].classList.remove('active');
                }
            };
        }
    }











