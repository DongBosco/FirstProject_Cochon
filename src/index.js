var userGeoInfo =[{y: ""},{x:""}]
var flag=false;
$(()=>{
  navigator.geolocation.getCurrentPosition((position) => {
    if(userGeoInfo.y){
      userGeoInfo.y = position.coords.latitude, 
      userGeoInfo.x = position.coords.longitude
      flag=true
      console.log("주소를 받는데 성공 하였습니다.")
    }         
    console.log("주소를 받는데 실패 하였습니다.")
  })
});

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
var searchResultData;
var ps = new kakao.maps.services.Places();

function searchPlaces() {       
  var keyword = document.getElementById('searchInput').value+" 교촌치킨";      
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
      }
      console.log(keyword)

    var searchOptions= {
      size : 5,
      if(userGeoInfo){
        location: new kakao.maps.LatLng(userGeoInfo.y, userGeoInfo.x)
      }     
    }
    document.getElementById("searchTerm").innerText = keyword;
    ps.keywordSearch( keyword, placesSearchCB, searchOptions); 
  }

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        searchResultData = data;
        displayPlaces(data);
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
  listStr = '';

  removeAllChildNods(listEl);
  
  for ( var i=0; i<places.length; i++ ) {

      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),

          itemEl = getListItem(i, places[i]); 
          
      fragment.appendChild(itemEl);
  }

  listEl.appendChild(fragment);
}

function getListItem(index, places) {  
  var el = document.createElement('li'),
  itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
              '<div class="info">' +
              '   <strong id="btn_'+index+'">' + places.place_name + '</strong>';  
  el.innerHTML = itemStr;
  el.className = 'item';

  return el;
}

function displayPagination(pagination) {
  var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i; 

  while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild (paginationEl.lastChild);
  }
  if(pagination.last>3){
    pagination.last=3;
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

function removeAllChildNods(el) {   
  while (el.hasChildNodes()) {
      el.removeChild (el.lastChild);
  }
}

function createMap(idx){
  const container = document.getElementById('map');  
  const options = {
	  center: new kakao.maps.LatLng(searchResultData[idx].y, searchResultData[idx].x),
    level:3
  };

  var map = new kakao.maps.Map(container, options);
  
  var marker = new kakao.maps.Marker({
      map: map,
      position: options.center
  })
if (searchResultData[idx].road_address_name) {
  var infowindow = new kakao.maps.InfoWindow({
    content: '<div style="width:150px;text-align:center;padding:6px 0;">'+ searchResultData[idx].place_name+'</div>'
})};
infowindow.open(map, marker);
}


// function createResult(idx){

//   var resEl = document.getElementById('searchResInfo'),
//   itemEl = getResultItem(idx); 
//   fragment = document.createDocumentFragment(), 
//   listStr = '';

//   // removeAllChildNods(resEl);
          
//   fragment.appendChild(itemEl);  

//   resEl.appendChild(fragment);
// }

// function getResultItem(idx){
//     var tempStr = '';
//     var resEl= document.createElement('li');
//     var searchRes = document.getElementById("searchResInfo");
//     tempStr = '<div class="info">' + '<h5>' + searchResultData[idx].place_name + '</h5>';
//     if (searchResultData[idx].road_address_name) {
//       tempStr += '   <div class="resTemp"> <span class="resRoadAddressName" >' + searchResultData[idx].road_address_name + '</span>' +
//                   '   <span class="resAddressName">' +  searchResultData[idx].address_name  + '</span>';
//     } else {
//     tempStr += '    <span>' +  searchResultData[idx].address_name  + '</span>'; 
//     } 
//     if(searchResultData[idx].phone) {          
//       tempStr += '  <span class="tel">' + 
//       searchResultData[idx].phone  + 
//       '</span>' +'</div>'; }
  
//     resEl.innerHTML = tempStr;
//     return resEl
//   }



// =========================modal



const modal = document.getElementById("myModal");

const span = document.getElementsByClassName("close")[0];

$(".searchBtn").on('click', searchPlaces)
$("#searchInput").on('keyup', (key)=>{
  if(key.keyCode ==13){
    searchPlaces()
  }
})


$(document).on('click', '[id^=btn_]' ,function(){  
  modal.style.display = "block";
  var originalString = $(this).attr("id");
  var indexOfResult = originalString.replace('btn_', '');
  createMap(indexOfResult);
  createResult(indexOfResult);
})

span.onclick = function() {
modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
}
}

// 7) contentsBox_end

// 8) botBoxWrap_start

// 8) botBoxWrap_end