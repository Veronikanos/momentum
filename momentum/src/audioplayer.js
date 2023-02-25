import playList from './utils/playList';

const playButton = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListWrapper = document.querySelector('.play-list');

let isPlay = false;
let playNum = 0;
const audio = new Audio();

const highlightActiveTrack = () => {
  allTracks.forEach((element, index) => {
    element.classList.remove('item-active');
    if (index === playNum) {
      element.classList.add('item-active');
    }
  });
};

const playAudio = () => {
  console.log(audio);
  audio.src = `${playList[playNum].src}`;
  audio.currentTime = 0;
  audio.play();
  audio.onended = function () {
    console.log(playNum);
    playNum = playNum === playList.length - 1 ? 0 : playNum + 1;
    playAudio();
  };
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
  if (!playNum) {
    playNum = playList.length - 1;
  } else playNum--;

  isPlay && playAudio();
  highlightActiveTrack();
};

const handlePlayNextButton = () => {
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else playNum++;

  isPlay && playAudio();
  highlightActiveTrack();
};

const showListOfTracks = () => {
  let arr = [];
  playList.forEach((element) => {
    arr.push(`<li class='play-item'>${element.title}</li>`);
  });
  return arr;
};

const handleClickToTrack = (e) => {
  if (e.target.tagName != 'LI') return;

  allTracks.forEach((item, index) => {
    if (item === e.target) {
      playNum = index;
    }
  });
  playButton.classList.add('pause');
  isPlay = true;
  playAudio();
};

playListWrapper.insertAdjacentHTML(
  'beforeend',
  showListOfTracks().join('')
);

const allTracks = document.querySelectorAll('.play-item');

playListWrapper.addEventListener('click', handleClickToTrack);

playButton.addEventListener('click', handlePlayButton);
playPrev.addEventListener('click', handlePlayPrevButton);
playNext.addEventListener('click', handlePlayNextButton);
