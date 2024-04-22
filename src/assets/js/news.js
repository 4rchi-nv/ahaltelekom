//ui
const newsContainer = document.querySelector('#news .swiper-wrapper');
const url = "http://localhost:80/";

async function getNews() {
    return response = await fetch(`${url}api/news`); 
}

function newsTemplate(item) {
    return `
    <div class="swiper-slide">
              <div class="align-items-stretch">
                <div class="member">
                  <img src="${item.image || url+'media/news/defPhoto.png'}" class="img-fluid" alt="">
                  <div class="member-content">
                    <h4>${item.name}</h4>
                  </div>
                </div>
              </div>
            </div>`
}

const news = getNews();


function renderNews() {
    news
        .then(res => res.json())
        .then(items => {
            if (!items.length) {
              return;
            }
            let fragment = '';
            // for(let i = 0; i < 3; i++) {
            //     const domItem = newsTemplate(items[i]);
            //     fragment += domItem;
            // }
            items.forEach(element => {
              const card = newsTemplate(element);
              fragment += card;
            });
            newsContainer.innerHTML = fragment;
        })
        .catch(err => console.log(err))
}
document.addEventListener('DOMContentLoaded', renderNews);