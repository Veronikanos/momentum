const playButton = document.querySelector('.play');

let isPlay = false;
const audio = new Audio();

const playAudio = () => {
  audio.src = '../assets/sounds/Aqua Caelestis.mp3';
  audio.currentTime = 0;
  audio.play();
  isPlay = !isPlay;
};

const pauseAudio = () => {
  audio.pause();
  isPlay = !isPlay;
};

const handlePlayButton = () => {
  isPlay ? pauseAudio() : playAudio();
  playButton.classList.toggle('pause');
};

playButton.addEventListener('click', handlePlayButton);
