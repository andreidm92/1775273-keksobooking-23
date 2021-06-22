/*
import massiveObjects from 'js/data.js';

// Нащли список, куда будеи вставлять объявления
const listAdvertising = document.querySelector('#map-canvas');
// Нащли template
const textTemplate = document.querySelector('#card').content;
// Создаем копию
const advertisingClone = textTemplate.cloneNode(true);

const typesTranslations = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгалу',
  'hotel': 'Отель',
};

const generateAdvertising = function (data) {
  advertisingClone.querySelector('.popup__title').textContent = data['offer']['title'];
  advertisingClone.querySelector('.popup__text--address').textContent = data['offer']['address'];
  advertisingClone.querySelector('.popup__text--address').textContent = data['offer']['price'] + ' ₽/ночь';
  const translate = data['offer']['type'];
  advertisingClone.querySelector('.popup__type').textContent = typesTranslations[translate];
  advertisingClone.querySelector('.popup__text--capacity').textContent = data['offer']['rooms'] + ' комнаты для ' + data['offer']['guests'] + ' гостей';
  advertisingClone.querySelector('..popup__text--time').textContent = 'Заезд после ' + data['offer']['checkin'] + ', выезд до ' + data['offer']['checkout'];
  advertisingClone.querySelector('.popup__features').textContent = data['offer']['features'];
  advertisingClone.querySelector('.popup__description').textContent = data['offer']['description'];
  advertisingClone.querySelector('.popup__photos').textContent = 'src = ' + data['offer']['photos'];
  advertisingClone.querySelector('.popup__avatar').textContent = 'src = ' + data['author']['avatar'];
  if (advertisingClone.querySelector('.popup__description').textContent === ''){
    advertisingClone.querySelector('.popup__description').classList.add('hidden');
  }
  return advertisingClone;
};

// Вставим наше объявление


listAdvertising.appendChild(generateAdvertising(massiveObjects));


// clonedElement.children[0].textContent = 3;

*/
