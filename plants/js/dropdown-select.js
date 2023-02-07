import {addresses} from '../constants/addresses.js';

const button = document.querySelector('.dropdown__button');
const list = document.querySelector('.dropdown__list');
const items = document.querySelectorAll('.dropdown__list-item');
const addressBoxWrapper = document.querySelector(
  '.address-box-wrapper'
);

button.addEventListener('click', () => {
  list.classList.toggle('dropdown__list_visible');
  button.classList.toggle('dropdown__button_active');
  button.classList.remove('default');
});

const showAddressBox = (text) => {
  const selectedCity = addresses.find((item) => text === item.city);
  addressBoxWrapper.innerHTML = `<div class="address-box">
  	<ul class="address-box-list">
  		<li class="address-box-item"><span class="item-left">City:</span><span>${
        selectedCity.city
      }</span></li>
  		<li class="address-box-item"><span class="item-left">Phone:</span><span>${
        selectedCity.phone
      }</span></li>
  		<li class="address-box-item"><span class="item-left">Office address:</span><span>${
        selectedCity.office
      }</span></li>
  	</ul>
  	<a class="btn contact-btn address-box-btn" href="tel:${selectedCity.phone.replace(
      /\s/g,
      ''
    )}">Call us</a>
  </div>`;
};

items.forEach((listItem) => {
  listItem.addEventListener('click', (e) => {
    items.forEach((el) => {
      el.classList.remove('dropdown__list-item_active');
    });

    //hide background image if mobile width as soon as user select city from dropdown
    if (window.innerWidth < 768) {
      document.querySelector(
        '.contacts-container .wrapper'
      ).style.backgroundImage = 'none';
    }

    e.target.classList.add('dropdown__list-item_active');
    button.innerText = listItem.innerText;
    showAddressBox(listItem.innerText);
    list.classList.remove('dropdown__list_visible');
  });
});
