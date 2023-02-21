import {putDate} from './currentDate';
import {getTimeOfDay} from './greeting';

const time = document.querySelector('.time');
const timeBrakepoints = [
  '00:00:00',
  '06:00:00',
  '12:00:00',
  '18:00:00',
];

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  if (currentTime === timeBrakepoints[0]) {
    putDate();
  }
  if (timeBrakepoints.includes(currentTime)) {
    let day = getTimeOfDay();
    greeting.innerText = `Good ${day},`;
  }

  setTimeout(showTime, 1000);
};

showTime();
