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
  if (key === 'seconds') {
    if (value < 10) value = '0' + value;
  }

  let keySelect = document.getElementById(key);

  keySelect.innerHTML = value || 0
  timerObj[key] = value;
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
  freezeInputs();

  // trying to fix the bugs
  timerObj.timerId = setInterval(() => {
    timerObj.seconds--;
    if (timerObj.minutes === 0 && timerObj.seconds < 0) {
      let start = document.getElementById('start-btn');
      start.addEventListener('click', (event)=> {
        event.preventDefault();
      });
      console.log('This is the functioning block');
    }

    else if (timerObj.seconds < 0 ) {
      if (timerObj.minutes === 0) {
        console.log('Sound Alarm');
        soundAlarm();
        return stopTimer();
      } timerObj.seconds = 59;
      timerObj.minutes--;
    }
    updateValue('minutes', timerObj.minutes);
    updateValue('seconds', timerObj.seconds);

  }, 1000);
};

// Jesse Caine's Solution
//   timerObj.timerId = setInterval(() => {
//     timerObj.seconds--;
//     if (timerObj.seconds < 0) {
//       if (timerObj.minutes === 0) {
//         console.log('Sound Alarm');
//         soundAlarm();
//         return stopTimer();
//       } timerObj.seconds = 59;
//       timerObj.minutes--;
//     }
//     updateValue('minutes', timerObj.minutes);
//     updateValue('seconds', timerObj.seconds);

//   }, 1000);
// };

const pauseTimer = () => {
  buttonManager(['start', true], ['pause', false], ['stop', true]);
  clearInterval(timerObj.timerId);
};

const stopTimer = () => {
  clearInterval(timerObj.timerId);
  buttonManager(['start', true], ['pause', false], ['stop', false]);
  unfreezeInputs();
  updateValue('minutes', document.getElementById('minutes-input').value);
  let seconds = document.getElementById('seconds-input').value || 0;
  updateValue('seconds', seconds);
};


const buttonManager = (...buttons) => {
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i][0] + '-btn';
    if (buttons[i][1]) {
      document.getElementById(button).removeAttribute('disabled');
    } else {
      document.getElementById(button).setAttribute('disabled', '');
    }
  }
};

start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);

const freezeInputs = () => {
  let mins = document.getElementById('minutes-input');
  let secs = document.getElementById('seconds-input');

  mins.setAttribute('disabled', '');
  secs.setAttribute('disabled', '');
}

const unfreezeInputs = () => {
  let mins = document.getElementById('minutes-input');
  let secs = document.getElementById('seconds-input');

  mins.removeAttribute('disabled');
  secs.removeAttribute('disabled');
}