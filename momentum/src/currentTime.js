const time = document.querySelector('.time');

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
};

showTime();
