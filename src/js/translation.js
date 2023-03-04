import langObject from '../utils/languageObj';
import {putDate} from './currentDate';
import {getTimeOfDay} from './currentTime';
import {fillElementsOnWeatherBlock} from './weather';
import {putQuoteToMarkup} from './quotes';
// import {renderSettingsMenu} from './settings';

const radioGroup = document.getElementsByName('language');

export const translateText = async () => {
  const lang = localStorage.getItem('lang');
  const greeting = document.querySelector('.greeting');
  const day = getTimeOfDay();

  greeting.innerText = `${langObject[lang][day]},`;
  putDate();
  putQuoteToMarkup(localStorage.getItem('randomQuoteNumber'));

  await fillElementsOnWeatherBlock(localStorage.getItem('city'));

  // //translate settings block
  // document.querySelector('.floating-menu').innerHTML =
  //   renderSettingsMenu().join('');
};

for (let i = 0; i < radioGroup.length; i++) {
  radioGroup[i].addEventListener('change', function () {
    const checkedRadio = document.querySelector(
      'input[name="language"]:checked'
    );
    console.log(checkedRadio);
    localStorage.setItem('lang', checkedRadio.id);
    translateText();
  });
}
// console.log(radioGroup[0].checked);
// console.log(radioGroup[1].checked);

const getTranslationState = async () => {
  const language = localStorage.getItem('lang') ?? 'en';
  if (language) {
    for (let i = 0; i < radioGroup.length; i++) {
      if (radioGroup[i].id === language) {
        radioGroup[i].checked = true;
      }
    }
    await translateText();
  } else {
    localStorage.setItem('lang', 'en');
  }
};

getTranslationState();
