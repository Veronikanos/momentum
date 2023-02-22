import axios from 'axios';
import {Notify} from 'notiflix/build/notiflix-notify-aio';

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector(
  '.weather-description'
);
const windEl = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const inputCity = document.querySelector('.city');
const titleWeather = document.querySelector('.title-weather');

const weatherService = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    q: 'Минск',
    lang: 'en',
    appid: '8ab18f9fbf76b2fee381039f2e960e34',
    units: 'metric',
  },
});

const getWeather = async (city = 'Минск') => {
  try {
    const {data} = await weatherService.get('', {
      params: {q: city},
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

const fillElementsOnWeatherBlock = async (city = 'Minsk') => {
  if (city === '') {
    Notify.failure('Empty input', {
      position: 'center-top',
      timeout: 2000,
    });
    return;
  }
  try {
    const {weather, main, wind} = await getWeather(city);

    weatherIcon.classList.add(`owf-${weather[0].id}`);
    temperature.textContent = `${main.temp}°C`;
    weatherDescription.textContent = weather[0].description;
    humidity.textContent = ` ${main.humidity}%`;
    windEl.textContent = ` ${wind.speed} m/sec`;
    titleWeather.textContent =
      city.charAt(0).toUpperCase() + city.slice(1) ?? Minsk;
  } catch (error) {
    Notify.failure('Such city doesn`t exist, try another one', {
      position: 'center-top',
      timeout: 2000,
    });
  }
};

const searchCity = () => {
  fillElementsOnWeatherBlock(inputCity.value.toLowerCase().trim());
};

fillElementsOnWeatherBlock();
inputCity.addEventListener('change', searchCity);
