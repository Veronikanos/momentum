import {getTimeOfDay} from './currentTime';
import langObject from '../utils/languageObj';

export const greet = () => {
  const greeting = document.querySelector('.greeting-text');
  const userName = document.querySelector('input.name');
  const lang = localStorage.getItem('lang') ?? 'en';
  let day = getTimeOfDay();

  greeting.innerText = `${langObject[lang][day]},`;
  userName.placeholder = `${langObject[lang].placeholder}`;
};

greet();
