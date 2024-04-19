//ui
const newsContainer = document.getElementById('newsWrap');

async function getNews() {
    return response = await fetch("https://api.escuelajs.co/api/v1/products"); 
}

function newsTemplate(item) {
    return `
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
    <div class="member">
      <img src="assets/img/news/afadadada.webp" class="img-fluid" alt="">
      <div class="member-content">
        <h4>${item.title}</h4>
      </div>
    </div>
  </div>`
}

const news = getNews();


function renderNews() {
    news
        .then(res => res.json())
        .then(items => {
            console.log(items);
            let fragment = '';
            for(let i = 0; i < 3; i++) {
                const domItem = newsTemplate(items[i]);
                fragment += domItem;
            }
            newsContainer.innerHTML = fragment;
        })
        .catch(err => console.log(err))
}
document.addEventListener('DOMContentLoaded', renderNews);