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

const getWeather = async (city) => {
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

export const fillElementsOnWeatherBlock = async (city) => {
  try {
    const {weather, main, wind} = await getWeather(city || 'Minsk');

    weatherIcon.classList.add(`owf-${weather[0].id}`);
    temperature.textContent = `${Math.round(main.temp)}°C`;
    weatherDescription.textContent = weather[0].description;
    humidity.textContent = ` ${Math.trunc(main.humidity)}%`;
    windEl.textContent = ` ${Math.trunc(wind.speed)} m/sec`;
    titleWeather.textContent =
      city.charAt(0).toUpperCase() + city.slice(1) ?? Minsk;
    updatedInfoBox.textContent = new Date().toLocaleTimeString();
  } catch (error) {
    alert('Such city doesn`t exist, try another one');
  }
};

const searchCity = () => {
  if (!inputCity.value.toLowerCase().trim()) {
    alert('Empty input');
    return;
  }
  fillElementsOnWeatherBlock(inputCity.value.toLowerCase().trim());
};

fillElementsOnWeatherBlock(localStorage.getItem('city') || 'Minsk');
inputCity.addEventListener('change', searchCity);
