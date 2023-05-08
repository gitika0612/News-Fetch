// All News
const NEWS_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json';
const NEWS_API_KEY = 'vtFKOb7fxGvFfzHmKEnuNoLGcAqHuU1n'

const getAllNews = async () => {
  const output = document.getElementById("output");
  output.innerHTML = 'Loading...'
  //Fetch all query news
  const response = await fetch(`${NEWS_URL}?api-key=${NEWS_API_KEY}`);
  if (response.status === 200) {
     // Hide Loading and prepare data to display
    const { results } = await response.json();
    output.innerHTML = '';
    displayAllNews(results);
  } else {
     // Handle Error
    output.innerHTML = "<h5>No data found.</h5>"
    return;
  }
}

function displayAllNews(news) {
  for (const el of news) {
    const output = document.getElementById("output");

    try {
      output.innerHTML += `
      <div class="card" style='width: 18rem; margin-bottom: 20px; margin-top: 20px; margin-left: 1rem; '>
        <img class="card-img-top" src="${el["media"][0]["media-metadata"][2].url}" alt="${el["media"][0].caption}" title="${el["media"][0].caption}" />
        <div class="card-body">
        <h5 class="card-title">${el.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${el.section} - ${el.subsection}</h6>
        <p class="card-text">${el.abstract}</p>
        <p>Published: ${el.published_date}</p>
        </div>
      </div>
      `;
    } catch (err) {
      console.log(err);
    }
  }
}

getAllNews();



//search query news
const API_KEY = 'rXsjo1yiW6kX0jBBnFaHyxj8VV6b2blW';
const URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const output = document.getElementById('output');

searchBtn.addEventListener("click",function(){
  newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
  fetchQueryNews();
});


const fetchQueryNews = async () => {
  if(!newsQuery.value) {
    getAllNews();
    return;
  }
  const output = document.getElementById("output");
  //Fetch search query news
  const response = await fetch(`${URL}?q=${newsQuery.value}&api-key=${API_KEY}`);
  output.innerHTML = 'Loading...'
  if(response.status === 200) {
    // Hide Loading and prepare data to display
    const { response: searchData } = await response.json();
    output.innerHTML = '';
    displaySearchNews(searchData.docs);
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

function displaySearchNews(news) {
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





