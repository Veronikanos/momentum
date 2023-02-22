const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonQuote = document.querySelector('.change-quote');

const getQuotes = () => {
  const quotes = '../assets/quotes.json';
  return fetch(quotes)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const getRandomQuote = async () => {
  try {
    const allQuotes = await getQuotes();
    const randomQuoteNumber = Math.floor(
      Math.random() * allQuotes.length - 1
    );
    const randomQuote = allQuotes[randomQuoteNumber];
    quote.textContent = randomQuote.text;
    author.textContent = randomQuote.author;
  } catch (error) {
    alert('Can not get quotes');
  }
};

getRandomQuote();

buttonQuote.addEventListener('click', getRandomQuote);
