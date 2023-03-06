import {sikFloatingMenu} from './settings';

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
// console.log('gghg');
// const floatingMenuImage = document.querySelector(
//   '.floating-menu.image'
// );
// floatingMenuImage.innerHTML = renderImagesMenu().join('');
