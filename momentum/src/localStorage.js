import {fillElementsOnWeatherBlock} from './weather';

const input = document.querySelector('input.name');
const inputCity = document.querySelector('.city');

const setLocalStorage = () => {
  if (input.value) {
    localStorage.setItem('name', input.value);
  }
  if (inputCity.value) {
    localStorage.setItem('city', inputCity.value);
  }
};

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    fillElementsOnWeatherBlock(localStorage.getItem('city'));
  }
};

getLocalStorage();
window.addEventListener('beforeunload', setLocalStorage);
