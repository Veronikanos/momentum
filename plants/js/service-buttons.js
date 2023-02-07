const allCards = document.querySelectorAll('.service__gallery-item');
const buttons = document.querySelector('.service__buttons');
const buttonsArr = document.querySelectorAll('.service-btn');
let activeButtons = 0;

console.log(buttonsArr);

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

const resetActiveButtons = () => {
  buttonsArr.forEach((btn) => {
    btn.classList.remove('active');
  });
  activeButtons = 0;
};

buttons.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;

  let clickedButton = e.target;

  if (!activeButtons) {
    addBlurCardsForAll();
    handleClickToInactiveButton(clickedButton);
  } else if (activeButtons === 1) {
    if (clickedButton.classList.contains('active')) {
      handleClickToActiveButton(clickedButton);
      removeBlurCardsForAll();
    } else handleClickToInactiveButton(clickedButton);
  } else {
    if (clickedButton.classList.contains('active')) {
      handleClickToActiveButton(clickedButton);
    } else {
      addBlurCardsForAll();
      resetActiveButtons();
      handleClickToInactiveButton(clickedButton);
    }
  }
});
