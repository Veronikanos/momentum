import langObject from '../utils/languageObj';
import {putDate} from './currentDate';
import {fillElementsOnWeatherBlock} from './weather';
import {putQuoteToMarkup} from './quotes';
import {renderSettingsMenu} from './settings';
import {greet} from './greeting';
import {getCheckedRadioForSettings} from './localStorage';
import {hideOrShowSettingsBlocks} from './localStorage';

const radioGroup = document.querySelectorAll(
  'input[name="language"]'
);

export const translateText = async () => {
  greet();
  putDate();
  putQuoteToMarkup(localStorage.getItem('randomQuoteNumber'));

  await fillElementsOnWeatherBlock(localStorage.getItem('city'));

  getCheckedRadioForSettings();
};

let radioContainerLanguage = document.querySelector('#Language');
// console.log(radioContainerLanguage);

const handleRadioChange = (e) => {
  if (!e.target.matches('input[type="radio"]')) {
    return;
  }

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
    const checkedSettingElement = checkedRadio.id;

    const checkedSettingInput = document.querySelector(
      `#${checkedSettingElement}`
    );

    // set changed settings to localStorage
    localStorage.setItem(
      `${checkedSettingInput.name}`,
      checkedSettingInput.id
    );

    hideOrShowSettingsBlocks(checkedSettingInput);
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
