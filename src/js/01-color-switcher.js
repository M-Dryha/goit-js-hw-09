function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyElem = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);


let disabledBtn = false;
let timerId = null;

startBtn.disabled = disabledBtn;
stopBtn.disabled = !disabledBtn;

function onStartBtn() {

  if (disabledBtn) {
        return;
}
  timerId = setInterval(() => {
        console.log('Маша - молодец!');
        let newColor = getRandomHexColor();
        bodyElem.style.backgroundColor = newColor;
    }, 1000)
  startBtn.disabled = !disabledBtn;
  stopBtn.disabled = disabledBtn;
  
}

function onStopBtn() {

    clearInterval(timerId);
  startBtn.disabled = disabledBtn;
stopBtn.disabled = !disabledBtn;

  
}

