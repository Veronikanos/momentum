import {getTimeOfDay} from './currentTime';
import langObject from '../utils/languageObj';

const greeting = document.querySelector('.greeting');

let day = getTimeOfDay();
console.log(day);

// if (localStorage.getItem('lang') === 'ru') {
//   greeting.innerText = `${langObject.ru[day]},`;
// } else {
greeting.innerText = `${langObject.en[day]},`;
// }
