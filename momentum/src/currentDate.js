export const putDate = () => {
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    // timeZone: 'UTC',
  };
  const weekEn = [
    'Sunday',
    'Monday',
    'Thursday',
    'Wednesday',
    'Thirsday',
    'Friday',
    'Saturday',
  ];

  const weekRu = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

  const currentDay = document.querySelector('.date');
  const currentWeekDay = date.getDay();
  let currentDate = '';
  if (localStorage.getItem('lang') === 'ru') {
    currentDate = date.toLocaleDateString('ru-RU', options);
    currentDay.innerText = `${weekRu[currentWeekDay]}, ${currentDate}`;
  } else {
    currentDate = date.toLocaleDateString('en-US', options);
    currentDay.innerText = `${weekEn[currentWeekDay]}, ${currentDate}`;
  }
};

putDate();
