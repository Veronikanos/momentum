import {putDate} from './currentDate';
import {setNewBackground} from './image-slider';

const timeBrakepoints = [
  '00:00:00',
  '06:00:00',
  '12:00:00',
  '18:00:00',
];

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();

  // show different style of clock
  const clockStyle = localStorage.getItem('clockStyle') ?? 'classic';
  if (clockStyle === 'classic') {
    const time = document.querySelector('.time');
    time.textContent = currentTime;
  } else {
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    const seconds = date.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = date.getMinutes();
    const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = date.getHours();
    const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

  if (currentTime === timeBrakepoints[0]) {
    putDate();
  }
  if (timeBrakepoints.includes(currentTime)) {
    let day = getTimeOfDay();
    const greeting = document.querySelector('.greeting-text');
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

// const secondHand = document.querySelector('.second-hand');
// const minsHand = document.querySelector('.min-hand');
// const hourHand = document.querySelector('.hour-hand');

// function setDate() {
//   const now = new Date();

//   const seconds = now.getSeconds();
//   const secondsDegrees = (seconds / 60) * 360 + 90;
//   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

//   const mins = now.getMinutes();
//   const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
//   minsHand.style.transform = `rotate(${minsDegrees}deg)`;

//   const hour = now.getHours();
//   const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
//   hourHand.style.transform = `rotate(${hourDegrees}deg)`;
// }

// setInterval(setDate, 1000);

// setDate();
