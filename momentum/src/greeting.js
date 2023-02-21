const greeting = document.querySelector('.greeting');
const input = document.querySelector('input.name');

const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timeOfDay[Math.floor(hours / 6)];
};

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
