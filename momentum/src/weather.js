import langObject from './languageObj';

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector(
  '.weather-description'
);
const windEl = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const inputCity = document.querySelector('.city');
const titleWeather = document.querySelector('.title-weather');
const updatedInfoBox = document.querySelector('.updated-info');

export const getWeather = async (city = 'Minsk') => {
  const lang = localStorage.getItem('lang');
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=8ab18f9fbf76b2fee381039f2e960e34&units=metric`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  }
  return error.message;
};

export const fillElementsOnWeatherBlock = async (city) => {
  const lang = localStorage.getItem('lang');

  const cityQuery = city ? city : langObject[lang].defaultCity;
  console.log(cityQuery);

  try {
    const {weather, main, wind} = await getWeather(cityQuery);
    if (inputCity.value) {
      localStorage.setItem('city', inputCity.value);
    }

    weatherIcon.classList.add(`owf-${weather[0].id}`);
    temperature.textContent = `${Math.round(main.temp)}°C`;
    weatherDescription.textContent = weather[0].description;
    humidity.textContent = ` ${Math.trunc(main.humidity)}%`;
    windEl.textContent = ` ${Math.trunc(wind.speed)} ${
      langObject[lang].windSpeed
    }`;
    titleWeather.textContent =
      cityQuery.charAt(0).toUpperCase() + cityQuery.slice(1) ?? Minsk;
    updatedInfoBox.textContent = new Date().toLocaleTimeString();
  } catch (error) {
    alert(`${langObject[lang].errorNoCity}`);
  }
};

const searchCity = () => {
  if (!inputCity.value.toLowerCase().trim()) {
    alert('Empty input');
    return;
  }
  fillElementsOnWeatherBlock(inputCity.value.toLowerCase().trim());
};

fillElementsOnWeatherBlock(localStorage.getItem('city') ?? 'Minsk');
inputCity.addEventListener('change', searchCity);
