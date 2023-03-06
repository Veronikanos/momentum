import {getTimeOfDay} from './currentTime';
import langObject from '../utils/languageObj';

export const greet = () => {
  const greeting = document.querySelector('.greeting');
  const lang = localStorage.getItem('lang') ?? 'en';
  let day = getTimeOfDay();
  // console.log(langObject[lang][day]);

  greeting.innerText = `${langObject[lang][day]},`;
};

// greet();
