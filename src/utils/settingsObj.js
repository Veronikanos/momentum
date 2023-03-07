const settingsObj = [
  {
    title: 'language',
    icon: 'fa-language',
    options: ['Eng', 'Ukr'],
    id: ['en', 'ua'],
  },
  {
    title: 'weather',
    icon: 'fa-cloud-sun',
    options: ['On', 'Off'],
    id: ['weatherOn', 'weatherOff'],
  },
  {
    title: 'player',
    icon: 'fa-circle-play',
    options: ['On', 'Off'],
    id: ['playerOn', 'playerOff'],
  },
  {
    title: 'date',
    icon: 'fa-calendar-days',
    options: ['On', 'Off'],
    id: ['dateOn', 'dateOff'],
  },
  {
    title: 'time',
    icon: 'fa-clock',
    options: ['On', 'Off'],
    id: ['timeOn', 'timeOff'],
  },
  {
    title: 'quote',
    icon: 'fa-quote-left',
    options: ['On', 'Off'],
    id: ['quoteOn', 'quoteOff'],
  },
  {
    title: 'greeting',
    icon: 'fa-handshake',
    options: ['On', 'Off'],
    id: ['greetingOn', 'greetingOff'],
  },
];

export const settingsImagesObj = [
  {
    title: 'Standard Image',
    name: 'bg',
    id: 'standard',
  },
  {
    title: 'Flickr Image',
    name: 'bg',
    id: 'flickr',
  },
];

export const settingsClockObj = [
  {
    title: 'Analog clock',
    name: 'clock',
    id: 'analog',
  },
  {
    title: 'Numeric clock',
    name: 'clock',
    id: 'numeric',
  },
];

export default settingsObj;
