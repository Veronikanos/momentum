import settingsObj from '../utils/settingsObj';
import langObj from '../utils/languageObj';

//The menu js class:
export class sikFloatingMenu {
  menuEl = null;
  constructor(menu) {
    //The menu element:
    this.menuEl =
      typeof menu === 'string' ? document.querySelector(menu) : menu;
    //Attach handlers:
    this.attachHandlers();
  }

  attachHandlers() {
    if (this.menuEl) {
      this.on(
        this.menuEl,
        'click',
        '.trigger-menu',
        this.handler.bind(this)
      );
      // Add a click event listener to the document object to close any open menus when clicked outside
      document.addEventListener(
        'click',
        this.closeAllMenus.bind(this)
      );
    }
  }

  closeAllMenus(event) {
    const openedMenus = document.querySelectorAll(
      '.trigger-menu.open'
    );
    // Loop through all open menus and close them if the clicked element is not inside any of them
    for (const menu of openedMenus) {
      const isClickedInsideMenu = menu
        .closest('.fmenu')
        .contains(event.target);
      if (!isClickedInsideMenu) {
        this.close(menu);
      }
    }
  }

  open(item) {
    let opened = item
      .closest('.fmenu')
      .querySelectorAll('.trigger-menu.open');
    for (const elem of opened) {
      this.close(elem);
    }
    item.classList.add('open');
    //expand:
    let list = item.closest('li').querySelector('.floating-menu');
    list.style.setProperty(
      'max-height',
      this.measureExpandableList(list)
    );
    list.style.setProperty('opacity', '1');
    item.style.setProperty(
      'max-width',
      this.measureExpandableTrigger(item)
    );

    item.style.setProperty(
      'max-width',
      this.measureExpandableTrigger(item)
    );
  }

  close(item) {
    let list = item.closest('li').querySelector('.floating-menu');
    item.classList.remove('open');
    //shrink:
    list.style.removeProperty('max-height');
    list.style.removeProperty('opacity');
    item.style.removeProperty('max-width');
  }

  measureExpandableList(list) {
    const items = list.querySelectorAll('li');
    return (
      items.length * this.getHeight(items[0], 'outer') + 10 + 'px'
    );
  }

  measureExpandableTrigger(item) {
    const textEle = item.querySelector('.text');
    const sizeBase = this.getWidth(item, 'outer');
    const sizeExpandLabel = this.getWidth(textEle, 'outer');
    return sizeBase + sizeExpandLabel + 6 + 'px';
  }
  handler(el, ev) {
    if (el.classList.contains('open')) {
      this.close(el);
    } else {
      this.open(el);
    }
  }
  on(elem, type, selector, handler) {
    elem.addEventListener(type, function (e) {
      let el = e.target.closest(selector);
      if (el) handler.call(this, el, e); //The element is bind to this
    });
  }
  getWidth(el, type) {
    if (type === 'inner') return el.clientWidth;
    else if (type === 'outer') return el.offsetWidth;
    return 0;
  }
  getHeight(el, type) {
    if (type === 'inner') return el.clientHeight;
    else if (type === 'outer') return el.offsetHeight;
    return 0;
  }
}

//Intialize menu:
window.sik_menu = new sikFloatingMenu('#settingsMenu');

export const renderSettingsMenu = () => {
  const lang = localStorage.getItem('lang') ?? 'en';

  let settings = [];

  settingsObj.forEach(({title, id, options, icon}) => {
    const settingTitle = langObj[lang][title];

    const firstOption = langObj[lang][options[0].toLowerCase()];
    const secondOption = langObj[lang][options[1].toLowerCase()];

    settings.push(`
		<li>
			<div>
				<i class="fa-solid ${icon}"></i>
				${settingTitle}
			</div>
			<div class="radio_container settings" id=${langObj.en[title]}>
				<input type="radio" name=${title} id=${id[0]}  />
				<label for=${id[0]}>${firstOption}</label>
				<input type="radio" name=${title} id=${id[1]}
     />
				<label for=${id[1]}>${secondOption}</label>
			</div>
		</li>
		`);
  });

  return settings;
};

export const renderSettingsMenuCheckbox = (obj) => {
  let settings = [];

  obj.forEach(({title, name, id}) => {
    settings.push(`
		<li>
			<div>
			${title}
			</div>
			<div class="radio_container">
				<input type="radio" name=${name} id=${id}  />
				<label for=${id}></label>
			</div>
		</li>
		`);
  });

  return settings;
};

export const changeInnerTextInsideCheckboxMenu = (
  inputName,
  btnsGroup
) => {
  btnsGroup.forEach((item) => {
    if (item.id === localStorage.getItem(`${inputName}`)) {
      item.checked = true;
      item.nextElementSibling.innerText = 'On';
    } else {
      item.checked = false;
      item.nextElementSibling.innerText = 'Off';
    }
  });
};
