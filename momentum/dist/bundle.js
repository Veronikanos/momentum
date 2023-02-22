/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/currentDate.js":
/*!****************************!*\
  !*** ./src/currentDate.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "putDate": () => (/* binding */ putDate)
/* harmony export */ });
const putDate = () => {
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  };
  const week = [
    'Sunday',
    'Monday',
    'Thursday',
    'Wednesday',
    'Thirsday',
    'Friday',
    'Saturday',
  ];

  const currentDate = date.toLocaleDateString('en-US', options);
  const currentWeekDay = date.getDay();

  const currentDay = document.querySelector('.date');
  currentDay.innerText = `${week[currentWeekDay]}, ${currentDate}`;
};

putDate();


/***/ }),

/***/ "./src/currentTime.js":
/*!****************************!*\
  !*** ./src/currentTime.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTimeOfDay": () => (/* binding */ getTimeOfDay)
/* harmony export */ });
/* harmony import */ var _currentDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentDate */ "./src/currentDate.js");
/* harmony import */ var _image_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-slider */ "./src/image-slider.js");



const time = document.querySelector('.time');
const timeBrakepoints = [
  '00:00:00',
  '06:00:00',
  '12:00:00',
  '18:00:00',
];

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  if (currentTime === timeBrakepoints[0]) {
    (0,_currentDate__WEBPACK_IMPORTED_MODULE_0__.putDate)();
  }
  if (timeBrakepoints.includes(currentTime)) {
    let day = getTimeOfDay();
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

/***/ "./src/greeting.js":
/*!*************************!*\
  !*** ./src/greeting.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _currentTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentTime */ "./src/currentTime.js");


const greeting = document.querySelector('.greeting');

let day = (0,_currentTime__WEBPACK_IMPORTED_MODULE_0__.getTimeOfDay)();
greeting.innerText = `Good ${day},`;


/***/ }),

/***/ "./src/image-slider.js":
/*!*****************************!*\
  !*** ./src/image-slider.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setNewBackground": () => (/* binding */ setNewBackground)
/* harmony export */ });
/* harmony import */ var _currentTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentTime */ "./src/currentTime.js");


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
  randomImageNumber =
    randomImageNumber === 1 ? 20 : randomImageNumber - 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  setBg(normalizeNumber, currentTimeOfDay);
};

const handleNextArrowClick = () => {
  randomImageNumber =
    randomImageNumber === 20 ? 1 : randomImageNumber + 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  setBg(normalizeNumber, currentTimeOfDay);
};

setNewBackground();
prevArrow.addEventListener('click', handlePrevArrowClick);
nextArrow.addEventListener('click', handleNextArrowClick);


/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/weather.js");


const input = document.querySelector('input.name');
const inputCity = document.querySelector('.city');

const setLocalStorage = () => {
  if (input.value) {
    localStorage.setItem('name', input.value);
  }
  if (inputCity.value) {
    localStorage.setItem('city', inputCity.value);
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

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillElementsOnWeatherBlock": () => (/* binding */ fillElementsOnWeatherBlock)
/* harmony export */ });
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector(
  '.weather-description'
);
const windEl = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const inputCity = document.querySelector('.city');
const titleWeather = document.querySelector('.title-weather');

const getWeather = async (city = 'Минск') => {
  console.log(city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=8ab18f9fbf76b2fee381039f2e960e34&units=metric`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    return error.message;
  }
};

const fillElementsOnWeatherBlock = async (city = 'Minsk') => {
  if (city === '') {
    alert('Empty input');
    return;
  }
  try {
    const {weather, main, wind} = await getWeather(city);

    weatherIcon.classList.add(`owf-${weather[0].id}`);
    temperature.textContent = `${Math.round(main.temp)}°C`;
    weatherDescription.textContent = weather[0].description;
    humidity.textContent = ` ${Math.trunc(main.humidity)}%`;
    windEl.textContent = ` ${Math.trunc(wind.speed)} m/sec`;
    titleWeather.textContent =
      city.charAt(0).toUpperCase() + city.slice(1) ?? Minsk;
  } catch (error) {
    alert('Such city doesn`t exist, try another one');
  }
};

const searchCity = () => {
  fillElementsOnWeatherBlock(inputCity.value.toLowerCase().trim());
};

fillElementsOnWeatherBlock();
inputCity.addEventListener('change', searchCity);


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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _image_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-slider */ "./src/image-slider.js");
/* harmony import */ var _currentTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentTime */ "./src/currentTime.js");
/* harmony import */ var _currentDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentDate */ "./src/currentDate.js");
/* harmony import */ var _greeting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./greeting */ "./src/greeting.js");
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./weather */ "./src/weather.js");







})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map