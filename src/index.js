// 1) Header_start

// 1) Header_end

// 2) nav_start

// 2) nav_end

// 3) Body_start

// 3) Body_end

// 4) swipWrap_start

const swiper = new Swiper(".swipWrap", {
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
    // swiper-pagination-bullet is the default value already
    // bulletClass: `swiper-pagination-bullet`,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperSlide = document.querySelector(".swipWrap").swiper;
const menuSwiperSlide = document.querySelector(".menuSwiper").menuSwiper;

swiperSlide.slideNext();

// 4) swipWrap_end

// 5) menuWrap_start

// 5) menuWrap_end

// 6) contentsWrap_start

// 6) contentsWrap_end

// 7) contentsBox_start

// 7) contentsBox_end

// 8) botBoxWrap_start

// 8) botBoxWrap_end
