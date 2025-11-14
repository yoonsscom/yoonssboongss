// 전역 변수
let map;
let markers = [];
let filteredStores = [...stores];
let currentPosition = null;

// DOM 요소
const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnCurrentLocation = document.getElementById('btnCurrentLocation');
const tabMap = document.getElementById('tabMap');
const tabList = document.getElementById('tabList');
const mapContainer = document.getElementById('mapContainer');
const listContainer = document.getElementById('listContainer');
const storeList = document.getElementById('storeList');
const storeCount = document.getElementById('storeCount');
const sortSelect = document.getElementById('sortSelect');
const storeModal = document.getElementById('storeModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const loading = document.getElementById('loading');

// 등록된 가게들의 중심점 계산
function calculateStoresCenter() {
    if (stores.length === 0) {
        // 가게가 없으면 기본 위치 (서울시청)
        return new naver.maps.LatLng(37.5665, 126.9780);
    }
    
    // 모든 가게의 위도, 경도 평균 계산
    let sumLat = 0;
    let sumLng = 0;
    
    stores.forEach(store => {
        sumLat += store.lat;
        sumLng += store.lng;
    });
    
    const avgLat = sumLat / stores.length;
    const avgLng = sumLng / stores.length;
    
    return new naver.maps.LatLng(avgLat, avgLng);
}

// 네이버 지도 초기화
function initMap() {
    // 등록된 가게들의 중심점으로 지도 초기화
    const centerPosition = calculateStoresCenter();
    
    const mapOptions = {
        center: centerPosition,
        zoom: stores.length === 1 ? 15 : 13, // 가게가 1개면 더 확대
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
        }
    };
    
    map = new naver.maps.Map('map', mapOptions);
    
    // 가게 마커 표시
    displayStoresOnMap();
    
    // 목록 업데이트
    updateStoreList();
}

// 지도에 가게 마커 표시
function displayStoresOnMap() {
    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    // 새 마커 추가
    filteredStores.forEach(store => {
        const position = new naver.maps.LatLng(store.lat, store.lng);
        
        const marker = new naver.maps.Marker({
            position: position,
            map: map,
            title: store.name,
            icon: {
                content: `<div style="background: #667eea; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; white-space: nowrap;">${store.name}</div>`,
                anchor: new naver.maps.Point(0, 0)
            }
        });
        
        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', () => {
            showStoreDetail(store);
        });
        
        markers.push(marker);
    });
}

// 가게 목록 업데이트
function updateStoreList() {
    storeList.innerHTML = '';
    storeCount.textContent = `총 ${filteredStores.length}개`;
    
    if (filteredStores.length === 0) {
        storeList.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">검색 결과가 없습니다.</div>';
        return;
    }
    
    filteredStores.forEach(store => {
        const card = createStoreCard(store);
        storeList.appendChild(card);
    });
}

// 가게 카드 생성
function createStoreCard(store) {
    const card = document.createElement('div');
    card.className = 'store-card';
    
    let distanceText = '';
    if (currentPosition) {
        const distance = calculateDistance(
            currentPosition.lat,
            currentPosition.lng,
            store.lat,
            store.lng
        );
        distanceText = `<div class="store-distance">📍 ${distance.toFixed(1)}km</div>`;
    }
    
    card.innerHTML = `
        <div class="store-name">${store.name}</div>
        <div class="store-address">${store.address}</div>
        ${distanceText}
    `;
    
    card.addEventListener('click', () => {
        showStoreDetail(store);
    });
    
    return card;
}

// 가게 상세 정보 표시
function showStoreDetail(store) {
    const menuHtml = store.menu.map(item => `
        <div class="menu-item">
            <span class="menu-name">${item.name}</span>
            <span class="menu-price">${item.price.toLocaleString()}원</span>
        </div>
    `).join('');
    
    modalBody.innerHTML = `
        <img src="${store.image}" alt="${store.name}" class="store-detail-image" onerror="this.src='https://via.placeholder.com/400x200?text=이미지'">
        <div class="store-detail-name">${store.name}</div>
        <div class="store-detail-info">
            <span class="store-detail-info-icon">📍</span>
            <span>${store.address}</span>
        </div>
        <div class="store-detail-info">
            <span class="store-detail-info-icon">📞</span>
            <span>${store.phone}</span>
        </div>
        <div class="store-detail-info">
            <span class="store-detail-info-icon">🕐</span>
            <span>영업시간: ${store.hours.open} - ${store.hours.close}</span>
        </div>
        <div class="store-detail-section">
            <div class="store-detail-section-title">메뉴</div>
            ${menuHtml}
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn-map-view" onclick="showStoreOnMap(${store.id})" style="flex: 1;">지도에서 보기</button>
            <button class="btn-navigation" onclick="openNavigation(${store.id})" style="flex: 1; background: #4CAF50;">🚗 길찾기</button>
        </div>
    `;
    
    storeModal.classList.add('active');
}

// 지도에서 가게 보기
function showStoreOnMap(storeId) {
    const store = stores.find(s => s.id === storeId);
    if (!store) return;
    
    // 모달 닫기
    storeModal.classList.remove('active');
    
    // 지도 탭으로 전환
    tabMap.click();
    
    // 지도 중심 이동
    const position = new naver.maps.LatLng(store.lat, store.lng);
    map.setCenter(position);
    map.setZoom(16);
    
    // 해당 마커 찾아서 클릭 효과
    setTimeout(() => {
        const marker = markers.find(m => {
            const pos = m.getPosition();
            return Math.abs(pos.lat() - store.lat) < 0.0001 && 
                   Math.abs(pos.lng() - store.lng) < 0.0001;
        });
        if (marker) {
            naver.maps.Event.trigger(marker, 'click');
        }
    }, 300);
}

// 모바일 기기 감지
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 네이버 지도 길찾기 열기
function openNavigation(storeId) {
    const store = stores.find(s => s.id === storeId);
    if (!store) return;
    
    // 네이버 지도 길찾기 URL 형식: /p/directions/출발지/도착지/-/transit
    // 도착지 형식: 경도,위도,주소(URL인코딩),,ADDRESS_POI
    let endParam;
    
    if (store.address && store.address.trim() !== '') {
        // 좌표와 주소를 함께 사용 (경도,위도,주소,,ADDRESS_POI)
        // 주의: 경도가 먼저 오고, 위도가 나중에 옴
        endParam = `${store.lng},${store.lat},${encodeURIComponent(store.address)},,ADDRESS_POI`;
    } else {
        // 주소가 없으면 좌표와 이름만 사용
        endParam = `${store.lng},${store.lat},${encodeURIComponent(store.name)},,ADDRESS_POI`;
    }
    
    // 네이버 지도 길찾기 URL 생성
    // 형식: https://map.naver.com/p/directions/-/경도,위도,주소,,ADDRESS_POI/-/transit?c=15.00,0,0,0,dh
    const navUrl = `https://map.naver.com/p/directions/-/${endParam}/-/transit?c=15.00,0,0,0,dh`;
    
    // 모바일에서는 현재 창에서 열기, 데스크톱에서는 새 창에서 열기
    if (isMobile()) {
        // 모바일: 현재 창에서 이동 (팝업 차단 방지)
        window.location.href = navUrl;
    } else {
        // 데스크톱: 새 창에서 열기
        window.open(navUrl, '_blank');
    }
}

// 거리 계산 (Haversine 공식)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// 검색 기능
function searchStores(query) {
    if (!query || query.trim() === '') {
        filteredStores = [...stores];
    } else {
        const lowerQuery = query.toLowerCase();
        filteredStores = stores.filter(store => 
            store.name.toLowerCase().includes(lowerQuery) ||
            store.address.toLowerCase().includes(lowerQuery)
        );
    }
    
    // 정렬 적용
    sortStores();
    
    // 지도 및 목록 업데이트
    displayStoresOnMap();
    updateStoreList();
}

// 정렬 기능
function sortStores() {
    const sortType = sortSelect.value;
    
    if (sortType === 'distance' && currentPosition) {
        filteredStores.sort((a, b) => {
            const distA = calculateDistance(
                currentPosition.lat,
                currentPosition.lng,
                a.lat,
                a.lng
            );
            const distB = calculateDistance(
                currentPosition.lat,
                currentPosition.lng,
                b.lat,
                b.lng
            );
            return distA - distB;
        });
    } else if (sortType === 'name') {
        filteredStores.sort((a, b) => a.name.localeCompare(b.name));
    }
}

// 현재 위치 가져오기
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
        return;
    }
    
    loading.classList.remove('hidden');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            // 지도 중심 이동
            const mapPosition = new naver.maps.LatLng(
                currentPosition.lat,
                currentPosition.lng
            );
            map.setCenter(mapPosition);
            map.setZoom(15);
            
            // 목록 업데이트 (거리순 정렬)
            if (sortSelect.value === 'distance') {
                sortStores();
                updateStoreList();
            }
            
            loading.classList.add('hidden');
        },
        (error) => {
            loading.classList.add('hidden');
            alert('위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
            console.error('위치 오류:', error);
        }
    );
}

// 이벤트 리스너
btnSearch.addEventListener('click', () => {
    searchStores(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchStores(searchInput.value);
    }
});

btnCurrentLocation.addEventListener('click', getCurrentLocation);

tabMap.addEventListener('click', () => {
    tabMap.classList.add('active');
    tabList.classList.remove('active');
    mapContainer.classList.add('active');
    listContainer.classList.remove('active');
});

tabList.addEventListener('click', () => {
    tabList.classList.add('active');
    tabMap.classList.remove('active');
    listContainer.classList.add('active');
    mapContainer.classList.remove('active');
});

sortSelect.addEventListener('change', () => {
    sortStores();
    updateStoreList();
});

modalClose.addEventListener('click', () => {
    storeModal.classList.remove('active');
});

storeModal.addEventListener('click', (e) => {
    if (e.target === storeModal) {
        storeModal.classList.remove('active');
    }
});

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof naver !== 'undefined' && naver.maps) {
            try {
                initMap();
                console.log('✅ 네이버 지도 초기화 성공');
            } catch (error) {
                console.error('❌ 지도 초기화 오류:', error);
                alert('지도를 초기화하는 중 오류가 발생했습니다. 콘솔을 확인해주세요.');
            }
        } else {
            const errorMsg = '네이버 지도 API를 로드할 수 없습니다.\n\n확인 사항:\n1. Client ID가 올바르게 설정되었는지\n2. Web 서비스 URL이 등록되었는지\n3. Application이 활성화되어 있는지';
            console.error('❌ 네이버 지도 API 로드 실패');
            console.error('확인 사항:', errorMsg);
            alert(errorMsg + '\n\n자세한 내용은 브라우저 콘솔(F12)을 확인해주세요.');
        }
    }, 100);
});

