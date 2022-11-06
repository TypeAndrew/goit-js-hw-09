import Notiflix from 'notiflix';

let timerId;
const buttonCP = document.querySelector('form');

buttonCP.addEventListener('submit', (event) => {
  event.preventDefault();
  const dalay = document.querySelector('input[name="delay"]').value;
  const step = document.querySelector('input[name="step"]').value;
  const amount = document.querySelector('input[name="amount"]').value;
  for (let i = 0; i < amount; i++){
    const timerId = setTimeout(() => {
      createPromise(i, dalay)
        .then(({ position, delay }) => {
          //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }).catch(({ position, delay }) => {
         // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notiflix.Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
    }, step);
  }  
     
});


function createPromise(position, delay) {
  
  
  const promise = new Promise(function (resolve, reject) {
  const shouldResolve = Math.random() > 0.3;
    
    let result = {"position": position, "delay":  delay};
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




