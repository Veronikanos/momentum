import playList from './playList';

const playButton = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListWrapper = document.querySelector('.play-list');
const audioProgress = document.querySelector('.progress');
const volumeIcon = document.querySelector('.volume_icon');

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
  const trackIconElement = document.querySelector('.item-active');

  allTracks.forEach((element, index) => {
    element.classList.remove('item-active');
    if (index === playNum) {
      element.classList.add('item-active');
      trackName.textContent = element.innerText;
    }
  });
};

const playAudio = () => {
  isPlay = true;
  audio.src = playList[playNum].src;
  audio.play();
  audio.currentTime = audioCurrentTime;
  highlightActiveTrack();
};

const nextTrack = () => {
  playNum = playNum === playList.length - 1 ? 0 : playNum + 1;
  audioCurrentTime = 0;
  isPlay && playAudio();
};

const pauseAudio = () => {
  isPlay = false;
  audio.pause();
  audioCurrentTime = audio.currentTime;
};

const handlePlayButton = () => {
  isPlay ? pauseAudio() : playAudio();
  playButton.classList.toggle('pause');
  document
    .querySelector('.item-active')
    .firstChild.classList.toggle('pause');
};

const handlePlayPrevButton = () => {
  if (!playNum) {
    playNum = playList.length - 1;
  } else playNum--;
  audioCurrentTime = 0;
  isPlay && playAudio();
  highlightActiveTrack();
};

const handlePlayNextButton = () => {
  nextTrack();

  isPlay && playAudio();
  highlightActiveTrack();
};

const showListOfTracks = () => {
  let arr = [];
  playList.forEach((element) => {
    arr.push(
      `<li class='play-item'><button class="play play-track player-icon"></button><span>${element.title}</span></li>`
    );
  });

  return arr;
};

const handleClickToTrack = (e) => {
  // if click to active track, check if needs to play or stop
  if (e.target.closest('li').classList.contains('item-active')) {
    handlePlayButton();
    return;
  }
  allTracks.forEach((item, index) => {
    item.firstChild.classList.remove('pause');
    if (item === e.target.closest('li')) {
      playNum = index;
      playButton.classList.add('pause');
      item.firstChild.classList.add('pause');
      audioCurrentTime = 0;
      playAudio();
    }
  });
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

const updateProgressValue = () => {
  if (audio.duration) {
    audioCurrentTime = audio.currentTime;
    document.querySelector('.current').textContent = formateTime(
      audio.currentTime
    );
    audioProgress.value = 100 * (audio.currentTime / audio.duration);
  }
};

const setNewTrackTime = () => {
  if (audio.duration) {
    audio.currentTime = (audioProgress.value * audio.duration) / 100;
  }
};

// const audioVolume = document.getElementById('audioVolume');
// const audioProgress = document.getElementById('audioProgress');

volumeIcon.addEventListener('click', () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeIcon.classList.add('mute');
  } else {
    volumeIcon.classList.remove('mute');
  }
});

showTrackList();
const allTracks = document.querySelectorAll('.play-item');
setFirstActiveTrack();
audioProgress.addEventListener('input', setNewTrackTime);
playListWrapper.addEventListener('click', handleClickToTrack);
audio.addEventListener('loadeddata', handleAudioLoaded);
audio.addEventListener('timeupdate', updateProgressValue);
audio.addEventListener('ended', nextTrack);
playButton.addEventListener('click', handlePlayButton);
playPrev.addEventListener('click', handlePlayPrevButton);
playNext.addEventListener('click', handlePlayNextButton);
