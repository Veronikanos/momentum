import {getTimeOfDay} from './currentTime';
import {setFlickrBackground} from './imagesApi';

let randomImageNumber;
let currentTimeOfDay;

const setBg = (imageNumber, timeOfDay) => {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Veronikanos/images-for-momentum/assets/images/${timeOfDay}/${imageNumber}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Veronikanos/images-for-momentum/assets/images/${timeOfDay}/${imageNumber}.jpg')`;
  };
};

export const setNewBackground = () => {
  randomImageNumber = Math.floor(Math.random() * 20 + 1);
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  currentTimeOfDay = getTimeOfDay();
  setBg(normalizeNumber, currentTimeOfDay);
};

const prevArrow = document.querySelector('.slide-prev');
const nextArrow = document.querySelector('.slide-next');

const handlePrevArrowClick = () => {
  randomImageNumber =
    randomImageNumber === 1 ? 20 : randomImageNumber - 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);

  localStorage.getItem('bg') === 'flickr'
    ? setFlickrBackground()
    : setBg(normalizeNumber, currentTimeOfDay);
};

const handleNextArrowClick = () => {
  randomImageNumber =
    randomImageNumber === 20 ? 1 : randomImageNumber + 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);

  localStorage.getItem('bg') === 'flickr'
    ? setFlickrBackground()
    : setBg(normalizeNumber, currentTimeOfDay);
};

prevArrow.addEventListener('click', handlePrevArrowClick);
nextArrow.addEventListener('click', handleNextArrowClick);
