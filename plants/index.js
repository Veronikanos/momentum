// console.log(
//   '1. Вёрстка валидная +10\n2. Вёрстка семантическая +20\n3. Вёрстка соответствует макету +48\n4. Требования к css +12\n5. Интерактивность, реализуемая через css +20\nИтоговая оценка: 110.'
// );

const allCards = document.querySelectorAll('.service__gallery-item');
console.log(allCards);

window.onload = () => {
  const buttons = document.querySelector('.service__buttons');
  console.log(buttons);
  handleButtonClick(buttons);
};

const handleButtonClick = (buttons) => {
  buttons.addEventListener('click', (e) => {
    if (e.target.classList.contains('service-btn')) {
      let clickedButton = e.target;
      // console.log('OlldfK');
      // removeSelectedTypes();
      if (clickedButton.classList.contains('active')) {
        removeActiveButtonClass(clickedButton);
				removeBlurCards(clickedButton.innerText.toLowerCase());
      } else {
        addActiveButtonClass(clickedButton);
        // console.log(clickedButton.innerText);
        addBlurCards(clickedButton.innerText.toLowerCase());
      }
    }
  });
};

// const removeSelectedTypes = () => {
//   const types = document.querySelectorAll(
//     '.service__buttons .service-btn'
//   );
//   types.forEach((item) => item.classList.remove('active'));
// };

const addActiveButtonClass = (btn) => {
  // console.log(btn);
  btn.classList.add('active');
};

const removeActiveButtonClass = (btn) => {
  // console.log(btn);
  btn.classList.remove('active');
};

const addBlurCards = (group) => {
  allCards.forEach((card) => {
    if (!card.classList.contains(group)) {
      card.classList.add('blur');
    }
  });
};

const removeBlurCards = (group) => {
  allCards.forEach((card) => {
    if (!card.classList.contains(group)) {
      card.classList.remove('blur');
    }
  });
};
