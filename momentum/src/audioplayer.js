import playList from './utils/playList';

const playButton = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListText = document.querySelector('.play-list');

let isPlay = false;
let playNum = 0;
const audio = new Audio();

const highlightActiveTrack = () => {
  const allTracks = document.querySelectorAll('.play-item');
  allTracks.forEach((element, index) => {
    element.classList.remove('item-active');
    if (index === playNum) {
      element.classList.add('item-active');
    }
  });
};

const playAudio = () => {
  audio.src = `${playList[playNum].src}`;
  audio.currentTime = 0;
  audio.play();
  highlightActiveTrack();
};

const pauseAudio = () => {
  audio.pause();
};

const handlePlayButton = () => {
  isPlay ? pauseAudio() : playAudio();
  playButton.classList.toggle('pause');
  isPlay = !isPlay;
};

const handlePlayPrevButton = () => {
  playNum--;
  console.log(playNum);

  if (!playNum) {
    playNum = playList.length;
  }
  isPlay && playAudio();
};

const handlePlayNextButton = () => {
  playNum++;
  if (playNum === playList.length) {
    playNum = 0;
  }
  isPlay && playAudio();
};

const showListOfTracks = () => {
  let arr = [];
  playList.forEach((element) => {
    arr.push(`<li class='play-item'>${element.title}</li>`);
  });
  return arr;
};

playListText.insertAdjacentHTML(
  'beforeend',
  showListOfTracks().join('')
);

// highlightActiveTrack();

playButton.addEventListener('click', handlePlayButton);
playPrev.addEventListener('click', handlePlayPrevButton);
playNext.addEventListener('click', handlePlayNextButton);
