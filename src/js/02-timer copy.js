import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


class TimeCounter {

    constructor() {
        this.dtPicker = this.getEl('input[type="text"]');
        this.btnStart = this.getEl('button[data-start=""]');
        this.dataDays = this.getEl('span[data-days=""]');
        this.dataHours = this.getEl('span[data-hours=""]');
        this.dataMinutes = this.getEl('span[data-minutes=""]');
        this.dataSeconds = this.getEl('span[data-seconds=""]');
        this.deltaTime, leftTime;
        options = {
            enableTime: true,
            time_24hr: true,
            defaultDate: new Date(),
            minuteIncrement: 1,
            this.onClose(selectedDates),
        };
    }

    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] < new Date()) {
            console.log("Please choose a date in the future");
            btnStart.setAttribute('disabled', 'disabled');

        } else {
            btnStart.removeAttribute('disabled');
            deltaTime = selectedDates[0] - new Date();
        }
    }

    getEl(selector) {
        return document.querySelector(selector);
    }

    convertMs(ms) {
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

    addLeadingZero(times) {
        return times.toString().padStart(2, "0");
    }

    Init() {
        btnStart.addEventListener('click', () => {
            setInterval(() => {
                deltaTime = deltaTime - 1000;
                let { days, hours, minutes, seconds } = this.convertMs(deltaTime);

                this.dataDays.textContent = this.addLeadingZero(days);
                this.dataHours.textContent = this.addLeadingZero(hours);
                this.dataMinutes.textContent = this.addLeadingZero(minutes);
                this.dataSeconds.textContent = this.addLeadingZero(seconds);


                // addLeadingZero(leftTime);
            }, 1000);
        });

        flatpickr(dtPicker, options);
    }
}

let timeCounter = new TimeCounter();
timeCounter.Init();