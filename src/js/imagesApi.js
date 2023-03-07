import {sikFloatingMenu} from './settings';
import {getTimeOfDay} from './currentTime';
import {setNewBackground} from './image-slider';
import {settingsImagesObj} from '../utils/settingsObj';

window.sik_menu = new sikFloatingMenu('#settingsBackground');

// export const renderSettingsMenuCheckbox = (obj) => {
//   const lang = localStorage.getItem('lang') ?? 'en';

//   let settings = [];

//   obj.forEach(({title, name, id}) => {
//     settings.push(`
// 		<li>
// 			<div>
// 			${title}
// 			</div>
// 			<div class="radio_container">
// 				<input type="radio" name=${name} id=${id}  />
// 				<label for=${id}></label>
// 			</div>
// 		</li>
// 		`);
//   });

//   return settings;
// };

export const changeViewDueToSwitchBgImageSource = () => {
  const bg = localStorage.getItem('bg') ?? 'analog';
  bg === 'analog' ? setNewBackground() : setFlickrBackground();

  const allImageRadio = floatingMenuImage.querySelectorAll(
    'input[name="bg"]'
  );
  allImageRadio.forEach((item) => {
    if (item.id === localStorage.getItem('bg')) {
      item.checked = true;
      item.nextElementSibling.innerText = 'On';
    } else {
      item.checked = false;
      item.nextElementSibling.innerText = 'Off';
    }
  });
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
  console.log(e.target);
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
