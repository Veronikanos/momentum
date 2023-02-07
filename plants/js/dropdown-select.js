const dropdown = document.querySelector('.dropdown');
const button = document.querySelector('.dropdown__button');
const list = document.querySelector('.dropdown__list');
const items = document.querySelectorAll('.dropdown__list-item');
const addressBoxes = document.querySelectorAll('.address-box');
const addressBoxWrapper = document.querySelector(
  '.address-box-wrapper'
);

button.addEventListener('click', () => {
  list.classList.toggle('dropdown__list_visible');
  button.classList.toggle('dropdown__button_active');
  button.classList.remove('default');
});

const showAddressBox = (text) => {
  // addressBoxes.forEach((box) => {
  //   box.classList.add('address-box-invisible');

  //   if (text.includes(box.dataset.city)) {
  //     box.classList.remove('address-box-invisible');
  //   }
  // });

  addressBoxWrapper.insertAdjacentHTML('beforeend', `<h1>HIII</h1>`);
  // 	<div class="address-box address-box-invisible" data-city="Yonkers">
  // 	<ul class="address-box-list">
  // 		<li class="address-box-item"><span class="item-left">City:</span><span>Yonkers, NY</span></li>
  // 		<li class="address-box-item"><span class="item-left">Phone:</span><span>+1	914	678 0003</span></li>
  // 		<li class="address-box-item"><span class="item-left">Office address:</span><span>511 Warburton Ave</span></li>
  // 	</ul>
  // 	<button type="button" class="btn contact-btn address-box-btn"><a href="tel:+19146780003">Call us</a></button>
  // </div>
};

items.forEach((listItem) => {
  listItem.addEventListener('click', (e) => {
    items.forEach((el) => {
      el.classList.remove('dropdown__list-item_active');
    });
    e.target.classList.add('dropdown__list-item_active');
    button.innerText = listItem.innerText;
    showAddressBox(listItem.innerText);
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
