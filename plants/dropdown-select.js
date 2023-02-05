const dropdown = document.querySelector('.dropdown');
const button = document.querySelector('.dropdown__button');
const list = document.querySelector('.dropdown__list');
const items = document.querySelectorAll('.dropdown__list-item');
// const dropdownInput = document.querySelector(
//   '.dropdown__input_hidden'
// );

button.addEventListener('click', () => {
  list.classList.toggle('dropdown__list_visible');
  button.classList.toggle('dropdown__button_active');
  button.classList.remove('default');
});

items.forEach((listItem) => {
  listItem.addEventListener('click', (e) => {
    items.forEach((el) => {
      el.classList.remove('dropdown__list-item_active');
    });
    e.target.classList.add('dropdown__list-item_active');
    button.innerText = listItem.innerText;
    // dropdownInput.value = listItem.dataset.value;
    list.classList.remove('dropdown__list_visible');
  });
});

document.addEventListener('click', (e) => {
  if (e.target !== button) {
    button.classList.remove('dropdown__button_active');
    list.classList.remove('dropdown__list_visible');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' || e.key === 'Escape') {
    button.classList.remove('dropdown__button_active');
    list.classList.remove('dropdown__list_visible');
  }
});
