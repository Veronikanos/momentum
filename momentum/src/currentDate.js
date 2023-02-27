import langObject from './languageObj';
import {week} from './languageObj';

export const putDate = () => {
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const currentDay = document.querySelector('.date');
  const currentWeekDay = date.getDay();
  let currentDate = '';

  const lang = localStorage.getItem('lang')
    ? localStorage.getItem('lang')
    : 'en';

  currentDate = date.toLocaleDateString(
    langObject[lang].locale,
    options
  );

  currentDay.innerText = `${week[lang][currentWeekDay]}, ${currentDate}`;
};

putDate();
