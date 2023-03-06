import {fillElementsOnWeatherBlock} from './weather';
import {renderSettingsMenu} from './settings';

const input = document.querySelector('input.name');
const inputCity = document.querySelector('.city');

const setLocalStorage = () => {
  if (input.value) {
    localStorage.setItem('name', input.value);
  }
};

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    fillElementsOnWeatherBlock(localStorage.getItem('city'));
  }
  const lang = localStorage.getItem('lang') ?? 'en';

  document.querySelector('.floating-menu').innerHTML =
    renderSettingsMenu().join('');
  const checkedRadio = document.querySelector(`#${lang}`);
  checkedRadio.checked = true;
};

getLocalStorage();
window.addEventListener('beforeunload', setLocalStorage);
