const time = document.querySelector('.time');

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  if (currentTime === '00:00:00') {
    putDate();
  }
  setTimeout(showTime, 1000);
};

showTime();
