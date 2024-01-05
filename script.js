async function getRandomCurrencies() {
  try {
    const currentResponse = await fetch('https://api.coinlore.net/api/tickers/');
    const currentData = await currentResponse.json();
    const currencies = currentData.data;

    const currencyContainer = document.getElementById('currencyContainer');
    const existingCards = document.querySelectorAll('.currency-card');

    existingCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => card.remove(), 500);
    });

    const currencyCards = [];
    const selectedIndices = new Set();

    for (let i = 0; i < 5; i++) {
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * currencies.length);
      } while (selectedIndices.has(randomIndex));

      selectedIndices.add(randomIndex);

      let randomCurrency = currencies[randomIndex];
      let currentPrice = parseFloat(randomCurrency.price_usd);

      // Validate the currency immediately after receiving it
      if (currentPrice <= 0) {
        // Fetch another random currency if the price is 0 or less
        i--;
        continue;
      }

      const historicalResponse = await fetch(`https://api.coinlore.net/api/coin/markets/?id=${randomCurrency.id}&timeframe=24h`);
      const historicalData = await historicalResponse.json();

      let priceChangePercentage = '00.00';
      let color = '';

      if (historicalData.length >= 2 && parseFloat(historicalData[0].price_usd) !== 0) {
        const price24hAgo = parseFloat(historicalData[0].price_usd);
        const priceChange = currentPrice - price24hAgo;

        if (price24hAgo !== 0) {
          priceChangePercentage = ((priceChange / price24hAgo) * 100).toFixed(2);
        }
        

        color = priceChange < 0 ? 'rgb(253, 44, 44)' : 'rgb(76, 241, 0)';
      } else {
        // Fetch another random currency if historical data is insufficient or incorrect
        i--;
        continue;
      }

      const currencyCard = createCurrencyCard(randomCurrency, currentPrice, priceChangePercentage, color);
      currencyCards.push(currencyCard);
    }

    // Display currencies only if there are valid ones
    if (currencyCards.length > 0) {
      setTimeout(() => {
        currencyCards.forEach((card, index) => {
          currencyContainer.appendChild(card);
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }, 100);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function createCurrencyCard(currency, currentPrice, priceChangePercentage, color) {
  const currencyCard = document.createElement('div');
  currencyCard.classList.add('currency-card');

  const currencyName = document.createElement('h2');
  currencyName.classList.add('currency-name');
  currencyName.textContent = currency.name;

  const currencyPrice = document.createElement('p');
  currencyPrice.classList.add('currency-price');

  const currentPriceSpan = document.createElement('span');
  currentPriceSpan.textContent = `$${formatCurrencyPrice(currentPrice)}`;
  currencyPrice.appendChild(currentPriceSpan);

  const percentageChangeSpan = document.createElement('span');
  percentageChangeSpan.classList.add('change-price')
  percentageChangeSpan.textContent = ` ${priceChangePercentage}%`;
  percentageChangeSpan.style.color = color;

  currencyCard.appendChild(percentageChangeSpan);

  const currencyImage = document.createElement('img');
  currencyImage.classList.add('currency-img');
  currencyImage.src = `https://c1.coinlore.com/img/${currency.nameid}.png`;

  currencyCard.appendChild(currencyImage);
  currencyCard.appendChild(currencyName);
  currencyCard.appendChild(currencyPrice);

  return currencyCard;
}

function formatCurrencyPrice(price) {
  const formattedPrice = parseFloat(price).toFixed(8).replace(/\.?0+$/, '');
  return formattedPrice.length > 2 ? formattedPrice : '0.00';
}

setInterval(getRandomCurrencies, 9000);
getRandomCurrencies();

  const container = document.querySelector('.carousel-container');
    const pages = document.querySelectorAll('.carousel-page');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentPage = 1;
    const totalPages = pages.length;

    function showPage(page) {
      const transformValue = `translateX(-${(page - 1) * 100}%)`;
      container.style.transform = transformValue;
      currentPage = page;
      updateLines();
    }

    function updateLines() {
      
      line1.style.backgroundColor = currentPage === 1 ? '#ddd' : '#555';
      line2.style.backgroundColor = currentPage === 2 ? '#ddd' : '#555';
    }

    function nextPage() {
      currentPage = (currentPage % totalPages) + 1;
      showPage(currentPage);
    }

    function prevPage() {
      currentPage = (currentPage - 2 + totalPages) % totalPages + 1;
      showPage(currentPage);
    }

    function autoSlide() {
      nextPage();
    }

    // Attach event listeners
    nextButton.addEventListener('click', nextPage);
    prevButton.addEventListener('click', prevPage);

    // Set interval for auto slide
    setInterval(autoSlide, 10000);

    // Initial lines update
    updateLines();



  const mode = document.getElementById('dark-light');
  const changemod = document.getElementById('change-mode')
  const logo = document.querySelectorAll('.logos');
  mode.onclick = function(){
    document.body.classList.toggle('light');
    if(document.body.classList.contains('light')){
      
      logo.forEach(function(logo) {
        logo.src = 'images/logo left light.png'; // Replace with the path to your light mode image
    });
      changemod.classList = '';
      changemod.classList.add('bx','bx-moon');
    }else{
      
      logo.forEach(function(logo) {
        logo.src = 'images/logo left dark.png'; // Replace with the path to your dark mode image
    });
      changemod.classList.add('bx','bx-sun');
    }
    
  }

  

document.addEventListener('DOMContentLoaded', function(){


  document.querySelector('.header-right-side-active').addEventListener('click',function(){
    document.querySelector('.header-right-side').classList.add('show');
});
document.querySelector('.close-user-section').addEventListener('click',function(){
  document.querySelector('.header-right-side').classList.remove('show');
});
document.querySelector('.menu-active').addEventListener('click',function(){
  document.querySelector('.menu').classList.add('show');
});
document.querySelector('.close-menu').addEventListener('click',function(){
document.querySelector('.menu').classList.remove('show');
});



});

document.addEventListener('DOMContentLoaded', function () {
  const toggleSubMenus = document.querySelectorAll('.toggle-sub-menu');

  toggleSubMenus.forEach(toggleSubMenu => {
    toggleSubMenu.addEventListener('click', function () {
      this.querySelector('.sub-menu').classList.toggle('active');
    });
  });
});