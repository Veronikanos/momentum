import langObject from '../utils/languageObj';
import {putDate} from './currentDate';
import {getTimeOfDay} from './currentTime';
import {fillElementsOnWeatherBlock} from './weather';
import {putQuoteToMarkup} from './quotes';

const radioGroup = document.getElementsByName('language');

const translateText = async () => {
  const lang = localStorage.getItem('lang');
  const greeting = document.querySelector('.greeting');
  const day = getTimeOfDay();

  greeting.innerText = `${langObject[lang][day]},`;
  putDate();
  putQuoteToMarkup(localStorage.getItem('randomQuoteNumber'));

  await fillElementsOnWeatherBlock(localStorage.getItem('city'));
};

for (let i = 0; i < radioGroup.length; i++) {
  radioGroup[i].addEventListener('change', function () {
    const checkedRadio = document.querySelector(
      'input[name="language"]:checked'
    );
    localStorage.setItem('lang', checkedRadio.id);
    translateText();
  });
}

const getTranslationState = () => {
  const language = localStorage.getItem('lang') ?? 'en';
  if (language) {
    for (let i = 0; i < radioGroup.length; i++) {
      if (radioGroup[i].id === language) {
        radioGroup[i].checked = true;
      }
    }
    translateText();
  } else {
    localStorage.setItem('lang', 'en');
  }
};

getTranslationState();
