
import {massiveObjects} from './data.js';
import {generateAdvertising} from './generate.js';
import {userNameInput} from './form.js';
import {roomNumber} from './form.js';
import {inactivePage, activePage} from './formMgt.js';



const mapCanvasElement = document.querySelector('.map__canvas');
//mapCanvasElement.appendChild(generateAdvertising(massiveObjects, 1));


//inactivePage();
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
//marker.remove();

const createCustomPopupShort = (point) => {
  const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
  const popupElement = balloonTemplate.cloneNode(true);
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
  //const translate = point['offer']['type'];
  //advertisingClone.querySelector('.popup__type').textContent = typesTranslations[translate];
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
    )
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


const formValue = document.querySelector('.ad-form');
const formButton = formValue.querySelector('.ad-form__submit')

formButton.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
      type: 'multipart/form-data',
    },
  );
});

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((base) => {
    console.log('Результат', base);
    //console.log(generateAdvertising(base, 1));
    for (let i=0; i < base.length; i++){
      //console.log(generateAdvertising(base, i));
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
      console.log(points);
      createMarker(points);
    }

  });


