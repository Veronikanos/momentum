import playList from './utils/playList';

const playButton = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListWrapper = document.querySelector('.play-list');

let isPlay = false;
let playNum = 0;
let audioCurrentTime = 0;
const audio = new Audio();

const getTimeCode = (num) => {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0)
    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
};

const handleAudioLoaded = () => {
  document.querySelector('.length').textContent = getTimeCode(
    audio.duration
  );
  audio.volume = 0.75;
};

const highlightActiveTrack = () => {
  const trackName = document.querySelector('.track-name');
  allTracks.forEach((element, index) => {
    element.classList.remove('item-active');
    if (index === playNum) {
      element.classList.add('item-active');
      trackName.textContent = element.innerText;
    }
  });
};

const playAudio = () => {
  audio.src = playList[playNum].src;
  audio.play();
  audio.currentTime = audioCurrentTime;
  audio.onended = function () {
    playNum = playNum === playList.length - 1 ? 0 : playNum + 1;
    playAudio();
  };
  highlightActiveTrack();
};

const pauseAudio = () => {
  audio.pause();
  audioCurrentTime = audio.currentTime;
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

const showTrackList = () => {
  playListWrapper.insertAdjacentHTML(
    'beforeend',
    showListOfTracks().join('')
  );
};

const setFirstActiveTrack = () => {
  allTracks[0].classList.add('item-active');
  audio.src = playList[playNum].src;
  highlightActiveTrack();
};

//click on timeline to skip around
const timeline = document.querySelector('.timeline');
timeline.addEventListener('click', (e) => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek =
    (e.offsetX / parseInt(timelineWidth)) * audio.duration;
  audio.currentTime = timeToSeek;
});

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = document.querySelector('.progress');
  progressBar.style.width =
    (audio.currentTime / audio.duration) * 100 + '%';
  document.querySelector('.current').textContent = getTimeCode(
    audio.currentTime
  );
}, 500);

showTrackList();
const allTracks = document.querySelectorAll('.play-item');
setFirstActiveTrack();

playListWrapper.addEventListener('click', handleClickToTrack);
audio.addEventListener('loadeddata', handleAudioLoaded);
playButton.addEventListener('click', handlePlayButton);
playPrev.addEventListener('click', handlePlayPrevButton);
playNext.addEventListener('click', handlePlayNextButton);
