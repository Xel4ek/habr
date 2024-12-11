'use strict';
(() => {
  const app = document.getElementById("app");
  const template = document.getElementById("timer-template");
  const addTimer = document.getElementById("add-timer");
  const timeInput = document.getElementById("time-input");

  const timers = app.querySelector('#timers');

  timeInput.oninput = function (event) {
    const value = +event.target.value;
    if (value > 0) {
      addTimer.removeAttribute("disabled");
    } else {
      addTimer.setAttribute("disabled", "");
    }
  };

  function createTimer(seconds) {
    const row = document.createElement("div");
    row.classList.add("row");
    const node = template.content.cloneNode(true);
    const time = node.querySelector('.time');
    const cancel = node.querySelector('.cancel');

    row.appendChild(node);
    time.textContent = timerFormat(seconds);

    row.onanimationend = function () {
      row.remove();
    }

    const interval = setInterval(() => {
      time.textContent = timerFormat(--seconds);
      if (!seconds) {
        clearInterval(interval);
        row.classList.add('remove');
      }
    }, 1000);

    cancel.onclick = () => {
      clearInterval(interval);
      row.classList.add('remove');
    }

    timers.prepend(row);
  }

  addTimer.onclick = () => {
    const seconds = +timeInput.value;

    if (seconds > 0) {
      createTimer(seconds);
      timeInput.value = '';
      addTimer.setAttribute("disabled", "");
    }
  }


  function prettyTime(time) {
    return `${time}`.padStart(2, '0');
  }

  function timerFormat(inputSeconds) {
    const days = Math.trunc(inputSeconds / (24 * 60 * 60));
    const hours = Math.trunc(inputSeconds / (60 * 60) % (24));
    const minutes = Math.trunc(inputSeconds / 60 % 60);
    const seconds = Math.trunc(inputSeconds % 60);

    return `${days ? days + ' д. ' : ''}${hours ? prettyTime(hours) + ':' : ''}${prettyTime(minutes)}:${prettyTime(seconds)}`;
  }
})();