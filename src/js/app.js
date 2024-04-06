import '../assets/css/style.css';
import './plugins/index';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import imgs from './plugins/file-loader';
import { Axios } from 'axios';

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  document.querySelector('.logo img').src = `${imgs}/telecom-logo.png`;
  const wrapperSwiper = document.querySelector('.swiper-wrapper');
  async function Imgloader() {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    console.log(response);
    return response.json();
  }
  Imgloader()
  .then(
    res => {
      res.forEach(
        el => {
          const child = document.createElement('div');
          child.classList.add('swiper-slide')
          child.innerHTML = `
          <div class="partner-wrap">
            <div class="partner-item">
              <img src="${el.images[0]}" class="partner-img" alt="">
            </div>
        </div>
          `;
          wrapperSwiper.appendChild(child);
        }
      )
    }
  );

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * partners slider
   */
  new Swiper('.partners-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      650: {
        slidesPerView: 3,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  // window.addEventListener('load', () => {
  //   AOS.init({
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false
  //   })
  // });

})()