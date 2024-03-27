const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  // Pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const menuSwiper = new Swiper(".menu-swiper", {
  slidesPerView: 3,
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  // Pagination
  pagination: {
    el: ".swiper-pagination.menu",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next.menuLeft",
    prevEl: ".swiper-button-prev.menuRight",
  },
});

const swiperSlide = document.querySelector(".swiper").swiper;
const menuSwiperSlide = document.querySelector(".menuSwiper").menuSwiper;

swiperSlide.slideNext();
