const formInformation = document.querySelector('.ad-form');
const interactiveElements = formInformation.querySelectorAll('fieldset');
const formFilter = document.querySelector('.map__filters');
const selectFilterElements = formFilter.querySelector('fieldset');
const interactiveFilterElements = formFilter.querySelectorAll('.map__filter');

const inactivePage = function(){
  //Находим и делаем disable форму
  if (!formInformation.classList.contains('ad-form--disabled')){
    formInformation.classList.add('ad-form--disabled');
  }
  // Находим интерактивные элементы формы и делаем их disable
  interactiveElements.forEach((element) => {
    if (!element.classList.contains('disabled')){
      element.classList.add('disabled');
    }
  });
  // Находим форму фильтра и делаем disable эту форму
  if (!formFilter.classList.contains('map__filters--disabled')){
    formFilter.classList.add('map__filters--disabled');
  }
  // Находим и делаем disable селективные элементы формы типа checkbox
  if (!selectFilterElements.classList.contains('disabled')){
    selectFilterElements.classList.add('disabled');
  }
  // Находим и делаем disable другие элементы фильтра
  interactiveFilterElements.forEach((element) => {
    if (!element.classList.contains('disabled')){
      element.classList.add('disabled');
    }
  });

};


const activePage = function(){
  //Вставляем блок карты в DOM HTML
  const mapBlock = document.querySelector('.map__canvas');
  const mapElementHTML = '<div id="map" style="width: px; height: 480px;"></div>';
  mapBlock.insertAdjacentHTML('beforeend', mapElementHTML);
  // Находим форму и убираем ad-form--disabled
  if (formInformation.classList.contains('ad-form--disabled')){
    formInformation.classList.remove('ad-form--disabled');
  }
  // Находим интерактивные элементы формы и убираем disable
  interactiveElements.forEach((element) => {
    if (element.classList.contains('disabled')){
      element.classList.remove('disabled');
    }
  });
  // Находим форму фильтра и убираем disable эту форму
  if (formFilter.classList.contains('map__filters--disabled')){
    formFilter.classList.remove('map__filters--disabled');
  }
  // Находим и убираем disable селективные элементы формы типа checkbox
  if (selectFilterElements.classList.contains('disabled')){
    selectFilterElements.classList.remove('disabled');
  }
  // Находим и убираем disable другие элементы фильтра
  interactiveFilterElements.forEach((element) => {
    if (element.classList.contains('disabled')){
      element.classList.remove('disabled');
    }
  });

  // global L:readonly
  const map = L.map('map')
    .setView({
      lat: 35.4122,
      lng: 139.4130,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  const mainPinIcon = L.icon({
    iconUrl: 'leaflet/images/marker-icon-2x.png',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker(
    {
      lat: 35.4122,
      lng: 139.4130,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  marker.addTo(map);

  marker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
  });
  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', () => {
    marker.setLatLng({
      lat: 35.4122,
      lng: 139.4130,
    });
    map.setView({
      lat: 35.4122,
      lng: 139.4130,
    }, 16);
  });
  //marker.remove();
  const points = [
    {
      title: 'Toyama',
      lat: 35.1263,
      lng: 139.31730,
    },
    {
      title: 'Geisha',
      lat: 35.96783,
      lng: 139.31258,
    },
    {
      title: 'Ninja',
      lat: 36.95958,
      lng: 139.30228,
    },
    {
      title: 'Sushimo',
      lat: 35.97292,
      lng: 139.31982,
    },
  ];
  const createCustomPopup = (point) => {
    const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
    const popupElement = balloonTemplate.cloneNode(true);
    console.log(popupElement);
    popupElement.querySelector('.balloon__title').textContent = point.title;
    popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;
    return popupElement;
  };
  const markerGroup = L.layerGroup().addTo(map);
  const createMarker = (point) => {
    const {lat, lng} = point;
    const icon = L.icon({
      iconUrl: 'leaflet/images/marker-icon.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      });
    marker
      .addTo(markerGroup)
      .bindPopup(
        createCustomPopup(point),
        {
          keepInView: true,
        },
      );
  };

  points.forEach((point) => {
    createMarker(point)
  });
  //markerGroup.clearLayers();

};


/*
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point;

  const icon = L.icon({
    iconUrl: 'leaflet/images/marker-icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
    );
};

points.forEach((point) => {
  createMarker(point);
});

markerGroup.clearLayers();
*/

export {inactivePage, activePage};

