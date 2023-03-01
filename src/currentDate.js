import langObject from './languageObj';

export const putDate = () => {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const currentDay = document.querySelector('.date');
  let currentDate = '';

  const lang = localStorage.getItem('lang')
    ? localStorage.getItem('lang')
    : 'en';

  currentDate = date.toLocaleDateString(
    langObject[lang].locale,
    options
  );

  currentDay.innerText = `${currentDate}`;
};

putDate();
