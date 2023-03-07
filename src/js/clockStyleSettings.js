import {sikFloatingMenu} from './settings';

window.sik_menu = new sikFloatingMenu('#clockStyle');

const floatingMenuImage = document.querySelector(
  '.floating-menu.clock'
);
floatingMenuImage.innerHTML = renderImagesMenu().join('');
