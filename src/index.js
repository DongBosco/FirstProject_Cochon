const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 5000,
  },
});

const swiperSlide = document.querySelector(".swiper").swiper;

swiperSlide.slideNext();
