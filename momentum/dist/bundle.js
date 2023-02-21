/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/currentDate.js":
/*!****************************!*\
  !*** ./src/currentDate.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "putDate": () => (/* binding */ putDate)
/* harmony export */ });
const putDate = () => {
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _currentDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentDate */ "./src/currentDate.js");
/* harmony import */ var _greeting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./greeting */ "./src/greeting.js");
/* harmony import */ var _greeting__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_greeting__WEBPACK_IMPORTED_MODULE_1__);



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
    let day = (0,_greeting__WEBPACK_IMPORTED_MODULE_1__.getTimeOfDay)();
    greeting.innerText = `Good ${day},`;
  }

  setTimeout(showTime, 1000);
};

showTime();


/***/ }),

/***/ "./src/greeting.js":
/*!*************************!*\
  !*** ./src/greeting.js ***!
  \*************************/
/***/ (() => {

const greeting = document.querySelector('.greeting');
const input = document.querySelector('input.name');

const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timeOfDay[Math.floor(hours / 6)];
};

let day = getTimeOfDay();
greeting.innerText = `Good ${day},`;

const setLocalStorage = () => {
  if (input.value) {
    localStorage.setItem('name', input.value);
  }
};

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
};

getLocalStorage();
window.addEventListener('beforeunload', setLocalStorage);


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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _currentTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentTime */ "./src/currentTime.js");
/* harmony import */ var _currentDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currentDate */ "./src/currentDate.js");
/* harmony import */ var _greeting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./greeting */ "./src/greeting.js");
/* harmony import */ var _greeting__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_greeting__WEBPACK_IMPORTED_MODULE_2__);




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map