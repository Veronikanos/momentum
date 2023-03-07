import {fillElementsOnWeatherBlock} from './weather';
import {renderSettingsMenu} from './settings';
import {setNewBackground} from './image-slider';
import {renderImagesMenu} from './imagesApi';

const input = document.querySelector('input.name');

const setLocalStorage = () => {
  if (input.value) {
    localStorage.setItem('name', input.value);
  }
};

export const hideOrShowSettingsBlocks = (checkedSettingInput) => {
  if (checkedSettingInput.id.includes('Off')) {
    document.querySelector(
      `.${checkedSettingInput.name}`
    ).style.visibility = 'hidden';
    document.querySelector(
      `.${checkedSettingInput.name}`
    ).style.opacity = '0';
  } else {
    document.querySelector(
      `.${checkedSettingInput.name}`
    ).style.visibility = 'visible';
    document.querySelector(
      `.${checkedSettingInput.name}`
    ).style.opacity = '1';
  }
};

export const getCheckedRadioForSettings = () => {
  // get values from localStorage and render appropriate settings list
  const radioGroup = document.querySelectorAll('.radio_container');

  radioGroup.forEach((item) => {
    const category = item.id.toLowerCase();
    if (category !== 'language') {
      const categoryId =
        localStorage.getItem(`${category}`) ?? `${category}On`;

      // highlight checked radio, use data from localStorage or default data
      const checkedOption = item.querySelector(`#${categoryId}`);
      checkedOption.checked = true;
      hideOrShowSettingsBlocks(checkedOption);
    }
  });
};

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    fillElementsOnWeatherBlock(localStorage.getItem('city'));
  }
  const lang = localStorage.getItem('lang') ?? 'en';
  const floatingMenu = document.querySelector('.floating-menu');
  floatingMenu.innerHTML = renderSettingsMenu().join('');
  const checkedRadio = document.querySelector(`#${lang}`);
  checkedRadio.checked = true;

  getCheckedRadioForSettings();

  const bg = localStorage.getItem('bg') ?? 'standard';
  if (bg === 'standard') {
    //first render images menu and set appropriate settinga
    const floatingMenuImage = document.querySelector(
      '.floating-menu.image'
    );
    floatingMenuImage.innerHTML = renderImagesMenu().join('');

    localStorage.setItem('bg', 'standard');
    setNewBackground();
    const standardImageRadio = floatingMenuImage.querySelector(
      'input[id="standard"]'
    );
    //   const flickrImageRadio = floatingMenuImage.querySelector(
    //     'input[id="FlickrOff"]'
    //   );
    standardImageRadio.checked = true;
    //   flickrImageRadio.checked = true;
    // } else {
    //   // getBgFromApi();
  }
};

getLocalStorage();
window.addEventListener('beforeunload', setLocalStorage);
