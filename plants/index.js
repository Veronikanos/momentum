// console.log(
//   '1. Вёрстка валидная +10\n2. Вёрстка семантическая +20\n3. Вёрстка соответствует макету +48\n4. Требования к css +12\n5. Интерактивность, реализуемая через css +20\nИтоговая оценка: 110.'
// );

const allCards = document.querySelectorAll('.service__gallery-item');
const buttons = document.querySelector('.service__buttons');
let activeButtons = 0;

const handleButtonClick = (buttons) => {
  buttons.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    // console.log(e.target);

    let clickedButton = e.target;

    if (!activeButtons) {
      addBlurCardsForAll();

      handleClickToInactiveButton(clickedButton);
    } else if (activeButtons === 1) {
      if (clickedButton.classList.contains('active')) {
        handleClickToActiveButton(clickedButton);
        removeBlurCardsForAll();
      } else {
        handleClickToInactiveButton(clickedButton);
      }
    } else {
      if (clickedButton.classList.contains('active')) {
        handleClickToActiveButton(clickedButton);
      }
    }
  });
};

const handleClickToInactiveButton = (clickedButton) => {
  addActiveButtonClass(clickedButton);
  removeBlurCards(clickedButton.innerText.toLowerCase());
  activeButtons++;
};

const handleClickToActiveButton = (clickedButton) => {
  removeActiveButtonClass(clickedButton);
  addBlurCards(clickedButton.innerText.toLowerCase());
  activeButtons--;
};

const addBlurCardsForAll = () => {
  allCards.forEach((card) => {
    card.classList.add('blur');
  });
};

const removeBlurCardsForAll = () => {
  allCards.forEach((card) => {
    card.classList.remove('blur');
  });
};

const addActiveButtonClass = (btn) => {
  btn.classList.add('active');
};

const removeActiveButtonClass = (btn) => {
  btn.classList.remove('active');
};

const addBlurCards = (group) => {
  allCards.forEach((card) => {
    if (card.classList.contains(group)) {
      card.classList.add('blur');
    }
  });
};

const removeBlurCards = (group) => {
  allCards.forEach((card) => {
    if (card.classList.contains(group)) {
      card.classList.remove('blur');
    }
  });
};

handleButtonClick(buttons);
