// console.log(
//   '1. Вёрстка валидная +10\n2. Вёрстка семантическая +20\n3. Вёрстка соответствует макету +48\n4. Требования к css +12\n5. Интерактивность, реализуемая через css +20\nИтоговая оценка: 110.'
// );

const allCards = document.querySelectorAll('.service__gallery-item');
const buttons = document.querySelector('.service__buttons');
let activeButtons = 0;

const handleButtonClick = (buttons) => {
  buttons.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    let clickedButton = e.target;

    if (!activeButtons) {
      addBlurCardsForAll();
      handleClickToInactiveButton(clickedButton);
    } else if (activeButtons === 1) {
      if (clickedButton.classList.contains('active')) {
        handleClickToInactiveButton(clickedButton);
        removeBlurCardsForAll();
      } else {
        handleClickToInactiveButton(clickedButton);
      }
    } else {
      if (clickedButton.classList.contains('active')) {
        handleClickToInactiveButton(clickedButton);
      }
    }
  });
};

const handleClickToInactiveButton = (clickedButton) => {
  clickedButton.classList.add('active');
  removeBlurCards(clickedButton.innerText.toLowerCase());
  activeButtons++;
};

const handleClickToActiveButton = (clickedButton) => {
  clickedButton.classList.remove('active');
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
