let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown)
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

   countdown =  setInterval(() => {
     const secondsLeft = Math.round((then - Date.now())/ 1000);
     if(secondsLeft < 0) {
        clearInterval(countdown);
        return;
    }
     displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    const mins = Math.floor(seconds / 60);
    let remainderSeconds = (seconds % 60);
    const display = `${mins}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour > 12 ? hour -12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`
  }

  function startTime() {
    let seconds = parseInt(this.dataset.time);
    timer(seconds);
  }

  buttons.forEach(button => button.addEventListener('click', startTime));

  document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    this.reset();
    const seconds = (mins * 60);
    timer(seconds);
  })