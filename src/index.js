
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
// const menuSwiperSlide = document.querySelector(".menuSwiper").menuSwiper;

swiperSlide.slideNext();

// 4) swipWrap_end

// 5) menuWrap_start

// 5) menuWrap_end

// 6) contentsWrap_start

// 6) contentsWrap_end

// 7) contentsBox_start

const modal = document.getElementById("myModal");

// 모달을 닫는 <span> 요소를 가져옵니다
const span = document.getElementsByClassName("close")[0];

// 검색 버튼에 이벤트 리스너 추가
document.getElementById("searchBtn").onclick = function() {
const searchValue = document.getElementById("searchInput").value;
document.getElementById("searchTerm").innerText = searchValue;
modal.style.display = "block";
}

// <span> (x)를 클릭하면 모달을 닫습니다
span.onclick = function() {
modal.style.display = "none";
}

// 모달 외부를 클릭하면 모달을 닫습니다
window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
}
}
const container = document.getElementById('map');

const options = {
	center: new kakao.maps.LatLng(37.539716, 126.851020), //지도의 중심좌표.
	level: 4
};

const map = new kakao.maps.Map(container, options);
// 7) contentsBox_end

// 8) botBoxWrap_start

// 8) botBoxWrap_end
