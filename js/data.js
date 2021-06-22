import {getIntRandom, getFloatRandom, generateObject, getRandomSubArray} from 'util.js';

const NUMBER_OBJECTS = 10;
const MAX_ROOMS_NUMBER = 30;
const MAX_GUESTS_NUMBER = 20;
const MAX_PRICE = 10000000;
const LOW_LAT = 35.6500;
const MAX_LAT = 35.7000;
const DIGITS_AFTER = 4;
const LOW_LNG = 139.7000;
const MAX_LNG = 139.8000;

const titles = [
  'Продается двухкомнатная квартира',
  'Срочно продаем квартиру',
  'Квартира в отличном состоянии. Продаем.',
  'Дом в престижном районе. Срочно продаем.',
  'Продаем две квартиры на одной площадке',
  'Продается двухэтажная квартира в небоскребе',
  'Международная корпорация продает квартиру',
  'Центр города, тихое место, престижный район. Продаем 4-х комнатную квартиру.',
  'Красивая квартира, евроремонт, отличная обстановка, 10-й этаж. Продаем.',
  'Продаем квартиру в рассрочку',
];

const descriptions = [
  'Прекрасная квартира в чудесном районе',
  'Красивое место, отличная обстановка',
  'Чудесная квартира, тихий район.',
  'Хорошее, красивое место',
  'Новая квартира с современным ремонтом',
  'Это не квартира, а сказка!',
  'Такую квартиру вы нигде не найдете!',
  'Идеальное место для современной семьи',
  'Уютное гнездышко',
  'Молодежная, современнная квартира',
];

const types  = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];


const avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/users09.png',
  'img/avatars/users10.png'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const times = [
  '12:00',
  '13:00',
  '14:00',
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const author = {
  'avatar': avatars[getIntRandom(0, avatars.length-1)],
};

const location = {
  'lat': getFloatRandom(LOW_LAT, MAX_LAT, DIGITS_AFTER),
  'lng': getFloatRandom(LOW_LNG, MAX_LNG, DIGITS_AFTER),
};

const offer = {
  'title': titles[getIntRandom(0, titles.length-1)],
  'address': [location['lat'], location['lng']],
  'price': getIntRandom(0, MAX_PRICE),
  'type': types[getIntRandom(0, types.length-1)],
  'rooms': getIntRandom(0, MAX_ROOMS_NUMBER),
  'guests': getIntRandom(0, MAX_GUESTS_NUMBER),
  'checkin': times[getIntRandom(0, times.length-1)],
  'checkout': times[getIntRandom(0, times.length-1)],
  'features': getRandomSubArray(features),
  'description': descriptions[getIntRandom(0, descriptions.length-1)],
  'photos': getRandomSubArray(photos),
};

const massiveObjects = new Array(NUMBER_OBJECTS).fill(null).map(() => generateObject(author, offer, location));
// eslint-disable-next-line no-console
console.log(massiveObjects);
export {massiveObjects};


