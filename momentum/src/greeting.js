import {getTimeOfDay} from './currentTime';

const greeting = document.querySelector('.greeting');
const input = document.querySelector('input.name');

let day = getTimeOfDay();
greeting.innerText = `Good ${day},`;

const setLocalStorage = () => {
  if (input.value) {
    localStorage.setItem('name', input.value);
  }
};

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
};

getLocalStorage();
window.addEventListener('beforeunload', setLocalStorage);
