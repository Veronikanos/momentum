import {sikFloatingMenu} from './settings';
import {getTimeOfDay} from './currentTime';
import {setNewBackground} from './image-slider';

window.sik_menu = new sikFloatingMenu('#settingsBackground');

export const renderImagesMenu = () => {
  const lang = localStorage.getItem('lang') ?? 'en';

  let settings = [];

  // settingsObj.forEach(({title, id, options, icon}) => {
  //   const settingTitle = langObj[lang][title];

  //   const firstOption = langObj[lang][options[0].toLowerCase()];
  //   const secondOption = langObj[lang][options[1].toLowerCase()];

  settings.push(`
		<li>
			<div>
				Standard Image
			</div>
			<div class="radio_container" id='Standard'>
				<input type="radio" name='bg' id='standard'  />
				<label for='standard'>On</label>
			</div>
		</li>

		<li>
			<div>
			Flickr Image
			</div>
			<div class="radio_container" id='Flickr'>
				<input type="radio" name='bg' id='flickr'  />
				<label for='flickr'>On</label>
			</div>
		</li>
		`);
  // });

  return settings;
};

const floatingMenuImage = document.querySelector(
  '.floating-menu.image'
);

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setFlickrBackground = async () => {
  let currentTimeOfDay = getTimeOfDay();
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=742cf61afbc96838bf67736ac683f06e&tags=${currentTimeOfDay}&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
  const res = await fetch(url);
  const data = await res.json();

  const img = new Image();
  console.log(data);
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

  localStorage.getItem('bg') === 'flickr'
    ? setFlickrBackground()
    : setNewBackground();
};

floatingMenuImage.addEventListener('change', handleBgImageChange);
// floatingMenuImage.innerHTML = renderImagesMenu().join('');
