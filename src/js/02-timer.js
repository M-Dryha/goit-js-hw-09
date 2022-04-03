import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseFunction(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);
 
let disabledBtn = true;
let intervalId = null;
let futureDate = Date.now();
refs.startBtn.disabled = disabledBtn;

refs.startBtn.addEventListener('click', onstartTimer);

function onCloseFunction (date) {
const currentDate = Date.now();

  if (currentDate > date) {
    Notify.failure("Please choose a date in the future");
  } else {
    refs.startBtn.disabled = !disabledBtn;
     futureDate = date;
}
}

function onstartTimer() {
  refs.startBtn.disabled = disabledBtn;
  timer();
  
}


function timer() {
   
  intervalId = setInterval(() => {
    const startTime =  Date.now();
    const timerTime = futureDate - startTime;
    const time = convertMs(timerTime);
  
    updateClock(time);

    if (timerTime < 1000) {
        clearInterval(intervalId);
    }
    
  }, 1000);

}
 

 function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function updateClock( { days, hours, minutes, seconds }) {
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs. dataSeconds.textContent = addLeadingZero(seconds);

}

function addLeadingZero(value) {
  return String(value).padStart(0, '2');
}