import langObject from '../utils/languageObj';
import {putDate} from './currentDate';
import {getTimeOfDay} from './currentTime';
import {fillElementsOnWeatherBlock} from './weather';
import {putQuoteToMarkup} from './quotes';

const radioGroup = document.getElementsByName('radio');

const translateText = async () => {
  const lang = localStorage.getItem('lang');
  const greeting = document.querySelector('.greeting');
  const day = getTimeOfDay();

  greeting.innerText = `${langObject[lang][day]},`;
  putDate();
  putQuoteToMarkup(localStorage.getItem('randomQuoteNumber'));

  // if (
  //   document
  //     .querySelector('.weather')
  //     .querySelector('.weatherInfoList')
  // ) {
  await fillElementsOnWeatherBlock(localStorage.getItem('city'));
  // }
};

for (let i = 0; i < radioGroup.length; i++) {
  radioGroup[i].addEventListener('change', function () {
    const checkedRadio = document.querySelector(
      'input[name="radio"]:checked'
    );
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
  } else {
    localStorage.setItem('lang', 'en');
  }
};

getTranslationState();
