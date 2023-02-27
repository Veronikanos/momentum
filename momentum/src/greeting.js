import {getTimeOfDay} from './currentTime';
import langObject from './languageObj';

const greeting = document.querySelector('.greeting');

let day = getTimeOfDay();

// if (localStorage.getItem('lang') === 'ru') {
//   greeting.innerText = `${langObject.ru[day]},`;
// } else {
greeting.innerText = `${langObject.en[day]},`;
// }
