let countdown;
const form = document.customForm;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTime(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown); 
            return;
        }
        displayTime(secondsLeft);
    }, 1000);
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamps) {
    const end = new Date(timestamps);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at: ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(this.minutes.value);
    const seconds = this.minutes.value * 60;
    timer(seconds);
    this.reset();
});

function startTimer() {
    timer(parseInt(this.dataset.time));
}
buttons.forEach(button => button.addEventListener('click', startTimer));