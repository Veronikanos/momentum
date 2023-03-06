import langObject from '../utils/languageObj';
import {putDate} from './currentDate';
import {fillElementsOnWeatherBlock} from './weather';
import {putQuoteToMarkup} from './quotes';
import {renderSettingsMenu} from './settings';
import {greet} from './greeting';

const radioGroup = document.querySelectorAll(
  'input[name="language"]'
);

export const translateText = async () => {
  // const lang = localStorage.getItem('lang') ?? 'en';

  greet();
  putDate();
  putQuoteToMarkup(localStorage.getItem('randomQuoteNumber'));

  await fillElementsOnWeatherBlock(localStorage.getItem('city'));

  //translate settings block
  // document.querySelector('.floating-menu').innerHTML =
  //   renderSettingsMenu().join('');
  // console.log(checkedRadio);
};

let radioContainerLanguage = document.querySelector(
  '.radio_container'
);

const handleRadioChange = (e) => {
  if (!e.target.matches('input[type="radio"]')) {
    return;
  }
  const checkedRadio = e.target;

  localStorage.setItem('lang', checkedRadio.id);

  document.querySelector('.floating-menu').innerHTML =
    renderSettingsMenu().join('');
  const checked = document.querySelector(`#${checkedRadio.id}`);
  checked.checked = true;

  radioContainerLanguage = document.querySelector('.radio_container');
  radioContainerLanguage.addEventListener(
    'change',
    handleRadioChange
  );

  translateText();
};

radioContainerLanguage.addEventListener('change', handleRadioChange);
