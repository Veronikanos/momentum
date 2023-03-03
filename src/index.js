import './index.html';
// import 'style-loader';
import '../css/style.css';
import '../css/owfont-regular.css';

import './js/localStorage';
import './js/image-slider';
import './js/currentTime';
import './js/currentDate';
import './js/greeting';
import './js/weather';
import './js/quotes';
import './js/audioplayer';
import './js/translation';

//The menu js class:
class sikFloatingMenu {
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
        this._handler.bind(this)
      );
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
      items.length * this._getHeight(items[0], 'outer') + 10 + 'px'
    );
  }

  measureExpandableTrigger(item) {
    const textEle = item.querySelector('.text');
    const sizeBase = this._getWidth(item, 'outer');
    const sizeExpandLabel = this._getWidth(textEle, 'outer');
    return sizeBase + sizeExpandLabel + 6 + 'px';
  }
  _handler(el, ev) {
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
  _getWidth(el, type) {
    if (type === 'inner') return el.clientWidth;
    else if (type === 'outer') return el.offsetWidth;
    return 0;
  }
  _getHeight(el, type) {
    if (type === 'inner') return el.clientHeight;
    else if (type === 'outer') return el.offsetHeight;
    return 0;
  }
}

//Intialize menu:
window.sik_menu = new sikFloatingMenu('#mymenu');
