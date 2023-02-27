import langObject from './languageObj';
import {putDate} from './currentDate';
import {getTimeOfDay} from './currentTime';

const radioGroup = document.getElementsByName('radio');

const translateText = () => {
  const lang = localStorage.getItem('lang');
  const greeting = document.querySelector('.greeting');
  const day = getTimeOfDay();

  greeting.innerText = `${langObject[lang][day]},`;
  putDate();
};

for (let i = 0; i < radioGroup.length; i++) {
  radioGroup[i].addEventListener('change', function () {
    const checkedRadio = document.querySelector(
      'input[name="radio"]:checked'
    );
    // lang = checkedRadio.id;
    localStorage.setItem('lang', checkedRadio.id);
    translateText();
  });
}

const getTranslationState = () => {
  const language = localStorage.getItem('lang');
  if (language) {
    for (let i = 0; i < radioGroup.length; i++) {
      if (radioGroup[i].id === language) {
        radioGroup[i].checked = true;
      }
    }
    translateText();
    // const greeting = document.querySelector('.greeting');
    // if (language === 'ru') {
    //   greeting.innerText = `gnfgjn`;
    // }
  } else {
    localStorage.setItem('lang', 'en');
  }
};

getTranslationState();
