import {getTimeOfDay} from './currentTime';

const greeting = document.querySelector('.greeting');

let day = getTimeOfDay();
greeting.innerText = `Good ${day},`;
