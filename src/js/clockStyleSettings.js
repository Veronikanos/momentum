import {sikFloatingMenu} from './settings';
import {renderSettingsMenu} from './settings';

window.sik_menu = new sikFloatingMenu('#clockStyle');

const floatingMenuImage = document.querySelector(
  '.floating-menu.clock'
);
// floatingMenuImage.innerHTML = renderSettingsMenu().join('');
