function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyElem = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);


 bodyElem.style.backgroundColor = getRandomHexColor(); 


let disabledBtn = false;
let timerId = null;

function onStartBtn() {

    if (disabledBtn) {
        return;
}
  timerId = setInterval(() => {
        console.log('Маша - молодец!');
        let newColor = getRandomHexColor();
        bodyElem.style.backgroundColor = newColor;
    }, 1000)
   disabledBtn = true;
}

function onStopBtn() {

    clearInterval(timerId);
    disabledBtn = false;
}

