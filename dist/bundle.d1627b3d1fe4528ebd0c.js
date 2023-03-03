/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/audioplayer.js":
/*!*******************************!*\
  !*** ./src/js/audioplayer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _playList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playList */ "./src/js/playList.js");

const playButton = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListWrapper = document.querySelector('.play-list');
const audioProgress = document.querySelector('.progress');
const volumeIcon = document.querySelector('.volume_icon');
let isPlay = false;
let playNum = 0;
let audioCurrentTime = 0;
const audio = new Audio();
const formateTime = num => {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};
const handleAudioLoaded = () => {
  document.querySelector('.length').textContent = formateTime(audio.duration);
  audio.volume = 0.75;
};
const highlightActiveTrack = () => {
  const trackName = document.querySelector('.track-name');
  allTracks.forEach((element, index) => {
    element.classList.remove('item-active');
    if (index === playNum) {
      element.classList.add('item-active');
      trackName.textContent = element.innerText;
    }
  });
};
const playAudio = () => {
  isPlay = true;
  audio.src = _playList__WEBPACK_IMPORTED_MODULE_0__["default"][playNum].src;
  audio.play();
  audio.currentTime = audioCurrentTime;
  highlightActiveTrack();
  playButton.classList.add('pause');
  document.querySelector('.item-active').firstChild.classList.add('pause');
};
const pauseAudio = () => {
  audio.pause();
  audioCurrentTime = audio.currentTime;
  playButton.classList.remove('pause');
  document.querySelector('.item-active').firstChild.classList.remove('pause');
};
const handlePlayButton = () => {
  isPlay = !isPlay;
  isPlay ? playAudio() : pauseAudio();
};
const toggleIconNextToTrackInList = () => {
  if (document.querySelector('.item-active').firstChild.classList.contains('pause')) {
    document.querySelector('.item-active').firstChild.classList.remove('pause');
  }
};
const handlePlayPrevButton = () => {
  toggleIconNextToTrackInList();
  if (!playNum) {
    playNum = _playList__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1;
  } else playNum--;
  audioCurrentTime = 0;
  isPlay && playAudio();
  highlightActiveTrack();
};
const handlePlayNextButton = () => {
  toggleIconNextToTrackInList();
  playNum = playNum === _playList__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1 ? 0 : playNum + 1;
  audioCurrentTime = 0;
  isPlay && playAudio();
  highlightActiveTrack();
};
const showListOfTracks = () => {
  let arr = [];
  _playList__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(element => {
    arr.push(`<li class='play-item'><button class="play play-track player-icon"></button><span>${element.title}</span></li>`);
  });
  return arr;
};
const handleClickToTrack = e => {
  // if click to active track, check if needs to play or stop
  if (e.target.closest('li').classList.contains('item-active')) {
    handlePlayButton();
    return;
  }
  allTracks.forEach((item, index) => {
    item.firstChild.classList.remove('pause');
    if (item === e.target.closest('li')) {
      playNum = index;
      playButton.classList.add('pause');
      item.firstChild.classList.add('pause');
      audioCurrentTime = 0;
      playAudio();
    }
  });
};
const showTrackList = () => {
  playListWrapper.insertAdjacentHTML('beforeend', showListOfTracks().join(''));
};
const setFirstActiveTrack = () => {
  allTracks[0].classList.add('item-active');
  audio.src = _playList__WEBPACK_IMPORTED_MODULE_0__["default"][playNum].src;
  highlightActiveTrack();
};
const updateProgressValue = () => {
  if (audio.duration) {
    audioCurrentTime = audio.currentTime;
    document.querySelector('.current').textContent = formateTime(audio.currentTime);
    audioProgress.value = 100 * (audio.currentTime / audio.duration);
  }
};
const setNewTrackTime = () => {
  if (audio.duration) {
    audio.currentTime = audioProgress.value * audio.duration / 100;
  }
};

// const audioVolume = document.getElementById('audioVolume');
// const audioProgress = document.getElementById('audioProgress');

volumeIcon.addEventListener('click', () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeIcon.classList.add('mute');
  } else {
    volumeIcon.classList.remove('mute');
  }
});
showTrackList();
const allTracks = document.querySelectorAll('.play-item');
setFirstActiveTrack();
audioProgress.addEventListener('input', setNewTrackTime);
playListWrapper.addEventListener('click', handleClickToTrack);
audio.addEventListener('loadeddata', handleAudioLoaded);
audio.addEventListener('timeupdate', updateProgressValue);
audio.addEventListener('ended', handlePlayNextButton);
playButton.addEventListener('click', handlePlayButton);
playPrev.addEventListener('click', handlePlayPrevButton);
playNext.addEventListener('click', handlePlayNextButton);

/***/ }),

/***/ "./src/js/currentDate.js":
/*!*******************************!*\
  !*** ./src/js/currentDate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "putDate": () => (/* binding */ putDate)
/* harmony export */ });
/* harmony import */ var _languageObj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languageObj */ "./src/js/languageObj.js");

const putDate = () => {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  const currentDay = document.querySelector('.date');
  let currentDate = '';
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  currentDate = date.toLocaleDateString(_languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].locale, options);
  currentDay.innerText = `${currentDate}`;
};
putDate();

/***/ }),

/***/ "./src/js/currentTime.js":
/*!*******************************!*\
  !*** ./src/js/currentTime.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTimeOfDay": () => (/* binding */ getTimeOfDay)
/* harmony export */ });
/* harmony import */ var _currentDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentDate */ "./src/js/currentDate.js");
/* harmony import */ var _image_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-slider */ "./src/js/image-slider.js");


const time = document.querySelector('.time');
const timeBrakepoints = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];
const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  if (currentTime === timeBrakepoints[0]) {
    (0,_currentDate__WEBPACK_IMPORTED_MODULE_0__.putDate)();
  }
  if (timeBrakepoints.includes(currentTime)) {
    let day = getTimeOfDay();
    const greeting = document.querySelector('.greeting');
    greeting.innerText = `Good ${day},`;
    (0,_image_slider__WEBPACK_IMPORTED_MODULE_1__.setNewBackground)();
  }
  setTimeout(showTime, 1000);
};
const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timeOfDay[Math.floor(hours / 6)];
};
showTime();

/***/ }),

/***/ "./src/js/greeting.js":
/*!****************************!*\
  !*** ./src/js/greeting.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _currentTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentTime */ "./src/js/currentTime.js");
/* harmony import */ var _languageObj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languageObj */ "./src/js/languageObj.js");


const greeting = document.querySelector('.greeting');
let day = (0,_currentTime__WEBPACK_IMPORTED_MODULE_0__.getTimeOfDay)();
console.log(day);

// if (localStorage.getItem('lang') === 'ru') {
//   greeting.innerText = `${langObject.ru[day]},`;
// } else {
greeting.innerText = `${_languageObj__WEBPACK_IMPORTED_MODULE_1__["default"].en[day]},`;
// }

/***/ }),

/***/ "./src/js/image-slider.js":
/*!********************************!*\
  !*** ./src/js/image-slider.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setNewBackground": () => (/* binding */ setNewBackground)
/* harmony export */ });
/* harmony import */ var _currentTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentTime */ "./src/js/currentTime.js");

let randomImageNumber;
let currentTimeOfDay;
const setBg = (imageNumber, timeOfDay) => {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Veronikanos/images-for-momentum/assets/images/${timeOfDay}/${imageNumber}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Veronikanos/images-for-momentum/assets/images/${timeOfDay}/${imageNumber}.jpg')`;
  };
};
const setNewBackground = () => {
  randomImageNumber = Math.floor(Math.random() * 20 + 1);
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  currentTimeOfDay = (0,_currentTime__WEBPACK_IMPORTED_MODULE_0__.getTimeOfDay)();
  setBg(normalizeNumber, currentTimeOfDay);
};
const prevArrow = document.querySelector('.slide-prev');
const nextArrow = document.querySelector('.slide-next');
const handlePrevArrowClick = () => {
  randomImageNumber = randomImageNumber === 1 ? 20 : randomImageNumber - 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  setBg(normalizeNumber, currentTimeOfDay);
};
const handleNextArrowClick = () => {
  randomImageNumber = randomImageNumber === 20 ? 1 : randomImageNumber + 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  setBg(normalizeNumber, currentTimeOfDay);
};
setNewBackground();
prevArrow.addEventListener('click', handlePrevArrowClick);
nextArrow.addEventListener('click', handleNextArrowClick);

/***/ }),

/***/ "./src/js/languageObj.js":
/*!*******************************!*\
  !*** ./src/js/languageObj.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const langObject = {
  en: {
    langEn: 'English',
    langRu: 'Russian',
    changeLang: 'Language',
    widget: 'Widgets',
    time: 'Time',
    date: 'Date',
    weather: 'Weather in ',
    greeting: 'Greeting',
    quote: 'js/quotesEN.json',
    quoteTitle: 'Quote',
    audioPlayer: 'Audio Player',
    gallery: 'Background image',
    wind: 'Wind speed:',
    windSpeed: 'm/s',
    humidity: 'Humidity:',
    placeholder: '[Enter your name]',
    placeholderCity: '[Enter city]',
    defaultCity: 'Minsk',
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    night: 'Good night',
    locale: 'en-EN',
    addBtn: 'Add',
    errorNoCity: 'Such city doesn`t exist, try another one',
    errorEmptyInput: 'Empty input. Type a city and try again',
    lastUpdatedText: 'Last updated:'
  },
  ru: {
    langEn: 'Английский',
    langRu: 'Русский',
    changeLang: 'Язык',
    widget: 'Виджеты',
    time: 'Время',
    date: 'Дата',
    weather: 'Погода в городе ',
    greeting: 'Приветствие',
    quote: 'js/quotesRU.json',
    quoteTitle: 'Цитата',
    audioPlayer: 'Аудиоплеер',
    gallery: 'Фоновое изображение',
    wind: 'Скорость ветра:',
    windSpeed: 'м/с',
    humidity: 'Влажность воздуха:',
    placeholder: '[Введите ваше имя]',
    placeholderCity: '[Введите город]',
    defaultCity: 'Минск',
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    night: 'Доброй ночи',
    locale: 'ru-RU',
    addBtn: 'Добавить',
    errorNoCity: 'Такого города не найдено, попробуйте другой',
    errorEmptyInput: 'Пустая строка. Введите город и попробуйте снова',
    lastUpdatedText: 'Последнее обновление:'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (langObject);

/***/ }),

/***/ "./src/js/localStorage.js":
/*!********************************!*\
  !*** ./src/js/localStorage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/js/weather.js");

const input = document.querySelector('input.name');
const inputCity = document.querySelector('.city');
const setLocalStorage = () => {
  if (input.value) {
    localStorage.setItem('name', input.value);
  }
};
const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    (0,_weather__WEBPACK_IMPORTED_MODULE_0__.fillElementsOnWeatherBlock)(localStorage.getItem('city'));
  }
};
getLocalStorage();
window.addEventListener('beforeunload', setLocalStorage);

/***/ }),

/***/ "./src/js/playList.js":
/*!****************************!*\
  !*** ./src/js/playList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const playList = [{
  title: 'Aqua Caelestis',
  src: './sounds/Aqua Caelestis.mp3'
}, {
  title: 'Ennio Morricone',
  src: './sounds/Ennio Morricone.mp3'
}, {
  title: 'River Flows In You',
  src: './sounds/River Flows In You.mp3'
}, {
  title: 'Summer Wind',
  src: './sounds/Summer Wind.mp3'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playList);

/***/ }),

/***/ "./src/js/quotes.js":
/*!**************************!*\
  !*** ./src/js/quotes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "putQuoteToMarkup": () => (/* binding */ putQuoteToMarkup)
/* harmony export */ });
/* harmony import */ var _utils_quotesEN__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/quotesEN */ "./src/utils/quotesEN.json");
/* harmony import */ var _utils_quotesRU__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/quotesRU */ "./src/utils/quotesRU.json");


const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonQuote = document.querySelector('.change-quote');
const putQuoteToMarkup = randomQuoteNumber => {
  const language = localStorage.getItem('lang');
  const allQuotes = language === 'en' ? _utils_quotesEN__WEBPACK_IMPORTED_MODULE_0__ : _utils_quotesRU__WEBPACK_IMPORTED_MODULE_1__;
  const randomQuote = allQuotes[randomQuoteNumber];
  quote.textContent = randomQuote.text;
  author.textContent = randomQuote.author;
};
const getRandomQuote = () => {
  const randomQuoteNumber = Math.floor(Math.random() * _utils_quotesEN__WEBPACK_IMPORTED_MODULE_0__.length);
  localStorage.setItem('randomQuoteNumber', randomQuoteNumber);
  putQuoteToMarkup(randomQuoteNumber);
};
getRandomQuote();
buttonQuote.addEventListener('click', getRandomQuote);

/***/ }),

/***/ "./src/js/translation.js":
/*!*******************************!*\
  !*** ./src/js/translation.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _languageObj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languageObj */ "./src/js/languageObj.js");
/* harmony import */ var _currentDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currentDate */ "./src/js/currentDate.js");
/* harmony import */ var _currentTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentTime */ "./src/js/currentTime.js");
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./weather */ "./src/js/weather.js");
/* harmony import */ var _quotes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./quotes */ "./src/js/quotes.js");





const radioGroup = document.getElementsByName('radio');
const translateText = async () => {
  const lang = localStorage.getItem('lang');
  const greeting = document.querySelector('.greeting');
  const day = (0,_currentTime__WEBPACK_IMPORTED_MODULE_2__.getTimeOfDay)();
  greeting.innerText = `${_languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang][day]},`;
  (0,_currentDate__WEBPACK_IMPORTED_MODULE_1__.putDate)();
  (0,_quotes__WEBPACK_IMPORTED_MODULE_4__.putQuoteToMarkup)(localStorage.getItem('randomQuoteNumber'));
  await (0,_weather__WEBPACK_IMPORTED_MODULE_3__.fillElementsOnWeatherBlock)();

  // const weatherIn = document.querySelector('.weatherIn');
  const windText = document.querySelector('.wind-text');
  const humidityText = document.querySelector('.humidity-text');
  const lastUpdatedText = document.querySelector('.last-updated-text');
  const cityInput = document.querySelector('.city');
  const nameInput = document.querySelector('.name');

  // weatherIn.innerText = langObject[lang].weather;
  windText.innerText = _languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].wind;
  humidityText.innerText = _languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].humidity;
  lastUpdatedText.innerText = _languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].lastUpdatedText;
  cityInput.placeholder = _languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].placeholderCity;
  nameInput.placeholder = _languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].placeholder;
};
for (let i = 0; i < radioGroup.length; i++) {
  radioGroup[i].addEventListener('change', function () {
    const checkedRadio = document.querySelector('input[name="radio"]:checked');
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

/***/ }),

/***/ "./src/js/weather.js":
/*!***************************!*\
  !*** ./src/js/weather.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillElementsOnWeatherBlock": () => (/* binding */ fillElementsOnWeatherBlock),
/* harmony export */   "getWeather": () => (/* binding */ getWeather)
/* harmony export */ });
/* harmony import */ var _languageObj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languageObj */ "./src/js/languageObj.js");

const weatherBlock = document.querySelector('.weather');
const weatherIcon = weatherBlock.querySelector('.weather-icon');
const temperature = weatherBlock.querySelector('.temperature');
const weatherDescription = weatherBlock.querySelector('.weather-description');
const windEl = weatherBlock.querySelector('.wind');
const humidity = weatherBlock.querySelector('.humidity');
const inputCity = document.querySelector('.city');
// const titleWeather = document.querySelector('.title-weather');
const updatedInfoBox = document.querySelector('.updated-info');
const lang = localStorage.getItem('lang') ?? 'en';
const getWeather = async function () {
  let city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Minsk';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=8ab18f9fbf76b2fee381039f2e960e34&units=metric`);
  if (response.ok) {
    let data = await response.json();
    return data;
  }
  return error.message;
};
const fillElementsOnWeatherBlock = async cityQuery => {
  // const cityQuery = city ? city : langObject[lang].defaultCity;

  try {
    const {
      weather,
      main,
      wind
    } = await getWeather(cityQuery);
    if (!cityQuery) {
      localStorage.setItem('city', inputCity.value);
      return;
    }

    // if (!inputCity.value) {
    //     weatherBlock.classList.add('hidden');
    // document
    //   .querySelector('.weather-error')
    //   .classList.remove('hidden');
    // } else {
    // 	weatherBlock.classList.remove('hidden');
    // 	document
    // 		.querySelector('.weather-error')
    // 	localStorage.setItem('city', inputCity.value);
    // }

    weatherIcon.classList.add(`owf-${weather[0].id}`);
    temperature.textContent = `${Math.round(main.temp)}°C`;
    weatherDescription.textContent = weather[0].description;
    humidity.textContent = ` ${Math.trunc(main.humidity)}%`;
    windEl.textContent = ` ${Math.trunc(wind.speed)} ${_languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].windSpeed}`;
    inputCity.value =
    // titleWeather.textContent =
    cityQuery.charAt(0).toUpperCase() + cityQuery.slice(1) ?? Minsk;
    updatedInfoBox.textContent = new Date().toLocaleTimeString();
  } catch (error) {
    alert(`${_languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].errorNoCity}`);
  }
};
const searchCity = () => {
  if (!inputCity.value.toLowerCase().trim()) {
    alert(`${_languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].errorEmptyInput}`);
    return;
  }
  fillElementsOnWeatherBlock(inputCity.value.toLowerCase().trim());
};
fillElementsOnWeatherBlock(localStorage.getItem('city') ?? _languageObj__WEBPACK_IMPORTED_MODULE_0__["default"][lang].defaultCity);
inputCity.addEventListener('change', searchCity);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/owfont-regular.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/owfont-regular.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/owfont-regular.eot?v=1.0.0 */ "./assets/fonts/owfont-regular.eot?v=1.0.0"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/owfont-regular.eot */ "./assets/fonts/owfont-regular.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/owfont-regular.woff */ "./assets/fonts/owfont-regular.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/owfont-regular.ttf */ "./assets/fonts/owfont-regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/owfont-regular.svg */ "./assets/fonts/owfont-regular.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___, { hash: "?#iefix&v=1.0.0" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___, { hash: "#owf-regular" });
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*!\r\n *  owfont-regular 1.0.0 by Deniz Fuchidzhiev - http://websygen.com\r\n *  License - font: SIL OFL 1.1, css: MIT License\r\n */\r\n/* FONT PATH\r\n * -------------------------- */\r\n@font-face {\r\n  font-family: 'owfont';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('embedded-opentype'),\r\n\t   url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff'),\r\n\t   url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('truetype'),\r\n\t   url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n.owf {\r\n  display: inline-block;\r\n  font: normal normal normal 14px/1 owfont;\r\n  font-size: inherit;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  transform: translate(0, 0);\r\n}\r\n/* makes the font 33% larger relative to the icon container */\r\n.owf-lg {\r\n  font-size: 1.33333333em;\r\n  line-height: 0.75em;\r\n  vertical-align: -15%;\r\n}\r\n.owf-2x {\r\n  font-size: 2em;\r\n}\r\n.owf-3x {\r\n  font-size: 3em;\r\n}\r\n.owf-4x {\r\n  font-size: 4em;\r\n}\r\n.owf-5x {\r\n  font-size: 5em;\r\n}\r\n.owf-fw {\r\n  width: 1.28571429em;\r\n  text-align: center;\r\n}\r\n.owf-ul {\r\n  padding-left: 0;\r\n  margin-left: 2.14285714em;\r\n  list-style-type: none;\r\n}\r\n.owf-ul > li {\r\n  position: relative;\r\n}\r\n.owf-li {\r\n  position: absolute;\r\n  left: -2.14285714em;\r\n  width: 2.14285714em;\r\n  top: 0.14285714em;\r\n  text-align: center;\r\n}\r\n.owf-li.owf-lg {\r\n  left: -1.85714286em;\r\n}\r\n.owf-border {\r\n  padding: .2em .25em .15em;\r\n  border: solid 0.08em #eeeeee;\r\n  border-radius: .1em;\r\n}\r\n.owf-pull-right {\r\n  float: right;\r\n}\r\n.owf-pull-left {\r\n  float: left;\r\n}\r\n.owf.owf-pull-left {\r\n  margin-right: .3em;\r\n}\r\n.owf.owf-pull-right {\r\n  margin-left: .3em;\r\n}\r\n\r\n/* owfont uses the Unicode Private Use Area (PUA) to ensure screen\r\n   readers do not read off random characters that represent icons */\r\n   \r\n/*   Weather Condition Codes    */\r\n   \r\n/*   Thunderstorm - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n   \r\n/* thunderstorm with light rain */\r\n.owf-200:before,\r\n.owf-200-d:before,\r\n.owf-200-n:before {\r\n  content: \"\\EB28\";\r\n}\r\n/* thunderstorm with rain */\r\n.owf-201:before,\r\n.owf-201-d:before,\r\n.owf-201-n:before {\r\n  content: \"\\EB29\";\r\n}\r\n/* thunderstorm with heavy rain */\r\n.owf-202:before,\r\n.owf-202-d:before,\r\n.owf-202-n:before {\r\n  content: \"\\EB2A\";\r\n}\r\n/*  light thunderstorm  */\r\n.owf-210:before,\r\n.owf-210-d:before,\r\n.owf-210-n:before {\r\n  content: \"\\EB32\";\r\n}\r\n/*  thunderstorm  */\r\n.owf-211:before,\r\n.owf-211-d:before,\r\n.owf-211-n:before {\r\n  content: \"\\EB33\";\r\n}\r\n/*   heavy thunderstorm   */\r\n.owf-212:before,\r\n.owf-212-d:before,\r\n.owf-212-n:before {\r\n  content: \"\\EB34\";\r\n}\r\n/*   ragged thunderstorm   */\r\n.owf-221:before,\r\n.owf-221-d:before,\r\n.owf-221-n:before {\r\n  content: \"\\EB3D\";\r\n}\r\n/*  thunderstorm with light drizzle    */\r\n.owf-230:before,\r\n.owf-230-d:before,\r\n.owf-230-n:before {\r\n  content: \"\\EB46\";\r\n}\r\n/*  thunderstorm with drizzle     */\r\n.owf-231:before,\r\n.owf-231-d:before,\r\n.owf-231-n:before {\r\n  content: \"\\EB47\";\r\n}\r\n/* thunderstorm with heavy drizzle     */\r\n.owf-232:before,\r\n.owf-232-d:before,\r\n.owf-232-n:before {\r\n  content: \"\\EB48\";\r\n}\r\n\r\n/*   Drizzle - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/*  light intensity drizzle */\r\n.owf-300:before,\r\n.owf-300-d:before,\r\n.owf-300-n:before {\r\n  content: \"\\EB8C\";\r\n}\r\n/*  drizzle */\r\n.owf-301:before,\r\n.owf-301-d:before,\r\n.owf-301-n:before {\r\n  content: \"\\EB8D\";\r\n}\r\n/*  heavy intensity drizzle  */\r\n.owf-302:before,\r\n.owf-302-d:before,\r\n.owf-302-n:before {\r\n  content: \"\\EB8E\";\r\n}\r\n/*   light intensity drizzle rain  */\r\n.owf-310:before,\r\n.owf-310-d:before,\r\n.owf-310-n:before {\r\n  content: \"\\EB96\";\r\n}\r\n/*  drizzle rain  */\r\n.owf-311:before,\r\n.owf-311-d:before,\r\n.owf-311-n:before {\r\n  content: \"\\EB97\";\r\n}\r\n/* heavy intensity drizzle rain */\r\n.owf-312:before,\r\n.owf-312-d:before,\r\n.owf-312-n:before {\r\n  content: \"\\EB98\";\r\n}\r\n/* shower rain and drizzle  */\r\n.owf-313:before,\r\n.owf-313-d:before,\r\n.owf-313-n:before {\r\n  content: \"\\EB99\";\r\n}\r\n/* heavy shower rain and drizzle*/\r\n.owf-314:before,\r\n.owf-314-d:before,\r\n.owf-314-n:before {\r\n  content: \"\\EB9A\";\r\n}\r\n/* shower drizzle */\r\n.owf-321:before,\r\n.owf-321-d:before,\r\n.owf-321-n:before {\r\n  content: \"\\EBA1\";\r\n}\r\n\r\n/*   Rain - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* light rain  */\r\n.owf-500:before,\r\n.owf-500-d:before,\r\n.owf-500-n:before {\r\n  content: \"\\EC54\";\r\n}\r\n/* moderate rain  */\r\n.owf-501:before,\r\n.owf-501-d:before,\r\n.owf-501-n:before {\r\n  content: \"\\EC55\";\r\n}\r\n/* heavy intensity rain  */\r\n.owf-502:before,\r\n.owf-502-d:before,\r\n.owf-502-n:before {\r\n  content: \"\\EC56\";\r\n}\r\n/* very heavy rain   */\r\n.owf-503:before,\r\n.owf-503-d:before,\r\n.owf-503-n:before {\r\n  content: \"\\EC57\";\r\n}\r\n/* extreme rain    */\r\n.owf-504:before,\r\n.owf-504-d:before,\r\n.owf-504-n:before {\r\n  content: \"\\EC58\";\r\n}\r\n/* freezing rain    */\r\n.owf-511:before,\r\n.owf-511-d:before,\r\n.owf-511-n:before {\r\n  content: \"\\EC5F\";\r\n}\r\n/*  light intensity shower rain    */\r\n.owf-520:before,\r\n.owf-520-d:before,\r\n.owf-520-n:before {\r\n  content: \"\\EC68\";\r\n}\r\n/* shower rain  */\r\n.owf-521:before,\r\n.owf-521-d:before,\r\n.owf-521-n:before {\r\n  content: \"\\EC69\";\r\n}\r\n/*  heavy intensity shower rain  */\r\n.owf-522:before,\r\n.owf-522-d:before,\r\n.owf-522-n:before {\r\n  content: \"\\EC6A\";\r\n}\r\n/* ragged shower rain  */\r\n.owf-531:before,\r\n.owf-531-d:before,\r\n.owf-531-n:before {\r\n  content: \"\\EC73\";\r\n}\r\n\r\n/*   Snow - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* light snow  */\r\n.owf-600:before,\r\n.owf-600-d:before,\r\n.owf-600-n:before {\r\n  content: \"\\ECB8\";\r\n}\r\n/*  snow  */\r\n.owf-601:before,\r\n.owf-601-d:before,\r\n.owf-601-n:before {\r\n  content: \"\\ECB9\";\r\n}\r\n/*   heavy snow   */\r\n.owf-602:before,\r\n.owf-602-d:before,\r\n.owf-602-n:before {\r\n  content: \"\\ECBA\";\r\n}\r\n/*  sleet  */\r\n.owf-611:before,\r\n.owf-611-d:before,\r\n.owf-611-n:before {\r\n  content: \"\\ECC3\";\r\n}\r\n/*   shower sleet */\r\n.owf-612:before,\r\n.owf-612-d:before,\r\n.owf-612-n:before {\r\n  content: \"\\ECC4\";\r\n}\r\n/* light rain and snow */\r\n.owf-615:before,\r\n.owf-615-d:before,\r\n.owf-615-n:before {\r\n  content: \"\\ECC7\";\r\n}\r\n/* rain and snow  */\r\n.owf-616:before,\r\n.owf-616-d:before,\r\n.owf-616-n:before {\r\n  content: \"\\ECC8\";\r\n}\r\n/* light shower snow  */\r\n.owf-620:before,\r\n.owf-620-d:before,\r\n.owf-620-n:before {\r\n  content: \"\\ECCC\";\r\n}\r\n/* shower snow  */\r\n.owf-621:before,\r\n.owf-621-d:before,\r\n.owf-621-n:before {\r\n  content: \"\\ECCD\";\r\n}\r\n/* heavy shower snow  */\r\n.owf-622:before,\r\n.owf-622-d:before,\r\n.owf-622-n:before {\r\n  content: \"\\ECCE\";\r\n}\r\n\r\n/*   Atmosphere - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* mist */\r\n.owf-701:before,\r\n.owf-701-d:before,\r\n.owf-701-n:before {\r\n  content: \"\\ED1D\";\r\n}\r\n/* smoke */\r\n.owf-711:before,\r\n.owf-711-d:before,\r\n.owf-711-n:before {\r\n  content: \"\\ED27\";\r\n}\r\n/* haze */\r\n.owf-721:before,\r\n.owf-721-d:before,\r\n.owf-721-n:before {\r\n  content: \"\\ED31\";\r\n}\r\n/* Sand/Dust Whirls */\r\n.owf-731:before,\r\n.owf-731-d:before,\r\n.owf-731-n:before {\r\n  content: \"\\ED3B\";\r\n}\r\n/* Fog */\r\n.owf-741:before,\r\n.owf-741-d:before,\r\n.owf-741-n:before {\r\n  content: \"\\ED45\";\r\n}\r\n/* sand */\r\n.owf-751:before,\r\n.owf-751-d:before,\r\n.owf-751-n:before {\r\n  content: \"\\ED4F\";\r\n}\r\n/* dust */\r\n.owf-761:before,\r\n.owf-761-d:before,\r\n.owf-761-n:before {\r\n  content: \"\\ED59\";\r\n}\r\n/*  VOLCANIC ASH  */\r\n.owf-762:before,\r\n.owf-762-d:before,\r\n.owf-762-n:before {\r\n  content: \"\\ED5A\";\r\n}\r\n/* SQUALLS */\r\n.owf-771:before,\r\n.owf-771-d:before,\r\n.owf-771-n:before {\r\n  content: \"\\ED63\";\r\n}\r\n/* TORNADO */\r\n.owf-781:before,\r\n.owf-781-d:before,\r\n.owf-781-n:before {\r\n  content: \"\\ED6D\";\r\n}\r\n\r\n/*   Clouds - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/*  sky is clear  */  /*  Calm  */\r\n.owf-800:before,\r\n.owf-800-d:before,\r\n.owf-951:before,\r\n.owf-951-d:before {\r\n  content: \"\\ED80\";\r\n}\r\n.owf-800-n:before,\r\n.owf-951-n:before {\r\n  content: \"\\F168\";\r\n}\r\n/*  few clouds   */\r\n.owf-801:before,\r\n.owf-801-d:before {\r\n  content: \"\\ED81\";\r\n}\r\n.owf-801-n:before {\r\n  content: \"\\F169\";\r\n}\r\n/* scattered clouds */\r\n.owf-802:before,\r\n.owf-802-d:before {\r\n  content: \"\\ED82\";\r\n}\r\n.owf-802-n:before {\r\n  content: \"\\F16A\";\r\n}\r\n/* broken clouds  */\r\n.owf-803:before,\r\n.owf-803-d:before,\r\n.owf-803-n:before {\r\n  content: \"\\ED83\";\r\n}\r\n/* overcast clouds  */\r\n.owf-804:before,\r\n.owf-804-d:before,\r\n.owf-804-n:before {\r\n  content: \"\\ED84\";\r\n}\r\n\r\n/*   Extreme - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* tornado  */\r\n.owf-900:before,\r\n.owf-900-d:before,\r\n.owf-900-n:before {\r\n  content: \"\\EDE4\";\r\n}\r\n/*  tropical storm  */\r\n.owf-901:before,\r\n.owf-901-d:before,\r\n.owf-901-n:before {\r\n  content: \"\\EDE5\";\r\n}\r\n/* hurricane */\r\n.owf-902:before,\r\n.owf-902-d:before,\r\n.owf-902-n:before {\r\n  content: \"\\EDE6\";\r\n}\r\n/* cold */\r\n.owf-903:before,\r\n.owf-903-d:before,\r\n.owf-903-n:before {\r\n  content: \"\\EDE7\";\r\n}\r\n/* hot */\r\n.owf-904:before,\r\n.owf-904-d:before,\r\n.owf-904-n:before {\r\n  content: \"\\EDE8\";\r\n}\r\n/* windy */\r\n.owf-905:before,\r\n.owf-905-d:before,\r\n.owf-905-n:before {\r\n  content: \"\\EDE9\";\r\n}\r\n/* hail */\r\n.owf-906:before,\r\n.owf-906-d:before,\r\n.owf-906-n:before {\r\n  content: \"\\EDEA\";\r\n}\r\n\r\n/*   Additional - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* Setting */\r\n.owf-950:before,\r\n.owf-950-d:before,\r\n.owf-950-n:before {\r\n  content: \"\\EE16\";\r\n}\r\n/*  Light breeze  */\r\n.owf-952:before,\r\n.owf-952-d:before,\r\n.owf-952-n:before {\r\n  content: \"\\EE18\";\r\n}\r\n/*  Gentle Breeze  */\r\n.owf-953:before,\r\n.owf-953-d:before,\r\n.owf-953-n:before {\r\n  content: \"\\EE19\";\r\n}\r\n/*  Moderate breeze  */\r\n.owf-954:before,\r\n.owf-954-d:before,\r\n.owf-954-n:before {\r\n  content: \"\\EE1A\";\r\n}\r\n/* Fresh Breeze  */\r\n.owf-955:before,\r\n.owf-955-d:before,\r\n.owf-955-n:before {\r\n  content: \"\\EE1B\";\r\n}\r\n/* Strong  Breeze  */\r\n.owf-956:before,\r\n.owf-956-d:before,\r\n.owf-956-n:before {\r\n  content: \"\\EE1C\";\r\n}\r\n/* High wind, near gale  */\r\n.owf-957:before,\r\n.owf-957-d:before,\r\n.owf-957-n:before {\r\n  content: \"\\EE1D\";\r\n}\r\n/* Gale */\r\n.owf-958:before,\r\n.owf-958-d:before,\r\n.owf-958-n:before {\r\n  content: \"\\EE1E\";\r\n}\r\n/*  Severe Gale  */\r\n.owf-959:before,\r\n.owf-959-d:before,\r\n.owf-959-n:before {\r\n  content: \"\\EE1F\";\r\n}\r\n/* Storm */\r\n.owf-960:before,\r\n.owf-960-d:before,\r\n.owf-960-n:before {\r\n  content: \"\\EE20\";\r\n}\r\n/*  Violent Storm  */\r\n.owf-961:before,\r\n.owf-961-d:before,\r\n.owf-961-n:before {\r\n  content: \"\\EE21\";\r\n}\r\n/* Hurricane */\r\n.owf-962:before,\r\n.owf-962-d:before,\r\n.owf-962-n:before {\r\n  content: \"\\EE22\";\r\n}", "",{"version":3,"sources":["webpack://./css/owfont-regular.css"],"names":[],"mappings":"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","sourcesContent":["/*!\r\n *  owfont-regular 1.0.0 by Deniz Fuchidzhiev - http://websygen.com\r\n *  License - font: SIL OFL 1.1, css: MIT License\r\n */\r\n/* FONT PATH\r\n * -------------------------- */\r\n@font-face {\r\n  font-family: 'owfont';\r\n  src: url('../assets/fonts/owfont-regular.eot?v=1.0.0');\r\n  src: url('../assets/fonts/owfont-regular.eot?#iefix&v=1.0.0') format('embedded-opentype'),\r\n\t   url('../assets/fonts/owfont-regular.woff') format('woff'),\r\n\t   url('../assets/fonts/owfont-regular.ttf') format('truetype'),\r\n\t   url('../assets/fonts/owfont-regular.svg#owf-regular') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n.owf {\r\n  display: inline-block;\r\n  font: normal normal normal 14px/1 owfont;\r\n  font-size: inherit;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  transform: translate(0, 0);\r\n}\r\n/* makes the font 33% larger relative to the icon container */\r\n.owf-lg {\r\n  font-size: 1.33333333em;\r\n  line-height: 0.75em;\r\n  vertical-align: -15%;\r\n}\r\n.owf-2x {\r\n  font-size: 2em;\r\n}\r\n.owf-3x {\r\n  font-size: 3em;\r\n}\r\n.owf-4x {\r\n  font-size: 4em;\r\n}\r\n.owf-5x {\r\n  font-size: 5em;\r\n}\r\n.owf-fw {\r\n  width: 1.28571429em;\r\n  text-align: center;\r\n}\r\n.owf-ul {\r\n  padding-left: 0;\r\n  margin-left: 2.14285714em;\r\n  list-style-type: none;\r\n}\r\n.owf-ul > li {\r\n  position: relative;\r\n}\r\n.owf-li {\r\n  position: absolute;\r\n  left: -2.14285714em;\r\n  width: 2.14285714em;\r\n  top: 0.14285714em;\r\n  text-align: center;\r\n}\r\n.owf-li.owf-lg {\r\n  left: -1.85714286em;\r\n}\r\n.owf-border {\r\n  padding: .2em .25em .15em;\r\n  border: solid 0.08em #eeeeee;\r\n  border-radius: .1em;\r\n}\r\n.owf-pull-right {\r\n  float: right;\r\n}\r\n.owf-pull-left {\r\n  float: left;\r\n}\r\n.owf.owf-pull-left {\r\n  margin-right: .3em;\r\n}\r\n.owf.owf-pull-right {\r\n  margin-left: .3em;\r\n}\r\n\r\n/* owfont uses the Unicode Private Use Area (PUA) to ensure screen\r\n   readers do not read off random characters that represent icons */\r\n   \r\n/*   Weather Condition Codes    */\r\n   \r\n/*   Thunderstorm - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n   \r\n/* thunderstorm with light rain */\r\n.owf-200:before,\r\n.owf-200-d:before,\r\n.owf-200-n:before {\r\n  content: \"\\EB28\";\r\n}\r\n/* thunderstorm with rain */\r\n.owf-201:before,\r\n.owf-201-d:before,\r\n.owf-201-n:before {\r\n  content: \"\\EB29\";\r\n}\r\n/* thunderstorm with heavy rain */\r\n.owf-202:before,\r\n.owf-202-d:before,\r\n.owf-202-n:before {\r\n  content: \"\\EB2A\";\r\n}\r\n/*  light thunderstorm  */\r\n.owf-210:before,\r\n.owf-210-d:before,\r\n.owf-210-n:before {\r\n  content: \"\\EB32\";\r\n}\r\n/*  thunderstorm  */\r\n.owf-211:before,\r\n.owf-211-d:before,\r\n.owf-211-n:before {\r\n  content: \"\\EB33\";\r\n}\r\n/*   heavy thunderstorm   */\r\n.owf-212:before,\r\n.owf-212-d:before,\r\n.owf-212-n:before {\r\n  content: \"\\EB34\";\r\n}\r\n/*   ragged thunderstorm   */\r\n.owf-221:before,\r\n.owf-221-d:before,\r\n.owf-221-n:before {\r\n  content: \"\\EB3D\";\r\n}\r\n/*  thunderstorm with light drizzle    */\r\n.owf-230:before,\r\n.owf-230-d:before,\r\n.owf-230-n:before {\r\n  content: \"\\EB46\";\r\n}\r\n/*  thunderstorm with drizzle     */\r\n.owf-231:before,\r\n.owf-231-d:before,\r\n.owf-231-n:before {\r\n  content: \"\\EB47\";\r\n}\r\n/* thunderstorm with heavy drizzle     */\r\n.owf-232:before,\r\n.owf-232-d:before,\r\n.owf-232-n:before {\r\n  content: \"\\EB48\";\r\n}\r\n\r\n/*   Drizzle - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/*  light intensity drizzle */\r\n.owf-300:before,\r\n.owf-300-d:before,\r\n.owf-300-n:before {\r\n  content: \"\\EB8C\";\r\n}\r\n/*  drizzle */\r\n.owf-301:before,\r\n.owf-301-d:before,\r\n.owf-301-n:before {\r\n  content: \"\\EB8D\";\r\n}\r\n/*  heavy intensity drizzle  */\r\n.owf-302:before,\r\n.owf-302-d:before,\r\n.owf-302-n:before {\r\n  content: \"\\EB8E\";\r\n}\r\n/*   light intensity drizzle rain  */\r\n.owf-310:before,\r\n.owf-310-d:before,\r\n.owf-310-n:before {\r\n  content: \"\\EB96\";\r\n}\r\n/*  drizzle rain  */\r\n.owf-311:before,\r\n.owf-311-d:before,\r\n.owf-311-n:before {\r\n  content: \"\\EB97\";\r\n}\r\n/* heavy intensity drizzle rain */\r\n.owf-312:before,\r\n.owf-312-d:before,\r\n.owf-312-n:before {\r\n  content: \"\\EB98\";\r\n}\r\n/* shower rain and drizzle  */\r\n.owf-313:before,\r\n.owf-313-d:before,\r\n.owf-313-n:before {\r\n  content: \"\\EB99\";\r\n}\r\n/* heavy shower rain and drizzle*/\r\n.owf-314:before,\r\n.owf-314-d:before,\r\n.owf-314-n:before {\r\n  content: \"\\EB9A\";\r\n}\r\n/* shower drizzle */\r\n.owf-321:before,\r\n.owf-321-d:before,\r\n.owf-321-n:before {\r\n  content: \"\\EBA1\";\r\n}\r\n\r\n/*   Rain - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* light rain  */\r\n.owf-500:before,\r\n.owf-500-d:before,\r\n.owf-500-n:before {\r\n  content: \"\\EC54\";\r\n}\r\n/* moderate rain  */\r\n.owf-501:before,\r\n.owf-501-d:before,\r\n.owf-501-n:before {\r\n  content: \"\\EC55\";\r\n}\r\n/* heavy intensity rain  */\r\n.owf-502:before,\r\n.owf-502-d:before,\r\n.owf-502-n:before {\r\n  content: \"\\EC56\";\r\n}\r\n/* very heavy rain   */\r\n.owf-503:before,\r\n.owf-503-d:before,\r\n.owf-503-n:before {\r\n  content: \"\\EC57\";\r\n}\r\n/* extreme rain    */\r\n.owf-504:before,\r\n.owf-504-d:before,\r\n.owf-504-n:before {\r\n  content: \"\\EC58\";\r\n}\r\n/* freezing rain    */\r\n.owf-511:before,\r\n.owf-511-d:before,\r\n.owf-511-n:before {\r\n  content: \"\\EC5F\";\r\n}\r\n/*  light intensity shower rain    */\r\n.owf-520:before,\r\n.owf-520-d:before,\r\n.owf-520-n:before {\r\n  content: \"\\EC68\";\r\n}\r\n/* shower rain  */\r\n.owf-521:before,\r\n.owf-521-d:before,\r\n.owf-521-n:before {\r\n  content: \"\\EC69\";\r\n}\r\n/*  heavy intensity shower rain  */\r\n.owf-522:before,\r\n.owf-522-d:before,\r\n.owf-522-n:before {\r\n  content: \"\\EC6A\";\r\n}\r\n/* ragged shower rain  */\r\n.owf-531:before,\r\n.owf-531-d:before,\r\n.owf-531-n:before {\r\n  content: \"\\EC73\";\r\n}\r\n\r\n/*   Snow - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* light snow  */\r\n.owf-600:before,\r\n.owf-600-d:before,\r\n.owf-600-n:before {\r\n  content: \"\\ECB8\";\r\n}\r\n/*  snow  */\r\n.owf-601:before,\r\n.owf-601-d:before,\r\n.owf-601-n:before {\r\n  content: \"\\ECB9\";\r\n}\r\n/*   heavy snow   */\r\n.owf-602:before,\r\n.owf-602-d:before,\r\n.owf-602-n:before {\r\n  content: \"\\ECBA\";\r\n}\r\n/*  sleet  */\r\n.owf-611:before,\r\n.owf-611-d:before,\r\n.owf-611-n:before {\r\n  content: \"\\ECC3\";\r\n}\r\n/*   shower sleet */\r\n.owf-612:before,\r\n.owf-612-d:before,\r\n.owf-612-n:before {\r\n  content: \"\\ECC4\";\r\n}\r\n/* light rain and snow */\r\n.owf-615:before,\r\n.owf-615-d:before,\r\n.owf-615-n:before {\r\n  content: \"\\ECC7\";\r\n}\r\n/* rain and snow  */\r\n.owf-616:before,\r\n.owf-616-d:before,\r\n.owf-616-n:before {\r\n  content: \"\\ECC8\";\r\n}\r\n/* light shower snow  */\r\n.owf-620:before,\r\n.owf-620-d:before,\r\n.owf-620-n:before {\r\n  content: \"\\ECCC\";\r\n}\r\n/* shower snow  */\r\n.owf-621:before,\r\n.owf-621-d:before,\r\n.owf-621-n:before {\r\n  content: \"\\ECCD\";\r\n}\r\n/* heavy shower snow  */\r\n.owf-622:before,\r\n.owf-622-d:before,\r\n.owf-622-n:before {\r\n  content: \"\\ECCE\";\r\n}\r\n\r\n/*   Atmosphere - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* mist */\r\n.owf-701:before,\r\n.owf-701-d:before,\r\n.owf-701-n:before {\r\n  content: \"\\ED1D\";\r\n}\r\n/* smoke */\r\n.owf-711:before,\r\n.owf-711-d:before,\r\n.owf-711-n:before {\r\n  content: \"\\ED27\";\r\n}\r\n/* haze */\r\n.owf-721:before,\r\n.owf-721-d:before,\r\n.owf-721-n:before {\r\n  content: \"\\ED31\";\r\n}\r\n/* Sand/Dust Whirls */\r\n.owf-731:before,\r\n.owf-731-d:before,\r\n.owf-731-n:before {\r\n  content: \"\\ED3B\";\r\n}\r\n/* Fog */\r\n.owf-741:before,\r\n.owf-741-d:before,\r\n.owf-741-n:before {\r\n  content: \"\\ED45\";\r\n}\r\n/* sand */\r\n.owf-751:before,\r\n.owf-751-d:before,\r\n.owf-751-n:before {\r\n  content: \"\\ED4F\";\r\n}\r\n/* dust */\r\n.owf-761:before,\r\n.owf-761-d:before,\r\n.owf-761-n:before {\r\n  content: \"\\ED59\";\r\n}\r\n/*  VOLCANIC ASH  */\r\n.owf-762:before,\r\n.owf-762-d:before,\r\n.owf-762-n:before {\r\n  content: \"\\ED5A\";\r\n}\r\n/* SQUALLS */\r\n.owf-771:before,\r\n.owf-771-d:before,\r\n.owf-771-n:before {\r\n  content: \"\\ED63\";\r\n}\r\n/* TORNADO */\r\n.owf-781:before,\r\n.owf-781-d:before,\r\n.owf-781-n:before {\r\n  content: \"\\ED6D\";\r\n}\r\n\r\n/*   Clouds - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/*  sky is clear  */  /*  Calm  */\r\n.owf-800:before,\r\n.owf-800-d:before,\r\n.owf-951:before,\r\n.owf-951-d:before {\r\n  content: \"\\ED80\";\r\n}\r\n.owf-800-n:before,\r\n.owf-951-n:before {\r\n  content: \"\\F168\";\r\n}\r\n/*  few clouds   */\r\n.owf-801:before,\r\n.owf-801-d:before {\r\n  content: \"\\ED81\";\r\n}\r\n.owf-801-n:before {\r\n  content: \"\\F169\";\r\n}\r\n/* scattered clouds */\r\n.owf-802:before,\r\n.owf-802-d:before {\r\n  content: \"\\ED82\";\r\n}\r\n.owf-802-n:before {\r\n  content: \"\\F16A\";\r\n}\r\n/* broken clouds  */\r\n.owf-803:before,\r\n.owf-803-d:before,\r\n.owf-803-n:before {\r\n  content: \"\\ED83\";\r\n}\r\n/* overcast clouds  */\r\n.owf-804:before,\r\n.owf-804-d:before,\r\n.owf-804-n:before {\r\n  content: \"\\ED84\";\r\n}\r\n\r\n/*   Extreme - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* tornado  */\r\n.owf-900:before,\r\n.owf-900-d:before,\r\n.owf-900-n:before {\r\n  content: \"\\EDE4\";\r\n}\r\n/*  tropical storm  */\r\n.owf-901:before,\r\n.owf-901-d:before,\r\n.owf-901-n:before {\r\n  content: \"\\EDE5\";\r\n}\r\n/* hurricane */\r\n.owf-902:before,\r\n.owf-902-d:before,\r\n.owf-902-n:before {\r\n  content: \"\\EDE6\";\r\n}\r\n/* cold */\r\n.owf-903:before,\r\n.owf-903-d:before,\r\n.owf-903-n:before {\r\n  content: \"\\EDE7\";\r\n}\r\n/* hot */\r\n.owf-904:before,\r\n.owf-904-d:before,\r\n.owf-904-n:before {\r\n  content: \"\\EDE8\";\r\n}\r\n/* windy */\r\n.owf-905:before,\r\n.owf-905-d:before,\r\n.owf-905-n:before {\r\n  content: \"\\EDE9\";\r\n}\r\n/* hail */\r\n.owf-906:before,\r\n.owf-906-d:before,\r\n.owf-906-n:before {\r\n  content: \"\\EDEA\";\r\n}\r\n\r\n/*   Additional - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */\r\n\r\n/* Setting */\r\n.owf-950:before,\r\n.owf-950-d:before,\r\n.owf-950-n:before {\r\n  content: \"\\EE16\";\r\n}\r\n/*  Light breeze  */\r\n.owf-952:before,\r\n.owf-952-d:before,\r\n.owf-952-n:before {\r\n  content: \"\\EE18\";\r\n}\r\n/*  Gentle Breeze  */\r\n.owf-953:before,\r\n.owf-953-d:before,\r\n.owf-953-n:before {\r\n  content: \"\\EE19\";\r\n}\r\n/*  Moderate breeze  */\r\n.owf-954:before,\r\n.owf-954-d:before,\r\n.owf-954-n:before {\r\n  content: \"\\EE1A\";\r\n}\r\n/* Fresh Breeze  */\r\n.owf-955:before,\r\n.owf-955-d:before,\r\n.owf-955-n:before {\r\n  content: \"\\EE1B\";\r\n}\r\n/* Strong  Breeze  */\r\n.owf-956:before,\r\n.owf-956-d:before,\r\n.owf-956-n:before {\r\n  content: \"\\EE1C\";\r\n}\r\n/* High wind, near gale  */\r\n.owf-957:before,\r\n.owf-957-d:before,\r\n.owf-957-n:before {\r\n  content: \"\\EE1D\";\r\n}\r\n/* Gale */\r\n.owf-958:before,\r\n.owf-958-d:before,\r\n.owf-958-n:before {\r\n  content: \"\\EE1E\";\r\n}\r\n/*  Severe Gale  */\r\n.owf-959:before,\r\n.owf-959-d:before,\r\n.owf-959-n:before {\r\n  content: \"\\EE1F\";\r\n}\r\n/* Storm */\r\n.owf-960:before,\r\n.owf-960-d:before,\r\n.owf-960-n:before {\r\n  content: \"\\EE20\";\r\n}\r\n/*  Violent Storm  */\r\n.owf-961:before,\r\n.owf-961-d:before,\r\n.owf-961-n:before {\r\n  content: \"\\EE21\";\r\n}\r\n/* Hurricane */\r\n.owf-962:before,\r\n.owf-962-d:before,\r\n.owf-962-n:before {\r\n  content: \"\\EE22\";\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/Arial-MT.woff */ "./assets/fonts/Arial-MT.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/audio_volume.svg */ "./assets/svg/audio_volume.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/audio_volume_mute.svg */ "./assets/svg/audio_volume_mute.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/play.svg */ "./assets/svg/play.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/pause.svg */ "./assets/svg/pause.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/play-prev.svg */ "./assets/svg/play-prev.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/play-next.svg */ "./assets/svg/play-next.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/slider-prev.svg */ "./assets/svg/slider-prev.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/slider-next.svg */ "./assets/svg/slider-next.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/reload.svg */ "./assets/svg/reload.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\r\n  font-family: 'Arial-MT';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  /* min-width: 480px; */\r\n  min-height: 100vh;\r\n  font-family: 'Arial', sans-serif;\r\n  font-size: 16px;\r\n  color: #fff;\r\n  text-align: center;\r\n  background-position: center;\r\n  background-size: cover;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  background-blend-mode: multiply;\r\n  transition: background-image 1s ease-in-out;\r\n  @media screen and (min-width: 520px) {\r\n    min-width: 520px;\r\n  }\r\n}\r\n\r\n.header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  width: 100%;\r\n  /* height: 30vh; */\r\n  /* min-height: 220px; */\r\n  padding: 20px;\r\n}\r\n\r\n.wrap-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.progress-time-wrapper {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.progress {\r\n  width: 100%;\r\n}\r\n\r\n.audio-duration {\r\n  display: flex;\r\n}\r\n\r\n.audio-duration > * {\r\n  padding: 2px;\r\n}\r\n\r\n.volume_icon {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\r\n}\r\n\r\n.mute {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\r\n}\r\n\r\n.player-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 15px;\r\n  /* margin-bottom: 20px; */\r\n}\r\n\r\n.play-list {\r\n  text-align: left;\r\n}\r\n\r\n.play-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 5px;\r\n  padding: 5px;\r\n  padding-left: 20px;\r\n  list-style: none;\r\n  opacity: 0.8;\r\n  cursor: pointer;\r\n  transition: 0.3s;\r\n}\r\n\r\n.play-item:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.play.play-track {\r\n  width: 20px;\r\n  height: 20px;\r\n  background-size: 20px 20px;\r\n}\r\n\r\n.play-track.pause {\r\n  width: 20px;\r\n  height: 20px;\r\n  background-size: 20px 20px;\r\n}\r\n\r\n.item-active {\r\n  font-weight: 700;\r\n}\r\n\r\n.item-active::before {\r\n  color: #1e90ff;\r\n}\r\n\r\n.player {\r\n  display: flex;\r\n  gap: 20px;\r\n}\r\n\r\n.player-nav {\r\n  width: 250px;\r\n}\r\n\r\n.player-icon,\r\n.slider-icon,\r\n.change-quote,\r\n.volume_icon {\r\n  width: 32px;\r\n  height: 32px;\r\n  background-size: 32px 32px;\r\n  background-position: center center;\r\n  background-repeat: no-repeat;\r\n  background-color: transparent;\r\n  border: 0;\r\n  outline: 0;\r\n  opacity: 0.8;\r\n  cursor: pointer;\r\n  transition: 0.3s;\r\n}\r\n\r\n.volume_icon-size {\r\n  width: 24px;\r\n  height: 24px;\r\n  background-size: 24px 24px;\r\n}\r\n\r\n.player-icon:hover,\r\n.slider-icon:hover,\r\n.change-quote:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.player-icon:active,\r\n.slider-icon:active,\r\n.change-quote:active {\r\n  border: 0;\r\n  outline: 0;\r\n  transform: scale(1.1);\r\n}\r\n\r\n.play {\r\n  width: 40px;\r\n  height: 40px;\r\n  background-size: 40px 40px;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\r\n}\r\n\r\n.pause {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\r\n}\r\n\r\n.play-prev {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n}\r\n\r\n.play-next {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\r\n}\r\n\r\n.weather-wrapper {\r\n  display: block;\r\n}\r\n\r\n.weather {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  /* row-gap: 5px; */\r\n  /* width: 180px; */\r\n  /* min-height: 180px; */\r\n  text-align: left;\r\n  list-style: none;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n.weather-error {\r\n  margin-top: -10px;\r\n}\r\n\r\n.description-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  column-gap: 12px;\r\n}\r\n\r\n.weather-icon {\r\n  font-size: 44px;\r\n}\r\n\r\n.city {\r\n  width: 170px;\r\n  height: 34px;\r\n  padding: 5px;\r\n  font-size: 20px;\r\n  line-height: 24px;\r\n  color: #fff;\r\n  border: 0;\r\n  outline: 0;\r\n  border-bottom: 1px solid #fff;\r\n  background-color: transparent;\r\n}\r\n\r\n.city::placeholder {\r\n  font-size: 20px;\r\n  color: #fff;\r\n  opacity: 0.6;\r\n}\r\n\r\n.main {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 100%;\r\n  /* height: 40vh;\r\n  min-height: 260px; */\r\n  padding: 20px;\r\n}\r\n\r\n.slider-icon {\r\n  position: absolute;\r\n  top: 50%;\r\n  margin-top: -16px;\r\n  cursor: pointer;\r\n}\r\n\r\n.slide-prev {\r\n  left: 20px;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\r\n}\r\n\r\n.slide-next {\r\n  right: 20px;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\r\n}\r\n\r\n.time {\r\n  min-height: 124px;\r\n  margin-bottom: 10px;\r\n  font-family: 'Arial-MT';\r\n  font-size: 100px;\r\n  letter-spacing: -4px;\r\n}\r\n\r\n.date {\r\n  min-height: 28px;\r\n  font-size: 24px;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.greeting-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: stretch;\r\n  align-items: center;\r\n  min-height: 48px;\r\n  width: 100vw;\r\n  font-size: 40px;\r\n}\r\n\r\n.greeting {\r\n  flex: 1;\r\n  padding: 10px;\r\n  text-align: right;\r\n}\r\n\r\n.name {\r\n  flex: 1;\r\n  max-width: 50%;\r\n  padding: 10px;\r\n  font-size: 40px;\r\n  text-align: left;\r\n  color: #fff;\r\n  background-color: transparent;\r\n  border: 0;\r\n  outline: 0;\r\n}\r\n\r\n.name::placeholder {\r\n  color: #fff;\r\n  opacity: 0.6;\r\n}\r\n\r\n.container {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  /* align-items: center; */\r\n  /* flex-direction: column; */\r\n}\r\n\r\n.radio_container {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  gap: 10px;\r\n  align-items: center;\r\n  background-color: #cecece;\r\n  width: fit-content;\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  height: 40px;\r\n  border-radius: 9999px;\r\n  box-shadow: inset 0.5px 0.5px 2px 0 rgba(0, 0, 0, 0.15);\r\n}\r\n\r\ninput.city {\r\n  display: block;\r\n}\r\n\r\ninput[type='radio'] {\r\n  appearance: none;\r\n  display: none;\r\n  cursor: pointer;\r\n}\r\n\r\nlabel {\r\n  font-family: 'Open Sans', sans-serif;\r\n  font-size: 16px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: inherit;\r\n  width: 80px;\r\n  height: 30px;\r\n  text-align: center;\r\n  border-radius: 9999px;\r\n  overflow: hidden;\r\n  transition: linear 0.3s;\r\n  color: #6e6e6edd;\r\n  cursor: pointer;\r\n}\r\n\r\ninput[type='radio']:checked + label {\r\n  background-color: #1e90ff;\r\n  color: #f1f3f5;\r\n  font-weight: 700;\r\n  transition: 0.3s;\r\n}\r\n\r\n.footer,\r\n.quotes-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n  width: 100%;\r\n  /* height: 30vh; */\r\n  /* min-height: 160px; */\r\n  padding-bottom: 20px;\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.footer-contacts {\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  list-style-type: none;\r\n}\r\n\r\n.logo {\r\n  width: 70px;\r\n  height: 35px;\r\n}\r\n.gh-logo {\r\n  width: 30px;\r\n}\r\n\r\n.github-link {\r\n  text-decoration: none;\r\n  color: white;\r\n}\r\n.github-link:hover {\r\n  transform: scaleX(1.1);\r\n}\r\n\r\n.change-quote {\r\n  margin-bottom: 30px;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\r\n}\r\n\r\n.quote {\r\n  min-height: 32px;\r\n}\r\n\r\n.author {\r\n  min-height: 20px;\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .time {\r\n    min-height: 80px;\r\n    font-size: 72px;\r\n  }\r\n\r\n  .greeting-container {\r\n    min-height: 40px;\r\n    font-size: 30px;\r\n  }\r\n\r\n  .greeting {\r\n    padding: 5px;\r\n  }\r\n\r\n  .name {\r\n    font-size: inherit;\r\n    padding: 5px;\r\n  }\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .time {\r\n    min-height: 10px;\r\n    font-size: 62px;\r\n  }\r\n\r\n  .date {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .greeting-container {\r\n    font-size: 28px;\r\n  }\r\n\r\n  .greeting {\r\n    padding: 5px;\r\n  }\r\n\r\n  .name {\r\n    font-size: 32px;\r\n    padding: 5px;\r\n  }\r\n  .player {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-between;\r\n  }\r\n  .play-item {\r\n    padding-bottom: 3px;\r\n    padding-top: 3px;\r\n  }\r\n  .header {\r\n    flex-direction: column;\r\n    gap: 15px;\r\n  }\r\n  .weather {\r\n    width: 100%;\r\n    gap: 20px;\r\n    flex-direction: row;\r\n    align-items: flex-end;\r\n  }\r\n  .weather-title-wrapper {\r\n    display: block;\r\n  }\r\n  .radio_container {\r\n    /* width: 50%; */\r\n    height: 38px;\r\n  }\r\n  label {\r\n    width: 52px;\r\n  }\r\n  .change-quote {\r\n    margin-bottom: 20px;\r\n  }\r\n  .city {\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 420px) {\r\n  .quotes-container {\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n  }\r\n  .player {\r\n    flex-direction: column;\r\n  }\r\n  .player-icon,\r\n  .change-quote,\r\n  .volume_icon {\r\n    width: 25px;\r\n    height: 25px;\r\n    background-size: 25px 25px;\r\n  }\r\n  .wrap-container {\r\n    margin-bottom: 5px;\r\n  }\r\n  .body {\r\n    font-size: 14px;\r\n  }\r\n  .name,\r\n  .greeting-container {\r\n    font-size: 20px;\r\n  }\r\n  .date {\r\n    font-size: 18px;\r\n    margin-bottom: 5px;\r\n  }\r\n  .time {\r\n    font-size: 52px;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./css/style.css"],"names":[],"mappings":"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f,gBAAgB;EAChB,WAAW;EACX,6BAA6B;EAC7B,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,8BAA8B;EAC9B,yBAAyB;EACzB,4BAA4B;AAC9B;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,SAAS;EACT,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;EACnB,YAAY;EACZ,qBAAqB;EACrB,uDAAuD;AACzD;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,oCAAoC;EACpC,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,yBAAyB;EACzB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,qBAAqB;EACrB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,yBAAyB;EACzB,mBAAmB;EACnB,WAAW;EACX,kBAAkB;EAClB,uBAAuB;EACvB,oBAAoB;EACpB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;AACA;EACE,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,YAAY;AACd;AACA;EACE,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,yDAAiD;AACnD;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE;IACE,gBAAgB;IAChB,eAAe;EACjB;;EAEA;IACE,gBAAgB;IAChB,eAAe;EACjB;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,kBAAkB;IAClB,YAAY;EACd;AACF;;AAEA;EACE;IACE,gBAAgB;IAChB,eAAe;EACjB;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,eAAe;IACf,YAAY;EACd;EACA;IACE,WAAW;IACX,aAAa;IACb,8BAA8B;EAChC;EACA;IACE,mBAAmB;IACnB,gBAAgB;EAClB;EACA;IACE,sBAAsB;IACtB,SAAS;EACX;EACA;IACE,WAAW;IACX,SAAS;IACT,mBAAmB;IACnB,qBAAqB;EACvB;EACA;IACE,cAAc;EAChB;EACA;IACE,gBAAgB;IAChB,YAAY;EACd;EACA;IACE,WAAW;EACb;EACA;IACE,mBAAmB;EACrB;EACA;IACE,WAAW;EACb;AACF;;AAEA;EACE;IACE,cAAc;IACd,iBAAiB;EACnB;EACA;IACE,sBAAsB;EACxB;EACA;;;IAGE,WAAW;IACX,YAAY;IACZ,0BAA0B;EAC5B;EACA;IACE,kBAAkB;EACpB;EACA;IACE,eAAe;EACjB;EACA;;IAEE,eAAe;EACjB;EACA;IACE,eAAe;IACf,kBAAkB;EACpB;EACA;IACE,eAAe;EACjB;AACF","sourcesContent":["@font-face {\r\n  font-family: 'Arial-MT';\r\n  src: url('../assets/fonts/Arial-MT.woff');\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  /* min-width: 480px; */\r\n  min-height: 100vh;\r\n  font-family: 'Arial', sans-serif;\r\n  font-size: 16px;\r\n  color: #fff;\r\n  text-align: center;\r\n  background-position: center;\r\n  background-size: cover;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  background-blend-mode: multiply;\r\n  transition: background-image 1s ease-in-out;\r\n  @media screen and (min-width: 520px) {\r\n    min-width: 520px;\r\n  }\r\n}\r\n\r\n.header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  width: 100%;\r\n  /* height: 30vh; */\r\n  /* min-height: 220px; */\r\n  padding: 20px;\r\n}\r\n\r\n.wrap-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.progress-time-wrapper {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.progress {\r\n  width: 100%;\r\n}\r\n\r\n.audio-duration {\r\n  display: flex;\r\n}\r\n\r\n.audio-duration > * {\r\n  padding: 2px;\r\n}\r\n\r\n.volume_icon {\r\n  background-image: url('../assets/svg/audio_volume.svg');\r\n}\r\n\r\n.mute {\r\n  background-image: url('../assets/svg/audio_volume_mute.svg');\r\n}\r\n\r\n.player-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 15px;\r\n  /* margin-bottom: 20px; */\r\n}\r\n\r\n.play-list {\r\n  text-align: left;\r\n}\r\n\r\n.play-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 5px;\r\n  padding: 5px;\r\n  padding-left: 20px;\r\n  list-style: none;\r\n  opacity: 0.8;\r\n  cursor: pointer;\r\n  transition: 0.3s;\r\n}\r\n\r\n.play-item:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.play.play-track {\r\n  width: 20px;\r\n  height: 20px;\r\n  background-size: 20px 20px;\r\n}\r\n\r\n.play-track.pause {\r\n  width: 20px;\r\n  height: 20px;\r\n  background-size: 20px 20px;\r\n}\r\n\r\n.item-active {\r\n  font-weight: 700;\r\n}\r\n\r\n.item-active::before {\r\n  color: #1e90ff;\r\n}\r\n\r\n.player {\r\n  display: flex;\r\n  gap: 20px;\r\n}\r\n\r\n.player-nav {\r\n  width: 250px;\r\n}\r\n\r\n.player-icon,\r\n.slider-icon,\r\n.change-quote,\r\n.volume_icon {\r\n  width: 32px;\r\n  height: 32px;\r\n  background-size: 32px 32px;\r\n  background-position: center center;\r\n  background-repeat: no-repeat;\r\n  background-color: transparent;\r\n  border: 0;\r\n  outline: 0;\r\n  opacity: 0.8;\r\n  cursor: pointer;\r\n  transition: 0.3s;\r\n}\r\n\r\n.volume_icon-size {\r\n  width: 24px;\r\n  height: 24px;\r\n  background-size: 24px 24px;\r\n}\r\n\r\n.player-icon:hover,\r\n.slider-icon:hover,\r\n.change-quote:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.player-icon:active,\r\n.slider-icon:active,\r\n.change-quote:active {\r\n  border: 0;\r\n  outline: 0;\r\n  transform: scale(1.1);\r\n}\r\n\r\n.play {\r\n  width: 40px;\r\n  height: 40px;\r\n  background-size: 40px 40px;\r\n  background-image: url('../assets/svg/play.svg');\r\n}\r\n\r\n.pause {\r\n  background-image: url('../assets/svg/pause.svg');\r\n}\r\n\r\n.play-prev {\r\n  background-image: url('../assets/svg/play-prev.svg');\r\n}\r\n\r\n.play-next {\r\n  background-image: url('../assets/svg/play-next.svg');\r\n}\r\n\r\n.weather-wrapper {\r\n  display: block;\r\n}\r\n\r\n.weather {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  /* row-gap: 5px; */\r\n  /* width: 180px; */\r\n  /* min-height: 180px; */\r\n  text-align: left;\r\n  list-style: none;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n.weather-error {\r\n  margin-top: -10px;\r\n}\r\n\r\n.description-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  column-gap: 12px;\r\n}\r\n\r\n.weather-icon {\r\n  font-size: 44px;\r\n}\r\n\r\n.city {\r\n  width: 170px;\r\n  height: 34px;\r\n  padding: 5px;\r\n  font-size: 20px;\r\n  line-height: 24px;\r\n  color: #fff;\r\n  border: 0;\r\n  outline: 0;\r\n  border-bottom: 1px solid #fff;\r\n  background-color: transparent;\r\n}\r\n\r\n.city::placeholder {\r\n  font-size: 20px;\r\n  color: #fff;\r\n  opacity: 0.6;\r\n}\r\n\r\n.main {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 100%;\r\n  /* height: 40vh;\r\n  min-height: 260px; */\r\n  padding: 20px;\r\n}\r\n\r\n.slider-icon {\r\n  position: absolute;\r\n  top: 50%;\r\n  margin-top: -16px;\r\n  cursor: pointer;\r\n}\r\n\r\n.slide-prev {\r\n  left: 20px;\r\n  background-image: url('../assets/svg/slider-prev.svg');\r\n}\r\n\r\n.slide-next {\r\n  right: 20px;\r\n  background-image: url('../assets/svg/slider-next.svg');\r\n}\r\n\r\n.time {\r\n  min-height: 124px;\r\n  margin-bottom: 10px;\r\n  font-family: 'Arial-MT';\r\n  font-size: 100px;\r\n  letter-spacing: -4px;\r\n}\r\n\r\n.date {\r\n  min-height: 28px;\r\n  font-size: 24px;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.greeting-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: stretch;\r\n  align-items: center;\r\n  min-height: 48px;\r\n  width: 100vw;\r\n  font-size: 40px;\r\n}\r\n\r\n.greeting {\r\n  flex: 1;\r\n  padding: 10px;\r\n  text-align: right;\r\n}\r\n\r\n.name {\r\n  flex: 1;\r\n  max-width: 50%;\r\n  padding: 10px;\r\n  font-size: 40px;\r\n  text-align: left;\r\n  color: #fff;\r\n  background-color: transparent;\r\n  border: 0;\r\n  outline: 0;\r\n}\r\n\r\n.name::placeholder {\r\n  color: #fff;\r\n  opacity: 0.6;\r\n}\r\n\r\n.container {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  /* align-items: center; */\r\n  /* flex-direction: column; */\r\n}\r\n\r\n.radio_container {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  gap: 10px;\r\n  align-items: center;\r\n  background-color: #cecece;\r\n  width: fit-content;\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  height: 40px;\r\n  border-radius: 9999px;\r\n  box-shadow: inset 0.5px 0.5px 2px 0 rgba(0, 0, 0, 0.15);\r\n}\r\n\r\ninput.city {\r\n  display: block;\r\n}\r\n\r\ninput[type='radio'] {\r\n  appearance: none;\r\n  display: none;\r\n  cursor: pointer;\r\n}\r\n\r\nlabel {\r\n  font-family: 'Open Sans', sans-serif;\r\n  font-size: 16px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: inherit;\r\n  width: 80px;\r\n  height: 30px;\r\n  text-align: center;\r\n  border-radius: 9999px;\r\n  overflow: hidden;\r\n  transition: linear 0.3s;\r\n  color: #6e6e6edd;\r\n  cursor: pointer;\r\n}\r\n\r\ninput[type='radio']:checked + label {\r\n  background-color: #1e90ff;\r\n  color: #f1f3f5;\r\n  font-weight: 700;\r\n  transition: 0.3s;\r\n}\r\n\r\n.footer,\r\n.quotes-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n  width: 100%;\r\n  /* height: 30vh; */\r\n  /* min-height: 160px; */\r\n  padding-bottom: 20px;\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.footer-contacts {\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  list-style-type: none;\r\n}\r\n\r\n.logo {\r\n  width: 70px;\r\n  height: 35px;\r\n}\r\n.gh-logo {\r\n  width: 30px;\r\n}\r\n\r\n.github-link {\r\n  text-decoration: none;\r\n  color: white;\r\n}\r\n.github-link:hover {\r\n  transform: scaleX(1.1);\r\n}\r\n\r\n.change-quote {\r\n  margin-bottom: 30px;\r\n  background-image: url('../assets/svg/reload.svg');\r\n}\r\n\r\n.quote {\r\n  min-height: 32px;\r\n}\r\n\r\n.author {\r\n  min-height: 20px;\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .time {\r\n    min-height: 80px;\r\n    font-size: 72px;\r\n  }\r\n\r\n  .greeting-container {\r\n    min-height: 40px;\r\n    font-size: 30px;\r\n  }\r\n\r\n  .greeting {\r\n    padding: 5px;\r\n  }\r\n\r\n  .name {\r\n    font-size: inherit;\r\n    padding: 5px;\r\n  }\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .time {\r\n    min-height: 10px;\r\n    font-size: 62px;\r\n  }\r\n\r\n  .date {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .greeting-container {\r\n    font-size: 28px;\r\n  }\r\n\r\n  .greeting {\r\n    padding: 5px;\r\n  }\r\n\r\n  .name {\r\n    font-size: 32px;\r\n    padding: 5px;\r\n  }\r\n  .player {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-between;\r\n  }\r\n  .play-item {\r\n    padding-bottom: 3px;\r\n    padding-top: 3px;\r\n  }\r\n  .header {\r\n    flex-direction: column;\r\n    gap: 15px;\r\n  }\r\n  .weather {\r\n    width: 100%;\r\n    gap: 20px;\r\n    flex-direction: row;\r\n    align-items: flex-end;\r\n  }\r\n  .weather-title-wrapper {\r\n    display: block;\r\n  }\r\n  .radio_container {\r\n    /* width: 50%; */\r\n    height: 38px;\r\n  }\r\n  label {\r\n    width: 52px;\r\n  }\r\n  .change-quote {\r\n    margin-bottom: 20px;\r\n  }\r\n  .city {\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 420px) {\r\n  .quotes-container {\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n  }\r\n  .player {\r\n    flex-direction: column;\r\n  }\r\n  .player-icon,\r\n  .change-quote,\r\n  .volume_icon {\r\n    width: 25px;\r\n    height: 25px;\r\n    background-size: 25px 25px;\r\n  }\r\n  .wrap-container {\r\n    margin-bottom: 5px;\r\n  }\r\n  .body {\r\n    font-size: 14px;\r\n  }\r\n  .name,\r\n  .greeting-container {\r\n    font-size: 20px;\r\n  }\r\n  .date {\r\n    font-size: 18px;\r\n    margin-bottom: 5px;\r\n  }\r\n  .time {\r\n    font-size: 52px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/favicon.ico */ "./assets/favicon.ico"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/svg/github_logo.svg */ "./assets/svg/github_logo.svg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta\r\n      name=\"viewport\"\r\n      content=\"width=device-width, initial-scale=1.0\" />\r\n    <link href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" rel=\"shortcut icon\" />\r\n\r\n    <title>momentum</title>\r\n  </head>\r\n  <body>\r\n    <header class=\"header\">\r\n      <div class=\"player\">\r\n        <div class=\"player-nav\">\r\n          <div class=\"progress-time-wrapper\">\r\n            <div class=\"track-name\"></div>\r\n            <div class=\"audio-duration\">\r\n              <div class=\"current\">0:00</div>\r\n              <div class=\"divider\">/</div>\r\n              <div class=\"length\"></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"progress_container\">\r\n            <input\r\n              class=\"progress\"\r\n              type=\"range\"\r\n              name=\"audio_progress\"\r\n              id=\"audioProgress\"\r\n              min=\"0\"\r\n              max=\"100\"\r\n              value=\"0\" />\r\n          </div>\r\n          <div class=\"wrap-container\">\r\n            <div class=\"player-controls\">\r\n              <button class=\"play-prev player-icon\"></button>\r\n              <button class=\"play player-icon\"></button>\r\n              <button class=\"play-next player-icon\"></button>\r\n            </div>\r\n\r\n            <div class=\"volume-container\">\r\n              <div class=\"volume_icon volume_icon-size\"></div>\r\n            </div>\r\n            <!-- <div class=\"volume-slider\">\r\n            <div class=\"volume-percentage\"></div>\r\n          </div> -->\r\n          </div>\r\n        </div>\r\n        <ul class=\"play-list\"></ul>\r\n      </div>\r\n\r\n      <div class=\"weather-wrapper\">\r\n        <input type=\"text\" class=\"city\" placeholder=\"[enter city]\" />\r\n        <div class=\"weather-error hidden\"></div>\r\n        <ul class=\"weather\">\r\n          <li>\r\n            <span class=\"last-updated-text\">Last updated:</span>\r\n            <span class=\"updated-info\"></span>\r\n          </li>\r\n\r\n          <li class=\"description-container\">\r\n            <i class=\"weather-icon owf\"></i>\r\n            <span class=\"temperature\"></span>\r\n            <span class=\"weather-description\"></span>\r\n          </li>\r\n          <li>\r\n            <span class=\"wind-text\">Wind:</span\r\n            ><span class=\"wind\"></span>\r\n          </li>\r\n          <li>\r\n            <span class=\"humidity-text\"> Humidity:</span>\r\n            <span class=\"humidity\"></span>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </header>\r\n    <main class=\"main\">\r\n      <div class=\"slider-icons\">\r\n        <button class=\"slide-prev slider-icon\"></button>\r\n        <button class=\"slide-next slider-icon\"></button>\r\n      </div>\r\n      <time class=\"time\"></time>\r\n      <date class=\"date\"></date>\r\n      <div class=\"greeting-container\">\r\n        <span class=\"greeting\"></span>\r\n        <input\r\n          type=\"text\"\r\n          class=\"name\"\r\n          placeholder=\"[Enter name]\"\r\n          max=\"15\" />\r\n      </div>\r\n    </main>\r\n    <div class=\"quotes-container\">\r\n      <button class=\"change-quote\"></button>\r\n      <div>\r\n        <div class=\"quote\"></div>\r\n        <div class=\"author\"></div>\r\n      </div>\r\n    </div>\r\n    <footer class=\"footer\">\r\n      <div class=\"container\">\r\n        <div class=\"radio_container\">\r\n          <input type=\"radio\" name=\"radio\" id=\"en\" checked />\r\n          <label for=\"en\">Eng</label>\r\n          <input type=\"radio\" name=\"radio\" id=\"ru\" />\r\n          <label for=\"ru\">Рус</label>\r\n        </div>\r\n        <div class=\"footer__contacts-container\">\r\n          <ul class=\"footer-contacts\">\r\n            <li>\r\n              <a\r\n                class=\"github-link\"\r\n                href=\"https://github.com/Veronikanos\">\r\n                <img\r\n                  class=\"logo gh-logo\"\r\n                  src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"\r\n                  alt=\"gh-logo\" />\r\n              </a>\r\n            </li>\r\n            <li>&copy; 2023</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </footer>\r\n  </body>\r\n</html>\r\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./css/owfont-regular.css":
/*!********************************!*\
  !*** ./css/owfont-regular.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_owfont_regular_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./owfont-regular.css */ "./node_modules/css-loader/dist/cjs.js!./css/owfont-regular.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_owfont_regular_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_owfont_regular_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_owfont_regular_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_owfont_regular_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./assets/favicon.ico":
/*!****************************!*\
  !*** ./assets/favicon.ico ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/8ddf56748f8527584389.ico";

/***/ }),

/***/ "./assets/fonts/Arial-MT.woff":
/*!************************************!*\
  !*** ./assets/fonts/Arial-MT.woff ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fonts/Arial-MT.woff";

/***/ }),

/***/ "./assets/fonts/owfont-regular.eot":
/*!*****************************************!*\
  !*** ./assets/fonts/owfont-regular.eot ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fonts/owfont-regular.eot";

/***/ }),

/***/ "./assets/fonts/owfont-regular.eot?v=1.0.0":
/*!*************************************************!*\
  !*** ./assets/fonts/owfont-regular.eot?v=1.0.0 ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fonts/owfont-regular.eot";

/***/ }),

/***/ "./assets/fonts/owfont-regular.svg":
/*!*****************************************!*\
  !*** ./assets/fonts/owfont-regular.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/096a225d79281b53be79.svg";

/***/ }),

/***/ "./assets/fonts/owfont-regular.ttf":
/*!*****************************************!*\
  !*** ./assets/fonts/owfont-regular.ttf ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fonts/owfont-regular.ttf";

/***/ }),

/***/ "./assets/fonts/owfont-regular.woff":
/*!******************************************!*\
  !*** ./assets/fonts/owfont-regular.woff ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fonts/owfont-regular.woff";

/***/ }),

/***/ "./assets/svg/audio_volume.svg":
/*!*************************************!*\
  !*** ./assets/svg/audio_volume.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/cf8b311cc7404062743e.svg";

/***/ }),

/***/ "./assets/svg/audio_volume_mute.svg":
/*!******************************************!*\
  !*** ./assets/svg/audio_volume_mute.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/675e5aee58c7d2fa1c9f.svg";

/***/ }),

/***/ "./assets/svg/github_logo.svg":
/*!************************************!*\
  !*** ./assets/svg/github_logo.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/62532c45aba4e0304565.svg";

/***/ }),

/***/ "./assets/svg/pause.svg":
/*!******************************!*\
  !*** ./assets/svg/pause.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/cd3a49c1b4a9552744d8.svg";

/***/ }),

/***/ "./assets/svg/play-next.svg":
/*!**********************************!*\
  !*** ./assets/svg/play-next.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/827ac099ee6909e6267e.svg";

/***/ }),

/***/ "./assets/svg/play-prev.svg":
/*!**********************************!*\
  !*** ./assets/svg/play-prev.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/eb72570c53e6f1db73a0.svg";

/***/ }),

/***/ "./assets/svg/play.svg":
/*!*****************************!*\
  !*** ./assets/svg/play.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/13a4572d442258d61953.svg";

/***/ }),

/***/ "./assets/svg/reload.svg":
/*!*******************************!*\
  !*** ./assets/svg/reload.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/769d136287ab5a7ede73.svg";

/***/ }),

/***/ "./assets/svg/slider-next.svg":
/*!************************************!*\
  !*** ./assets/svg/slider-next.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/a48839bebf91cf694589.svg";

/***/ }),

/***/ "./assets/svg/slider-prev.svg":
/*!************************************!*\
  !*** ./assets/svg/slider-prev.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/997f38354e38ffc0bb6a.svg";

/***/ }),

/***/ "./src/utils/quotesEN.json":
/*!*********************************!*\
  !*** ./src/utils/quotesEN.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"text":"The best dreams happen when you’re awake.","author":"Cherie Gilderbloom"},{"text":"You can never be overdressed or overeducated.","author":"Oscar Wilde"},{"text":"Fall seven times and stand up eight","author":"Japanese Proverb"},{"text":"Success is not the key to happiness. Happiness is the key to success.","author":"Herman Cain"},{"text":"Learning is a treasure that will follow its owner everywhere.","author":"Chinese Proverb"},{"text":"Success is the child of audacity.","author":"Benjamin Disraeli"},{"text":"Never make fun of someone who speaks broken English. It means they know another language.","author":"H. Jackson Brown, Jr."},{"text":"Only two things are infinite — the universe and human stupidity, and I’m not sure about the former.","author":"Albert Einstein"},{"text":"Fake It Until You Make It! Act As If You Had All The Confidence You Require Until It Becomes Your Reality.","author":"Brian Tracy"},{"text":"The more you say, the less people remember.","author":"François Fénelon"},{"text":"Even if you have only a puck goat to sell, be in the middle of the fair with it.","author":"Irish proverb"}]');

/***/ }),

/***/ "./src/utils/quotesRU.json":
/*!*********************************!*\
  !*** ./src/utils/quotesRU.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"text":"Лучшие сны происходят, когда вы бодрствуете.","author":"Черри Гилдерблум"},{"text":"Нельзя быть слишком хорошо одетым или слишком хорошо образованным.","author":"Оскар Уайльд"},{"text":"Упади семь раз, поднимись восемь.","author":"Японская пословица"},{"text":"Успех — не ключ к счастью. Это счастье — ключ к успеху.","author":"Герман Кейн"},{"text":"Знание — это сокровище, которое всюду следует за тем, кто им обладает.","author":"Китайская пословица"},{"text":"Успех — дитя смелости.","author":"Бенджамин Дизраэли"},{"text":"Никогда не смейтесь над человеком, который говорит на ломаном английском. Это значит, что он знает и другой язык.","author":"Х. Джексон Браун — младший"},{"text":"Две вещи бесконечны — Вселенная и человеческая глупость, но насчёт Вселенной я не уверен.","author":"Альберт Эйнштейн"},{"text":"Притворись, пока не получится! Действуйте так, как будто у вас есть вся необходимая уверенность, пока она не станет вашей реальностью.","author":"Брайан Трейси"},{"text":"Чем больше Вы скажете, тем меньше люди запомнят.","author":"Франсуа Фенелон"},{"text":"Даже если у тебя на продажу одна коза, будь с ней в центре ярмарки.","author":"Ирландская пословица"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/style.css */ "./css/style.css");
/* harmony import */ var _css_owfont_regular_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/owfont-regular.css */ "./css/owfont-regular.css");
/* harmony import */ var _js_localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/localStorage */ "./src/js/localStorage.js");
/* harmony import */ var _js_image_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/image-slider */ "./src/js/image-slider.js");
/* harmony import */ var _js_currentTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/currentTime */ "./src/js/currentTime.js");
/* harmony import */ var _js_currentDate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/currentDate */ "./src/js/currentDate.js");
/* harmony import */ var _js_greeting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/greeting */ "./src/js/greeting.js");
/* harmony import */ var _js_weather__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/weather */ "./src/js/weather.js");
/* harmony import */ var _js_quotes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/quotes */ "./src/js/quotes.js");
/* harmony import */ var _js_audioplayer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/audioplayer */ "./src/js/audioplayer.js");
/* harmony import */ var _js_translation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/translation */ "./src/js/translation.js");

// import 'style-loader';











})();

/******/ })()
;
//# sourceMappingURL=bundle.d1627b3d1fe4528ebd0c.js.map