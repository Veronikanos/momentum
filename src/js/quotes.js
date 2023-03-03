import quotesEn from '../utils/quotesEN';
import quotesRu from '../utils/quotesUA';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonQuote = document.querySelector('.change-quote');

export const putQuoteToMarkup = (randomQuoteNumber) => {
  const language = localStorage.getItem('lang');
  const allQuotes = language === 'en' ? quotesEn : quotesRu;
  const randomQuote = allQuotes[randomQuoteNumber];
  quote.textContent = randomQuote.text;
  author.textContent = randomQuote.author;
};

const getRandomQuote = () => {
  const randomQuoteNumber = Math.floor(
    Math.random() * quotesEn.length
  );

  localStorage.setItem('randomQuoteNumber', randomQuoteNumber);
  putQuoteToMarkup(randomQuoteNumber);
};

getRandomQuote();

buttonQuote.addEventListener('click', getRandomQuote);
