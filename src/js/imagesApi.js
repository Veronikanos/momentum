import {sikFloatingMenu} from './settings';
import {getTimeOfDay} from './currentTime';
import {setNewBackground} from './image-slider';
import {changeInnerTextInsideCheckboxMenu} from './settings';

window.sik_menu = new sikFloatingMenu('#settingsBackground');

export const changeViewDueToSwitchBgImageSource = () => {
  localStorage.getItem('bg') ??
    localStorage.setItem('bg', 'standard');
  const bg = localStorage.getItem('bg');

  bg === 'standard' ? setNewBackground() : setFlickrBackground();

  const allRadioBtns = floatingMenuImage.querySelectorAll(
    'input[name="bg"]'
  );

  changeInnerTextInsideCheckboxMenu('bg', allRadioBtns);
};

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const setFlickrBackground = async () => {
  let currentTimeOfDay = getTimeOfDay();
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=742cf61afbc96838bf67736ac683f06e&tags=${currentTimeOfDay}&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
  const res = await fetch(url);
  const data = await res.json();

  const img = new Image();
  let flickrNumber = getRandomNum(1, 99);
  if (data.stat === 'ok') {
    img.src = `${data.photos.photo[flickrNumber].url_l}`;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${data.photos.photo[flickrNumber].url_l})`;
    };
  } else {
    console.log('error');
  }
};

const handleBgImageChange = (e) => {
  const clickedRadio = e.target;
  localStorage.setItem('bg', clickedRadio.id);
  changeViewDueToSwitchBgImageSource();

  localStorage.getItem('bg') === 'flickr'
    ? setFlickrBackground()
    : setNewBackground();
};

const floatingMenuImage = document.querySelector(
  '.floating-menu.image'
);
floatingMenuImage.addEventListener('change', handleBgImageChange);
