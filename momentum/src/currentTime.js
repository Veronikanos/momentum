import {putDate} from './currentDate';
import {setNewBackground} from './image-slider';

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
    setNewBackground();
  }

  setTimeout(showTime, 1000);
};

export const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timeOfDay[Math.floor(hours / 6)];
};

showTime();
