import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


class TimeCounter {


    constructor() {

        this.dataDays = document.querySelector('span[data-days=""]');
        this.dataHours = document.querySelector('span[data-hours=""]');
        this.dataMinutes = document.querySelector('span[data-minutes=""]');
        this.dataSeconds = document.querySelector('span[data-seconds=""]');
        this.deltaTime, this.leftTime;


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

        let btnStart = document.querySelector('button[data-start=""]');
        let dtPicker = document.querySelector('input[type="text"]');
        let deltaTime;
        let options = {
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

        btnStart.addEventListener('click', () => {
            setInterval(() => {
                deltaTime = deltaTime - 1000;
                let { days, hours, minutes, seconds } = this.convertMs(deltaTime);

                this.dataDays.textContent = this.addLeadingZero(days);
                this.dataHours.textContent = this.addLeadingZero(hours);
                this.dataMinutes.textContent = this.addLeadingZero(minutes);
                this.dataSeconds.textContent = this.addLeadingZero(seconds);
            }, 1000);
        });
    }
}

let timeCounter = new TimeCounter();
timeCounter.Init();