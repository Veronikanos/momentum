const date = new Date();
const options = {
  month: 'long',
  day: 'numeric',
  // hour: 'numeric',
  // minute: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
};
const currentDate = date.toLocaleDateString('en-US', options);

const currentDay = document.querySelector('.date');
currentDay.innerText = currentDate;
