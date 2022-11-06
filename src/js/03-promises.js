import Notiflix from 'notiflix';

let timeCounter = 0;
const buttonCP = document.querySelector('form');

function sleep(milliseconds) {
	let t = (new Date()).getTime();
	let i = 0;
	while (((new Date()).getTime() - t) < milliseconds) {
		i++;
	}
}

buttonCP.addEventListener('submit', (event) => {
  event.preventDefault();
  const delay = document.querySelector('input[name="delay"]').value;
  const step = document.querySelector('input[name="step"]').value;
  const amount = document.querySelector('input[name="amount"]').value;
  let i = 1;
  
  sleep(Number(delay)); 
  createPromise(i, Number(delay))
        .then(({ position, timeDelay }) => {
          //console.log(`✅ Fulfilled promise ${position} in ${timeCounter}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${timeDelay}ms`);
        }).catch(({ position, timeDelay }) => {
          //console.log(`❌ Rejected promise ${position} in ${timeCounter}ms`);
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${timeDelay}ms`);
        })
      if (i == amount) {
        clearInterval(intervalID);
  }  
  
    let intervalID = setInterval(() => {
      createPromise(++i, Number(step))
        .then(({ position, timeDelay }) => {
          //console.log(`✅ Fulfilled promise ${position} in ${timeCounter}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${timeDelay}ms`);
        }).catch(({ position, timeDelay }) => {
          //console.log(`❌ Rejected promise ${position} in ${timeCounter}ms`);
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${timeDelay}ms`);
        })
      if (i == amount) {
        clearInterval(intervalID);
      }  
    }
    , step);
   
     
});


function createPromise(position, timeDelay) {
  
  
  const promise = new Promise(function (resolve, reject) {
  const shouldResolve = Math.random() > 0.5;
    timeCounter += Number(timeDelay);
    let result = {"position": position, "timeDelay":  timeCounter};
    if (shouldResolve) {
      // Fulfill
      resolve(result);
    } else {
      // Reject
      reject(result);
    }
  });
  return promise;
}




