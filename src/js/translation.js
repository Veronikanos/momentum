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

let radioContainerLanguage = document.querySelector('#Language');
// console.log(radioContainerLanguage);

const handleRadioChange = (e) => {
  if (!e.target.matches('input[type="radio"]')) {
    return;
  }

  // console.log(e.target);
  const checkedRadio = e.target;

  if (checkedRadio.name === 'language') {
    localStorage.setItem('lang', checkedRadio.id);

    document.querySelector('.floating-menu').innerHTML =
      renderSettingsMenu().join('');
    const checked = document.querySelector(`#${checkedRadio.id}`);
    checked.checked = true;

    radioContainerLanguage = document.querySelector('#Language');
    radioContainerLanguage.addEventListener(
      'change',
      handleRadioChange
    );
    translateText();
  } else {
    console.log(checkedRadio);
  }
};

radioContainerLanguage.addEventListener('change', handleRadioChange);

// const floatingMenu = document.querySelectorAll('.radio_container');
// console.log(floatingMenu);

// floatingMenu.forEach((item) =>
//   item.addEventListener('change', handleRadioChange)
// );
const floatingMenu = document.querySelector('.floating-menu');
floatingMenu.addEventListener('change', handleRadioChange);
