import langObject from './languageObj';

const weatherWrapper = document.querySelector('.weather-wrapper');
const weatherBlock = document.querySelector('.weather');
const inputCity = document.querySelector('.city');
// const lang = localStorage.getItem('lang') ?? 'en';

export const getWeather = async (city) => {
  const lang = localStorage.getItem('lang') ?? 'en';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=8ab18f9fbf76b2fee381039f2e960e34&units=metric`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  }
  return error.message;
};

export const fillElementsOnWeatherBlock = async (cityQuery) => {
  const lang = localStorage.getItem('lang') ?? 'en';
  try {
    const {weather, main, wind, name} = await getWeather(cityQuery);

    //remember the last valid entered city
    localStorage.setItem('city', name);

    inputCity.value = name;
    weatherBlock.innerHTML = `
		<ul>
    	<li>
    		<span class="last-updated-text">${
          langObject[lang].lastUpdatedText
        }:</span>
    		<span class="updated-info">${new Date().toLocaleTimeString()}</span>
    	</li>

    	<li class="description-container">
    		<i class="weather-icon owf owf-${weather[0].id}"></i>
    		<span class="temperature">${Math.round(main.temp)}°C</span>
    		<span class="weather-description">${weather[0].description}</span>
    	</li>
    	<li>
    		<span class="wind-text">${langObject[lang].wind}: </span
    		><span class="wind">${Math.trunc(wind.speed)} ${
      langObject[lang].windSpeed
    }</span>
    	</li>
    	<li>
    		<span class="humidity-text">${langObject[lang].humidity}:</span>
    		<span class="humidity">${Math.trunc(main.humidity)}%</span>
    	</li></ul>
    `;
  } catch (error) {
    weatherBlock.innerHTML = `<div class="weather-error">${langObject[lang].errorNoCity}</div>`;
  }
};

const searchCity = () => {
  const lang = localStorage.getItem('lang') ?? 'en';
  let searchedCity;
  if (!inputCity.value.toLowerCase().trim()) {
    weatherBlock.innerHTML = `<div class="weather-error">${langObject[lang].errorEmptyInput}</div>`;
    return;
  }

  //show default city weather if first visit
  searchedCity = !localStorage.getItem('city')
    ? langObject[lang].defaultCity
    : inputCity.value.toLowerCase().trim();

  fillElementsOnWeatherBlock(searchedCity);
};

searchCity();
inputCity.addEventListener('change', searchCity);
