
const getIntRandom = function(min, max){
  if (max - min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return -1;
};

const getFloatRandom = function(min, max, digits){
  if (max - min >= 0) {
    const randomNumber = Math.random() * (max - min + 1) + min;
    return randomNumber.toFixed([digits]);
  }
  return -1;
};

const NUMBER_OBJECTS = 10;
const MAX_ROOMS_NUMBER = 30;
const MAX_GUESTS_NUMBER = 20;
const MAX_PRICE = 10000000;

const homeType = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const authorFoto = ['img/avatars/user01.png','img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png',
  'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png', 'img/avatars/users09.png', 'img/avatars/users10.png'];
const fotoList = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const schedule = ['12:00', '13:00', '14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const generateObject = function (name, body, destination) {
  return {'author': name, 'offer': body, 'location':destination};
};

const generateArray = function(arrayInput){
  const oneNumber = getIntRandom(0, arrayInput.length);
  const secondNumber = getIntRandom(0, arrayInput.length);
  if (oneNumber <= secondNumber) {
    return arrayInput.slice(oneNumber, secondNumber);
  }
  else {
    return arrayInput.slice(secondNumber, oneNumber);
  }
};

const author = {
  'avatar': authorFoto[getIntRandom(0, authorFoto.length-1)],
};

const location = {
  'lat': getFloatRandom(35.6500, 35.7000, 4),
  'lng': getFloatRandom(139.7000, 139.8000, 4),
};

const offer = {
  'title': 'Объявление о продаже',
  'address': [location['lat'], location['lng']],
  'price': getIntRandom(0, MAX_PRICE),
  'type': homeType[getIntRandom(0, homeType.length-1)],
  'rooms': getIntRandom(0, MAX_ROOMS_NUMBER),
  'guests': getIntRandom(0, MAX_GUESTS_NUMBER),
  'checkin': schedule[getIntRandom(0, schedule.length-1)],
  'checkout': schedule[getIntRandom(0, schedule.length-1)],
  'features': generateArray(featuresList),
  'description': 'Чистая и уютная квартира',
  'photos': generateArray(fotoList),
};

const massiveObjects = new Array(NUMBER_OBJECTS).fill(null).map(() => generateObject(author, offer, location));
// eslint-disable-next-line no-console
console.log(massiveObjects);

