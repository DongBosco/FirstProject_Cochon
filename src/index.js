
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
// =========================map================================ 
var markers = [];
var searchBtnEl = document.getElementById("searchBtn")

const container = document.getElementById('map');

const options = {
	center: new kakao.maps.LatLng(37.539716, 126.851020), //지도의 중심좌표.
	level: 4
};

const map = new kakao.maps.Map(container, options);

var ps = new kakao.maps.services.Places();
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

function searchPlaces() {       
  var keyword = document.getElementById('searchInput').value+" 교촌치킨";      
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
      }
      console.log(keyword)

    var searchOptions= {
      size : 5,
    }
    document.getElementById("searchTerm").innerText = keyword;
    ps.keywordSearch( keyword, placesSearchCB, searchOptions); 
    }

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

function displayPlaces(places) {
        
  var listEl = document.getElementById('placesList'), 
  menuEl = document.getElementById('menu_wrap'),
  fragment = document.createDocumentFragment(), 
  bounds = new kakao.maps.LatLngBounds(), 
  listStr = '';

  removeAllChildNods(listEl);

  removeMarker();
  
  for ( var i=0; i<places.length; i++ ) {

      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          // marker = addMarker(placePosition, i), 
          itemEl = getListItem(i, places[i]); 
          
      bounds.extend(placePosition);

      // (function(marker, title) {
      //     kakao.maps.event.addListener(marker, 'mouseover', function() {
      //         displayInfowindow(marker, title);
      //     });

      //     kakao.maps.event.addListener(marker, 'mouseout', function() {
      //         infowindow.close();
      //     });

      //     itemEl.onmouseover =  function () {
      //         displayInfowindow(marker, title);
      //     };

      //     itemEl.onmouseout =  function () {
      //         infowindow.close();
      //     };
      // })(marker, places[i].place_name);

      fragment.appendChild(itemEl);
  }

  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  map.setBounds(bounds);
}

function getListItem(index, places) {

  var el = document.createElement('li'),
  itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
              '<div class="info">' +
              '   <h5 id="btn_'+places.place_id+'">' + places.place_name + '</h5>';

  if (places.road_address_name) {
      itemStr += '    <span>' + places.road_address_name + '</span>' +
                  '   <span class="jibun gray">' +  places.address_name  + '</span>';
  } else {
      itemStr += '    <span>' +  places.address_name  + '</span>'; 
  }
               
    itemStr += '  <span class="tel">' + places.phone  + '</span>' +
              '</div>';           

  el.innerHTML = itemStr;
  el.className = 'item';

  return el;
}

// 
// function addMarker(position, idx, title) {
//   var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//       imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
//       imgOptions =  {
//           spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//           spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//           offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//       },
//       markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//           marker = new kakao.maps.Marker({
//           position: position, // 마커의 위치
//           image: markerImage 
//       });

//   marker.setMap(map); // 지도 위에 마커를 표출합니다
//   markers.push(marker);  // 배열에 생성된 마커를 추가합니다

//   return marker;
// }

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for ( var i = 0; i < markers.length; i++ ) {
      markers[i].setMap(null);
  }   
  markers = [];
}

function displayPagination(pagination) {
  var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i; 

  while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild (paginationEl.lastChild);
  }

  for (i=1; i<=pagination.last; i++) {
      var el = document.createElement('a');
      el.href = "#";
      el.innerHTML = i;

      if (i===pagination.current) {
          el.className = 'on';
      } else {
          el.onclick = (function(i) {
              return function() {
                  pagination.gotoPage(i);
              }
          })(i);
      }

      fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

  infowindow.setContent(content);
  infowindow.open(map, marker);
}

function removeAllChildNods(el) {   
  while (el.hasChildNodes()) {
      el.removeChild (el.lastChild);
  }
}
// =========================modal



const modal = document.getElementById("myModal");

// 모달을 닫는 <span> 요소를 가져옵니다
const span = document.getElementsByClassName("close")[0];

// 검색 버튼에 이벤트 리스너 추가
$(".searchBtn").on('click', searchPlaces)

$(document).on('click', '[id^=btn_]' ,()=>{  
  modal.style.display = "block";
})

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

// 7) contentsBox_end

// 8) botBoxWrap_start

// 8) botBoxWrap_end
