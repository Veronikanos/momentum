import langObject from './languageObj';
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
  await fillElementsOnWeatherBlock();

  // const weatherIn = document.querySelector('.weatherIn');
  const windText = document.querySelector('.wind-text');
  const humidityText = document.querySelector('.humidity-text');
  const lastUpdatedText = document.querySelector(
    '.last-updated-text'
  );
  const cityInput = document.querySelector('.city');
  const nameInput = document.querySelector('.name');

  // weatherIn.innerText = langObject[lang].weather;
  windText.innerText = langObject[lang].wind;
  humidityText.innerText = langObject[lang].humidity;
  lastUpdatedText.innerText = langObject[lang].lastUpdatedText;
  cityInput.placeholder = langObject[lang].placeholderCity;
  nameInput.placeholder = langObject[lang].placeholder;
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
