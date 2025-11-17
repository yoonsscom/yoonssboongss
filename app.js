// 전역 변수
let map;
let markers = [];
let allStores = []; // data.js + LocalStorage 통합 데이터
let filteredStores = [];
let currentPosition = null;
let currentLocationMarker = null; // 현재 위치 마커
let watchPositionId = null; // 위치 추적 ID (중지 시 사용)
let isTrackingLocation = false; // 위치 추적 중인지 여부

// 관리자 모드 변수
let isAdminMode = false;
let isMapCoordinateMode = false; // 지도 좌표 선택 모드
let coordinateModeMarker = null; // 좌표 선택 마커

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

// 관리자 모드 DOM 요소
const adminPanel = document.getElementById('adminPanel');
const adminClose = document.getElementById('adminClose');
const btnAddStore = document.getElementById('btnAddStore');
const btnExportData = document.getElementById('btnExportData');
const btnImportData = document.getElementById('btnImportData');
const fileInput = document.getElementById('fileInput');
const adminStoresList = document.getElementById('adminStoresList');
const storeEditModal = document.getElementById('storeEditModal');
const storeEditClose = document.getElementById('storeEditClose');
const storeEditForm = document.getElementById('storeEditForm');
const btnMapSelect = document.getElementById('btnMapSelect');
const btnAddMenu = document.getElementById('btnAddMenu');
const menuList = document.getElementById('menuList');
const btnCancelEdit = document.getElementById('btnCancelEdit');
const logo = document.querySelector('.logo');

// LocalStorage에서 가게 데이터 로드
function loadStoresFromLocalStorage() {
    try {
        const saved = localStorage.getItem('bongssStores');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('LocalStorage 로드 오류:', e);
        return [];
    }
}

// LocalStorage에 가게 데이터 저장
function saveStoresToLocalStorage(customStores) {
    try {
        localStorage.setItem('bongssStores', JSON.stringify(customStores));
        return true;
    } catch (e) {
        console.error('LocalStorage 저장 오류:', e);
        alert('데이터 저장에 실패했습니다.');
        return false;
    }
}

// data.js와 LocalStorage 데이터 통합
function loadAllStores() {
    const defaultStores = typeof stores !== 'undefined' ? stores : [];
    const customStores = loadStoresFromLocalStorage();
    
    // ID 충돌 방지: LocalStorage 데이터는 10000 이상 ID 사용
    const maxDefaultId = defaultStores.length > 0 
        ? Math.max(...defaultStores.map(s => s.id || 0))
        : 0;
    
    const adjustedCustomStores = customStores.map((store, index) => ({
        ...store,
        id: store.id >= 10000 ? store.id : maxDefaultId + 10000 + index
    }));
    
    allStores = [...defaultStores, ...adjustedCustomStores];
    filteredStores = [...allStores];
    
    return allStores;
}

// 등록된 가게들의 중심점 계산
function calculateStoresCenter() {
    if (allStores.length === 0) {
        // 가게가 없으면 기본 위치 (서울시청)
        return new naver.maps.LatLng(37.5665, 126.9780);
    }
    
    // 모든 가게의 위도, 경도 평균 계산
    let sumLat = 0;
    let sumLng = 0;
    
    allStores.forEach(store => {
        sumLat += store.lat;
        sumLng += store.lng;
    });
    
    const avgLat = sumLat / allStores.length;
    const avgLng = sumLng / allStores.length;
    
    return new naver.maps.LatLng(avgLat, avgLng);
}

// 네이버 지도 초기화
function initMap() {
    // 등록된 가게들의 중심점으로 지도 초기화
    const centerPosition = calculateStoresCenter();
    
    const mapOptions = {
        center: centerPosition,
        zoom: allStores.length === 1 ? 15 : 13, // 가게가 1개면 더 확대
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
        }
    };
    
    map = new naver.maps.Map('map', mapOptions);
    
    // 지도 클릭 이벤트 (좌표 선택 모드일 때)
    naver.maps.Event.addListener(map, 'click', (e) => {
        if (isMapCoordinateMode) {
            const lat = e.coord.lat();
            const lng = e.coord.lng();
            
            document.getElementById('editStoreLat').value = lat.toFixed(6);
            document.getElementById('editStoreLng').value = lng.toFixed(6);
            
            // 마커 표시
            if (coordinateModeMarker) {
                coordinateModeMarker.setPosition(e.coord);
            } else {
                coordinateModeMarker = new naver.maps.Marker({
                    position: e.coord,
                    map: map,
                    icon: {
                        content: '<div style="width: 20px; height: 20px; background: #4CAF50; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                        anchor: new naver.maps.Point(10, 10)
                    },
                    zIndex: 2000
                });
            }
            
            // 좌표 선택 모드 종료
            exitMapCoordinateMode();
        }
    });
    
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
    const store = allStores.find(s => s.id === storeId);
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
    const store = allStores.find(s => s.id === storeId);
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
        filteredStores = [...allStores];
    } else {
        const lowerQuery = query.toLowerCase();
        filteredStores = allStores.filter(store => 
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

// 현재 위치 마커 표시/업데이트
function updateCurrentLocationMarker(lat, lng) {
    const position = new naver.maps.LatLng(lat, lng);
    
    if (currentLocationMarker) {
        // 기존 마커가 있으면 위치만 업데이트
        currentLocationMarker.setPosition(position);
    } else {
        // 새 마커 생성
        currentLocationMarker = new naver.maps.Marker({
            position: position,
            map: map,
            icon: {
                content: '<div style="width: 20px; height: 20px; background: #4285F4; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                anchor: new naver.maps.Point(10, 10)
            },
            zIndex: 1000 // 다른 마커보다 위에 표시
        });
    }
}

// 위치 추적 중지
function stopLocationTracking() {
    if (watchPositionId !== null) {
        navigator.geolocation.clearWatch(watchPositionId);
        watchPositionId = null;
        isTrackingLocation = false;
        btnCurrentLocation.classList.remove('tracking');
        btnCurrentLocation.title = '현재 위치';
    }
}

// 실시간 위치 추적 시작
function startLocationTracking() {
    if (!navigator.geolocation) {
        alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
        return;
    }
    
    if (isTrackingLocation) {
        // 이미 추적 중이면 중지
        stopLocationTracking();
        return;
    }
    
    loading.classList.remove('hidden');
    isTrackingLocation = true;
    btnCurrentLocation.classList.add('tracking');
    btnCurrentLocation.title = '위치 추적 중 (클릭하여 중지)';
    
    // 먼저 현재 위치 한 번 가져오기
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            currentPosition = { lat, lng };
            
            // 현재 위치 마커 표시
            updateCurrentLocationMarker(lat, lng);
            
            // 지도 중심 이동
            const mapPosition = new naver.maps.LatLng(lat, lng);
            map.setCenter(mapPosition);
            map.setZoom(15);
            
            // 목록 업데이트 (거리순 정렬)
            if (sortSelect.value === 'distance') {
                sortStores();
                updateStoreList();
            }
            
            loading.classList.add('hidden');
            
            // 실시간 추적 시작
            watchPositionId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLat = position.coords.latitude;
                    const newLng = position.coords.longitude;
                    
                    currentPosition = { lat: newLat, lng: newLng };
                    
                    // 마커 위치 업데이트
                    updateCurrentLocationMarker(newLat, newLng);
                    
                    // 목록 업데이트 (거리순 정렬)
                    if (sortSelect.value === 'distance') {
                        sortStores();
                        updateStoreList();
                    }
                },
                (error) => {
                    console.error('위치 추적 오류:', error);
                    stopLocationTracking();
                    alert('위치 추적 중 오류가 발생했습니다.');
                },
                {
                    enableHighAccuracy: true, // 정확도 향상
                    timeout: 10000,
                    maximumAge: 0 // 캐시 사용 안 함
                }
            );
        },
        (error) => {
            loading.classList.add('hidden');
            isTrackingLocation = false;
            btnCurrentLocation.classList.remove('tracking');
            alert('위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
            console.error('위치 오류:', error);
        }
    );
}

// 현재 위치 가져오기 (한 번만)
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
        return;
    }
    
    loading.classList.remove('hidden');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            currentPosition = { lat, lng };
            
            // 현재 위치 마커 표시
            updateCurrentLocationMarker(lat, lng);
            
            // 지도 중심 이동
            const mapPosition = new naver.maps.LatLng(lat, lng);
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

// ==================== 관리자 모드 기능 ====================

// 관리자 모드 토글 (로고 3번 클릭)
let logoClickCount = 0;
let logoClickTimer = null;

if (logo) {
    logo.addEventListener('click', () => {
        logoClickCount++;
        
        if (logoClickTimer) {
            clearTimeout(logoClickTimer);
        }
        
        logoClickTimer = setTimeout(() => {
            if (logoClickCount >= 3) {
                toggleAdminMode();
            }
            logoClickCount = 0;
        }, 1000);
    });
}

// 관리자 모드 토글
function toggleAdminMode() {
    isAdminMode = !isAdminMode;
    if (isAdminMode) {
        adminPanel.classList.remove('hidden');
        updateAdminStoresList();
    } else {
        adminPanel.classList.add('hidden');
        exitMapCoordinateMode();
    }
}

// 관리자 가게 목록 업데이트
function updateAdminStoresList() {
    const customStores = loadStoresFromLocalStorage();
    adminStoresList.innerHTML = '';
    
    if (customStores.length === 0) {
        adminStoresList.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">추가된 가게가 없습니다.</div>';
        return;
    }
    
    customStores.forEach(store => {
        const item = document.createElement('div');
        item.className = 'admin-store-item';
        item.innerHTML = `
            <div class="admin-store-info">
                <div class="store-name">${store.name}</div>
                <div class="store-address">${store.address}</div>
            </div>
            <div class="admin-store-actions">
                <button class="btn-edit" onclick="editStore(${store.id})">✏️ 수정</button>
                <button class="btn-delete" onclick="deleteStore(${store.id})">🗑️ 삭제</button>
            </div>
        `;
        adminStoresList.appendChild(item);
    });
}

// 가게 추가
function addStore() {
    document.getElementById('storeEditTitle').textContent = '가게 추가';
    document.getElementById('editStoreId').value = '';
    document.getElementById('storeEditForm').reset();
    menuList.innerHTML = '';
    storeEditModal.classList.add('active');
}

// 가게 수정
function editStore(storeId) {
    const customStores = loadStoresFromLocalStorage();
    const store = customStores.find(s => s.id === storeId);
    if (!store) return;
    
    document.getElementById('storeEditTitle').textContent = '가게 수정';
    document.getElementById('editStoreId').value = store.id;
    document.getElementById('editStoreName').value = store.name;
    document.getElementById('editStoreAddress').value = store.address;
    document.getElementById('editStorePhone').value = store.phone || '';
    document.getElementById('editStoreOpen').value = store.hours?.open || '';
    document.getElementById('editStoreClose').value = store.hours?.close || '';
    document.getElementById('editStoreLat').value = store.lat;
    document.getElementById('editStoreLng').value = store.lng;
    document.getElementById('editStoreImage').value = store.image || '';
    
    // 메뉴 목록
    menuList.innerHTML = '';
    if (store.menu && store.menu.length > 0) {
        store.menu.forEach((menu, index) => {
            addMenuItem(menu.name, menu.price);
        });
    }
    
    storeEditModal.classList.add('active');
}

// 가게 삭제
function deleteStore(storeId) {
    if (!confirm('정말 이 가게를 삭제하시겠습니까?')) return;
    
    const customStores = loadStoresFromLocalStorage();
    const filtered = customStores.filter(s => s.id !== storeId);
    
    if (saveStoresToLocalStorage(filtered)) {
        loadAllStores();
        displayStoresOnMap();
        updateStoreList();
        updateAdminStoresList();
        alert('가게가 삭제되었습니다.');
    }
}

// 가게 저장
function saveStore(storeData) {
    const customStores = loadStoresFromLocalStorage();
    const storeId = parseInt(document.getElementById('editStoreId').value);
    
    if (storeId && storeId > 0) {
        // 수정
        const index = customStores.findIndex(s => s.id === storeId);
        if (index !== -1) {
            customStores[index] = storeData;
        }
    } else {
        // 추가
        const maxId = customStores.length > 0 
            ? Math.max(...customStores.map(s => s.id || 0))
            : 10000;
        storeData.id = maxId + 1;
        customStores.push(storeData);
    }
    
    if (saveStoresToLocalStorage(customStores)) {
        loadAllStores();
        displayStoresOnMap();
        updateStoreList();
        updateAdminStoresList();
        storeEditModal.classList.remove('active');
        alert(storeId ? '가게가 수정되었습니다.' : '가게가 추가되었습니다.');
    }
}

// 지도 좌표 선택 모드 시작
function startMapCoordinateMode() {
    isMapCoordinateMode = true;
    storeEditModal.classList.remove('active');
    
    // 지도 탭으로 전환
    tabMap.click();
    
    // 안내 메시지 표시
    const notice = document.createElement('div');
    notice.className = 'map-coordinate-mode';
    notice.id = 'coordinateModeNotice';
    notice.textContent = '📍 지도를 클릭하여 좌표를 선택하세요';
    mapContainer.appendChild(notice);
    
    // 좌표 선택 마커 제거
    if (coordinateModeMarker) {
        coordinateModeMarker.setMap(null);
        coordinateModeMarker = null;
    }
}

// 지도 좌표 선택 모드 종료
function exitMapCoordinateMode() {
    isMapCoordinateMode = false;
    const notice = document.getElementById('coordinateModeNotice');
    if (notice) {
        notice.remove();
    }
    
    // 편집 모달 다시 표시
    if (document.getElementById('editStoreId').value || 
        document.getElementById('editStoreName').value) {
        storeEditModal.classList.add('active');
    }
}

// 메뉴 항목 추가
function addMenuItem(name = '', price = 0) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item-edit';
    const menuIndex = menuList.children.length;
    menuItem.innerHTML = `
        <input type="text" class="menu-name-input" placeholder="메뉴명" value="${name}">
        <input type="number" class="menu-price-input" placeholder="가격" value="${price}" min="0">
        <button type="button" class="btn-remove-menu" onclick="this.parentElement.remove()">삭제</button>
    `;
    menuList.appendChild(menuItem);
}

// JSON 다운로드
function exportData() {
    const customStores = loadStoresFromLocalStorage();
    const dataStr = JSON.stringify(customStores, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bongss-stores-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// JSON 업로드
function importData() {
    fileInput.click();
}

// 전역 함수로 등록 (HTML에서 onclick 사용)
window.editStore = editStore;
window.deleteStore = deleteStore;

// ==================== 이벤트 리스너 ====================

// 이벤트 리스너
btnSearch.addEventListener('click', () => {
    searchStores(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchStores(searchInput.value);
    }
});

btnCurrentLocation.addEventListener('click', startLocationTracking);

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

// 관리자 모드 이벤트 리스너
if (adminClose) {
    adminClose.addEventListener('click', () => {
        toggleAdminMode();
    });
}

if (btnAddStore) {
    btnAddStore.addEventListener('click', addStore);
}

if (btnExportData) {
    btnExportData.addEventListener('click', exportData);
}

if (btnImportData) {
    btnImportData.addEventListener('click', importData);
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    if (confirm(`${data.length}개의 가게를 가져오시겠습니까?`)) {
                        saveStoresToLocalStorage(data);
                        loadAllStores();
                        displayStoresOnMap();
                        updateStoreList();
                        updateAdminStoresList();
                        alert('데이터를 가져왔습니다.');
                    }
                } else {
                    alert('올바른 JSON 형식이 아닙니다.');
                }
            } catch (error) {
                alert('파일을 읽는 중 오류가 발생했습니다.');
                console.error(error);
            }
        };
        reader.readAsText(file);
        fileInput.value = '';
    });
}

if (storeEditClose) {
    storeEditClose.addEventListener('click', () => {
        storeEditModal.classList.remove('active');
        exitMapCoordinateMode();
    });
}

if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', () => {
        storeEditModal.classList.remove('active');
        exitMapCoordinateMode();
    });
}

if (storeEditModal) {
    storeEditModal.addEventListener('click', (e) => {
        if (e.target === storeEditModal) {
            storeEditModal.classList.remove('active');
            exitMapCoordinateMode();
        }
    });
}

if (storeEditForm) {
    storeEditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const menuItems = [];
        const menuInputs = menuList.querySelectorAll('.menu-item-edit');
        menuInputs.forEach(item => {
            const name = item.querySelector('.menu-name-input').value.trim();
            const price = parseInt(item.querySelector('.menu-price-input').value) || 0;
            if (name) {
                menuItems.push({ name, price });
            }
        });
        
        const storeData = {
            name: document.getElementById('editStoreName').value.trim(),
            address: document.getElementById('editStoreAddress').value.trim(),
            phone: document.getElementById('editStorePhone').value.trim(),
            lat: parseFloat(document.getElementById('editStoreLat').value),
            lng: parseFloat(document.getElementById('editStoreLng').value),
            hours: {
                open: document.getElementById('editStoreOpen').value.trim(),
                close: document.getElementById('editStoreClose').value.trim()
            },
            menu: menuItems,
            image: document.getElementById('editStoreImage').value.trim() || 
                   `https://via.placeholder.com/400x200?text=${encodeURIComponent(document.getElementById('editStoreName').value)}`
        };
        
        if (!storeData.name || !storeData.address || !storeData.lat || !storeData.lng) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }
        
        saveStore(storeData);
    });
}

if (btnMapSelect) {
    btnMapSelect.addEventListener('click', startMapCoordinateMode);
}

if (btnAddMenu) {
    btnAddMenu.addEventListener('click', () => addMenuItem());
}

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    // 데이터 로드
    loadAllStores();
    
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

