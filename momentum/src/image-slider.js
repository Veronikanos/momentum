import {getTimeOfDay} from './currentTime';

const setBg = (imageNumber, timeOfDay) => {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Veronikanos/images-for-momentum/assets/images/${timeOfDay}/${imageNumber}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Veronikanos/images-for-momentum/assets/images/${timeOfDay}/${imageNumber}.jpg')`;
  };
};

const currentTimeOfDay = getTimeOfDay();
let randomImageNumber = Math.floor(Math.random() * 20);
const normalizeNumber = randomImageNumber.toString().padStart(2, 0);

const prevArrow = document.querySelector('.slide-prev');
const nextArrow = document.querySelector('.slide-next');

setBg(normalizeNumber, currentTimeOfDay);

const handlePrevArrowClick = () => {
  randomImageNumber =
    randomImageNumber === 1 ? 20 : randomImageNumber - 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  setBg(normalizeNumber, currentTimeOfDay);
};

const handleNextArrowClick = () => {
  randomImageNumber =
    randomImageNumber === 20 ? 1 : randomImageNumber + 1;
  const normalizeNumber = randomImageNumber.toString().padStart(2, 0);
  setBg(normalizeNumber, currentTimeOfDay);
};

prevArrow.addEventListener('click', handlePrevArrowClick);
nextArrow.addEventListener('click', handleNextArrowClick);
