const API_KEY = 'rXsjo1yiW6kX0jBBnFaHyxj8VV6b2blW';
const URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const fetchRecentNews = async () => {
    const output = document.getElementById("output");
    
    const today = new Date();
    const twoDaysAgo = new Date(today.setDate(today.getDate() - 2));

    // Date Format - YYYYMMDD
    const formattedBeginDate = `${twoDaysAgo.getFullYear()}${twoDaysAgo.toLocaleString('default', { month: '2-digit' })}${twoDaysAgo.toLocaleString('default', { day: '2-digit' })}`

    output.innerHTML = 'Loading...'

    // Fetch recent (past 2 days) news
    const response = await fetch(`${URL}?begin_date=${formattedBeginDate}&api-key=${API_KEY}`);
    if(response.status === 200) {
      // Hide Loading and prepare data to display
        const { response: recentNewsResponse } = await response.json();
        output.innerHTML = '';
        displayRecentNews(recentNewsResponse.docs);
    } else {
      // Handle Error
      output.innerHTML = "<h5>No data found.</h5>"
      return;
    }
}

// returns formatted date - YYYY-MM-DD
function formatPublishedDate(date) {
  const dateToFormat = new Date(date);
  return `${dateToFormat.getFullYear()}-${dateToFormat.toLocaleString('default', { month: '2-digit' })}-${dateToFormat.toLocaleString('default', { day: '2-digit' })}`
}

function displayRecentNews(news) {
  for (const el of news) {
    const output = document.getElementById("output");
    try {
      output.innerHTML += `
        <div class="card" style='width: 18rem; margin-bottom: 20px; margin-top: 20px; margin-left: 1rem; '>
            <img class="card-img-top" src="https://static01.nyt.com/${el.multimedia[0].url}" />
            <div class="card-body">
                <h5 class="card-title">${el.headline.main}</h5>
                <p class="card-text">${el.abstract}</p>
                <p>Published: ${formatPublishedDate(el.pub_date)}</p>
            </div>
        </div>
      `;
    } catch (err) {
      console.log(err);
    }
  }
}

fetchRecentNews();
