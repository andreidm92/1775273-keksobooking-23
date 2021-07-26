// Размещение маркеров на карте
import './main.js';

const mapCanvasElement = document.querySelector('.map__canvas');
const DIGITS = 5;

const map = L.map(mapCanvasElement)
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
const markerMain = L.marker(
  {
    lat: 35.4122,
    lng: 139.4130,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
const inputAddress = document.querySelector('#address');
const setMainMarker = () => `lat: ${markerMain.getLatLng().lat.toFixed(DIGITS)} lng: ${markerMain.getLatLng().lng.toFixed(DIGITS)}`;

export function loadMap() {
  markerMain.addTo(map);
  inputAddress.setAttribute('readonly', true);

  markerMain.on('moveend', (evt) => {
    inputAddress.value = `lat: ${evt.target.getLatLng().lat.toFixed(DIGITS)} lng: ${evt.target.getLatLng().lng.toFixed(DIGITS)}`;

  });

  inputAddress.value = setMainMarker();
}

const markerGroup = L.layerGroup().addTo(map);

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  inputAddress.value = setMainMarker();
  loadMap();
});

const typesTranslations = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгалу',
  'hotel': 'Отель',
};

const createFeatureList = (featureList, elementList) => {

  const featureConstructor = featureList.map((feature) => `popup__feature--${feature}`);

  elementList.forEach((elementItem) => {
    let checkResult = false;

    featureConstructor.forEach((constructorItem) => {
      if (elementItem.classList.contains(constructorItem)) { checkResult = true; }
    });

    if (!checkResult) { elementItem.remove(); }
  });
};

const createCustomPopup = (point) => {
  const textTemplate = document.querySelector('#card').content;
  const advertisingClone = textTemplate.cloneNode(true);
  advertisingClone.querySelector('.popup__text--address').textContent = point['address'];
  advertisingClone.querySelector('.popup__text--price').textContent = `${point['price']} ₽/ночь`;
  advertisingClone.querySelector('.popup__type').textContent = typesTranslations[point['type']];
  advertisingClone.querySelector('.popup__text--capacity').textContent = `${point['rooms']} комнаты для ${point['guests']} гостей`;
  advertisingClone.querySelector('.popup__text--time').textContent = `Заезд после ${point['checkin']}, выезд до ${point['checkout']}`;
  if (!point['avatar']) {
    advertisingClone.querySelector('.popup__avatar').classList.add('hidden');
  } else {
    advertisingClone.querySelector('.popup__avatar').src = point['avatar'];
  }
  if (!point['photos']) {
    advertisingClone.querySelector('.popup__photos').classList.add('hidden');
  } else {
    const fotosStorage = advertisingClone.querySelector('.popup__photos');
    const fotoTemplate = advertisingClone.querySelector('.popup__photo');
    fotoTemplate.remove();
    point.photos.forEach((photoItem) => {
      const newPhotoElement = fotoTemplate.cloneNode(true);
      newPhotoElement.setAttribute('src', photoItem);
      fotosStorage.appendChild(newPhotoElement);
    });
  }

  if (!point['description']){
    advertisingClone.querySelector('.popup__description').classList.add('hidden');
  } else {
    advertisingClone.querySelector('.popup__description').textContent = point['description'];
  }
  if (!point['features']){
    advertisingClone.querySelector('.popup__features').classList.add('hidden');
  } else {
    const featureElementList = advertisingClone.querySelectorAll('.popup__feature');
    createFeatureList(point.features, featureElementList);
  }
  if (!point['title']) {
    advertisingClone.querySelector('.popup__title').classList.add('hidden');
  } else {
    advertisingClone.querySelector('.popup__title').textContent = point['title'];
  }

  return advertisingClone;
};


const createMarker = (point) => {
  const {lat, lng} = point;
  const icon = L.icon({
    iconUrl: '/img/pin.svg',
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
      });
};

const removeMarkers = () => {
  markerGroup.clearLayers();
};


export {createMarker, removeMarkers};
