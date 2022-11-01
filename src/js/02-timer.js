import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let dtPicker = document.querySelector('input[type="text"]');
let btnStart = document.querySelector('button[data-start=""]');
let dataDays = document.querySelector('span[data-days=""]');
let dataHours = document.querySelector('span[data-hours=""]');
let dataMinutes = document.querySelector('span[data-minutes=""]');
let dataSeconds = document.querySelector('span[data-seconds=""]');
let deltaTime, leftTime;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] < new Date()) {
            console.log("Please choose a date in the future");
            btnStart.setAttribute('disabled', 'disabled');

        } else {
            btnStart.removeAttribute('disabled');
            deltaTime = selectedDates[0] - new Date();
        }
    },
};

flatpickr(dtPicker, options);

function addLeadingZero(leftTime) {

    for (const key in leftTime) {
        if (Object.hasOwnProperty.call(leftTime, key)) {
            leftTime[key].toString().padStart(2, "0");

        }
    }

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

function addLeadingZero(times) {
    return times.toString().padStart(2, "0");
}

btnStart.addEventListener('click', () => {
    setInterval(() => {
        deltaTime = deltaTime - 1000;
        let { days, hours, minutes, seconds } = convertMs(deltaTime);


        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);


        // addLeadingZero(leftTime);
    }, 1000);
});