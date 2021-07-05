
//import {massiveObjects} from './data.js';

// Нашли template
const textTemplate = document.querySelector('#card').content;
// Создаем копию
const advertisingClone = textTemplate.cloneNode(true);
// eslint-disable-next-line no-console
console.log(advertisingClone);

const typesTranslations = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгалу',
  'hotel': 'Отель',
};

const generateAdvertising = function (data,index) {
  advertisingClone.querySelector('.popup__title').textContent = data[index]['offer']['title'];
  advertisingClone.querySelector('.popup__text--address').textContent = data[index]['offer']['address'];
  advertisingClone.querySelector('.popup__text--price').textContent = `${data[index]['offer']['price']} ₽/ночь`;
  const translate = data[index]['offer']['type'];
  advertisingClone.querySelector('.popup__type').textContent = typesTranslations[translate];
  advertisingClone.querySelector('.popup__text--capacity').textContent = `${data[index]['offer']['rooms']} комнаты для ${data[index]['offer']['guests']} гостей`;
  advertisingClone.querySelector('.popup__text--time').textContent = `Заезд после ${data[index]['offer']['checkin']}, выезд до ${data[index]['offer']['checkout']}`;
  advertisingClone.querySelector('.popup__features').textContent = data[index]['offer']['features'];
  advertisingClone.querySelector('.popup__description').textContent = data[index]['offer']['description'];
  advertisingClone.querySelector('.popup__photos').src = data[index]['offer']['photos'];
  advertisingClone.querySelector('.popup__avatar').src = data[index]['author']['avatar'];
  if (!data[index]['author']['avatar']) {
    advertisingClone.querySelector('.popup__avatar').classList.add('hidden');
  }
  if (!data[index]['offer']['photos']) {
    advertisingClone.querySelector('.popup__photos').classList.add('hidden');
  }

  if (!data[index]['offer']['description']){
    advertisingClone.querySelector('.popup__description').classList.add('hidden');
  }
  if (!data[index]['offer']['features']){
    advertisingClone.querySelector('.popup__features').classList.add('hidden');
  }
  if (!data[index]['offer']['title']) {
    advertisingClone.querySelector('.popup__title').classList.add('hidden');
  }
  return advertisingClone;
};

export {generateAdvertising};


