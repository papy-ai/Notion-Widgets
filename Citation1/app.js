// Fetches a random quote from the quotes.json file and displays it
async function displayRandomQuote() {
    try {
      const response = await fetch('quotes.json');
      const quotes = await response.json();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quoteElement = document.getElementById('quote');
  
      quoteElement.textContent = quotes[randomIndex];
    } catch (error) {
      console.error('Error fetching the quotes:', error);
      document.getElementById('quote').textContent = 'Failed to load quote.';
    }
  }
  
  displayRandomQuote();
  