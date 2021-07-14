
//import {massiveObjects} from './data.js';
//import {generateAdvertising} from './generate.js';
import {userNameInput} from './form.js';
import {roomNumber} from './form.js';
// eslint-disable-next-line no-unused-vars
import {inactivePage, activePage} from './formMgt.js';
// eslint-disable-next-line no-unused-vars
import {setFilterChangeListener, COUNT_MARKERS, mapFiltersElement} from './filters.js';
import './api.js';

// eslint-disable-next-line no-unused-vars
const mapCanvasElement = document.querySelector('.map__canvas');
//mapCanvasElement.appendChild(generateAdvertising(massiveObjects, 1));


inactivePage();
activePage();


// Размещение маркеров на карте

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
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

let marker = L.marker(
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

const inputAddress = document.querySelector('#address');


marker.on('moveend', (evt) => {
  inputAddress.value = evt.target.getLatLng();

});

inputAddress.value = marker.getLatLng();


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

const typesTranslations = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгалу',
  'hotel': 'Отель',
};

// eslint-disable-next-line no-unused-vars
const createCustomPopupShort = (point) => {
  const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
  const popupElement = balloonTemplate.cloneNode(true);
  // eslint-disable-next-line no-console
  console.log(popupElement);
  popupElement.querySelector('.balloon__title').textContent = point.title;
  popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;
  return popupElement;
};


const createCustomPopup = (point) => {
  const textTemplate = document.querySelector('#card').content;
  const advertisingClone = textTemplate.cloneNode(true);
  advertisingClone.querySelector('.popup__title').textContent = point['title'];
  advertisingClone.querySelector('.popup__text--address').textContent = point['address'];
  advertisingClone.querySelector('.popup__text--price').textContent = `${point['price']} ₽/ночь`;
  advertisingClone.querySelector('.popup__type').textContent = typesTranslations[point['type']];
  advertisingClone.querySelector('.popup__text--capacity').textContent = `${point['rooms']} комнаты для ${point['guests']} гостей`;
  advertisingClone.querySelector('.popup__text--time').textContent = `Заезд после ${point['checkin']}, выезд до ${point['checkout']}`;
  advertisingClone.querySelector('.popup__features').textContent = point['features'];
  advertisingClone.querySelector('.popup__description').textContent = point['description'];
  advertisingClone.querySelector('.popup__photos').src = point['photos'];
  advertisingClone.querySelector('.popup__avatar').src = point['avatar'];
  if (!point['avatar']) {
    advertisingClone.querySelector('.popup__avatar').classList.add('hidden');
  }
  if (!point['photos']) {
    advertisingClone.querySelector('.popup__photos').classList.add('hidden');
  }

  if (!point['description']){
    advertisingClone.querySelector('.popup__description').classList.add('hidden');
  }
  if (!point['features']){
    advertisingClone.querySelector('.popup__features').classList.add('hidden');
  }
  if (!point['title']) {
    advertisingClone.querySelector('.popup__title').classList.add('hidden');
  }

  return advertisingClone;
};

const markerGroup = L.layerGroup().addTo(map);
const createMarker = (point) => {
  const {lat, lng} = point;
  const icon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  marker = L.marker(
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
      })
    /*
    .on('mouseover', (evt) => {
      evt.target.createCustomPopupShort(point);
    })
    */
  /*
    .on('mouseover', function() {
      marker.openPopup()
    });
    */
  /*
    .on('mouseover', (evt) => {
      evt.target.createCustomPopupShort(point);
    });
    */


  //marker.on('mouseover' function() {marker.openPopup();});

};
/*
points.forEach((point) => {
  createMarker(point);
});
*/
// eslint-disable-next-line no-unused-vars
const removeMarkers = () => {
  markerGroup.clearLayers();
};


fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((base) => {
    for (let i=0; i < COUNT_MARKERS; i++){
      const points =
        {
          title: base[i]['offer']['title'],
          lat: base[i]['location']['lat'].toFixed(5),
          lng: base[i]['location']['lng'].toFixed(5),
          author: base[i]['author']['avatar'],
          address: base[i]['offer']['address'],
          checkin: base[i]['offer']['checkin'],
          checkout: base[i]['offer']['checkout'],
          description: base[i]['offer']['description'],
          features: base[i]['offer']['features'],
          guests: base[i]['offer']['guests'],
          photos: base[i]['offer']['photos'],
          price: base[i]['offer']['price'],
          rooms: base[i]['offer']['rooms'],
          type: base[i]['offer']['type'],
        };
      createMarker(points);
    }
    setFilterChangeListener(base);
  });

export { removeMarkers, createMarker };

