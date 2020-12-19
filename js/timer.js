const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate.getTime();
  }

  start() {
    updateTimer(0);

    const intervalId = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = this.targetDate - currentDate;

      if (deltaTime <= 0) {
        updateTimer(0);
        clearInterval(intervalId);
        return;
      }

      updateTimer(deltaTime);
    }, 1000);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jan 01, 2021"),
});

timer.start();

function updateTimer(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}
