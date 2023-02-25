import playList from './utils/playList';

const playButton = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListWrapper = document.querySelector('.play-list');

let isPlay = false;
let playNum = 0;
let audioCurrentTime = 0;
const audio = new Audio();

const formateTime = (num) => {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

const handleAudioLoaded = () => {
  document.querySelector('.length').textContent = formateTime(
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
  document.querySelector('.current').textContent = formateTime(
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
