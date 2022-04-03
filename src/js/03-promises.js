import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('form'),
}

 refs.form.addEventListener('submit', onFormSubmit);



function onFormSubmit(event) {
  event.preventDefault();
  const dataPromises = {
        delay: parseInt(refs.delay.value),
        step: parseInt(refs.step.value),
        amount: parseInt(refs.amount.value),
  }
  
     onPromise(dataPromises);

}

function onPromise({ delay, step, amount}) {
 
  let newDelay = delay;

  for (let i = 1; i <= amount; i += 1){
    createPromise(i, newDelay)
       .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    newDelay += step;
  }
  
  }


function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay});
      }
       reject({ position, delay});
    },delay)
  });

}







