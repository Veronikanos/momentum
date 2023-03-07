import {sikFloatingMenu} from './settings';
import {renderSettingsMenuCheckbox} from './settings';
import {settingsClockObj} from '../utils/settingsObj';
import {changeInnerTextInsideCheckboxMenu} from './settings';
import {showTime} from './currentTime';

window.sik_menu = new sikFloatingMenu('#clockStyle');

const floatingMenuClock = document.querySelector(
  '.floating-menu.clock-menu'
);
floatingMenuClock.innerHTML =
  renderSettingsMenuCheckbox(settingsClockObj).join('');

export const changeClockTypeView = () => {
  localStorage.getItem('clock') ??
    localStorage.setItem('clock', 'numeric');

  const clock = localStorage.getItem('clock');

  const allRadioBtns = floatingMenuClock.querySelectorAll(
    'input[name="clock"]'
  );

  const allClockDivs = document.querySelectorAll('.clock-js');

  allClockDivs.forEach((item) => {
    if (item.classList.contains(`${clock}`)) {
      item.style.display = 'block';
      item.style.opacity = '1';
    } else {
      item.style.display = 'none';
      item.style.opacity = '0';
    }
  });

  changeInnerTextInsideCheckboxMenu('clock', allRadioBtns);
};

const handleClockTypeChange = (e) => {
  const clickedRadio = e.target;
  localStorage.setItem('clock', clickedRadio.id);

  // when click to switch clock it needs to stop previous timeout
  clearTimeout(showTime);

  changeClockTypeView();

  showTime();
};

floatingMenuClock.addEventListener('change', handleClockTypeChange);
