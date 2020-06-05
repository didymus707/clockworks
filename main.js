let timerObj = {
  minutes: 0,
  seconds: 0,
  timerId: 0
}

const soundAlarm = () => {
  let amount = 3;
  let audio = new Audio('Timer_Sound_Effect.mp3');

  const playSound = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  for (let i = 0; i < amount; i++) {
    setTimeout(playSound, 1200 * i);
  }
}

const updateValue = ((key, value) => {
  if (value < 0) value = 0;
  console.log('Positive Numbers');

  if (key === 'seconds') {
    if (value < 10) value = '0' + value;
  }

  let keySelect = document.getElementById(key);

  keySelect.innerHTML = value || 0
  timerObj[key] = value;
  console.log(keySelect);
  console.log('mins', timerObj.minutes);
  console.log('secs', timerObj.seconds);
});


(function detectChanges(key) {
  let input = document.getElementById(`${key}-input`);

  input.addEventListener('change', () => {
    updateValue(key, input.value);
  })

  input.addEventListener('keyup', () => {
    updateValue(key, input.value);
  })
  return arguments.callee;
})('minutes')('seconds');

let start = document.getElementById('start-btn');
let pause = document.getElementById('pause-btn');
let stopBtn = document.getElementById('stop-btn');

const startTimer = () => {
  buttonManager(['start', false], ['pause', true], ['stop', true]);
};

const pauseTimer = () => {
  buttonManager(['start', true], ['pause', false], ['stop', true]);
};

const stopTimer = () => {
  buttonManager(['start', true], ['pause', false], ['stop', false]);
};


const buttonManager = (...buttons) => {
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i][0] + '-btn';
    if (buttons[i][1]) {
      document.getElementById(button).removeAttribute('disabled');
      console.log(document.getElementById(button));
    } else {
      document.getElementById(button).setAttribute('disabled', '');
      console.log(document.getElementById(button));
    }
  }
};

start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);
