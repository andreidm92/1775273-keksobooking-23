/* eslint-disable no-console */
import { removeMarkers, createMarker } from './main.js';

const mapFiltersElement = document.querySelector('.map__filters');
const filterHousingTypeElement = mapFiltersElement.querySelector('#housing-type');
const filterHousingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const filterHousingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const filterHousingPriceElement = mapFiltersElement.querySelector('#housing-price');
const filterHousingFeaturesElement = mapFiltersElement.querySelector('#housing-features');

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const COUNT_MARKERS = 10;
const DELAY = 500;


const filterByType = (items) => items.offer.type === filterHousingTypeElement.value || filterHousingTypeElement.value === 'any';

const filterByRooms = (items) => items.offer.rooms === Number(filterHousingRoomsElement.value) || filterHousingRoomsElement.value === 'any';

const filterByGuests = (items) => items.offer.guests === Number(filterHousingGuestsElement.value) || filterHousingGuestsElement.value === 'any';

const filterByPrice = (items) => {
  switch (filterHousingPriceElement.value) {
    case 'low':
      return items.offer.price <= LOW_PRICE;
    case 'middle':
      return items.offer.price >= LOW_PRICE && items.price <= HIGH_PRICE;
    case 'high':
      return items.offer.price >= HIGH_PRICE;
    case 'any':
      return items.offer.price;
  }
};

const filterByFeatures = (item) => {
  const checkedFeatureElements = Array.from(filterHousingFeaturesElement.querySelectorAll('input:checked'));
  return checkedFeatureElements.length === 0 ? true : checkedFeatureElements.every((checkedFeature) => item.offer.features.includes(checkedFeature.value));
};
const createFilter =  _.debounce((points) => {
  const filteredPoints = [];
  for (const point of points) {
    if (
      filterByType(point) &&
      filterByRooms(point) &&
      filterByGuests(point) &&
      filterByPrice(point) &&
      filterByFeatures(point)
    ) {
      filteredPoints.push(point);
      if (filteredPoints.length >= COUNT_MARKERS) {
        break;
      }
    }
  }

  for (let i=0; i < filteredPoints.length; i++){
    const points =
      {
        title: filteredPoints[i]['offer']['title'],
        lat: filteredPoints[i]['location']['lat'].toFixed(5),
        lng: filteredPoints[i]['location']['lng'].toFixed(5),
        author: filteredPoints[i]['author']['avatar'],
        address: filteredPoints[i]['offer']['address'],
        checkin: filteredPoints[i]['offer']['checkin'],
        checkout: filteredPoints[i]['offer']['checkout'],
        description: filteredPoints[i]['offer']['description'],
        features: filteredPoints[i]['offer']['features'],
        guests: filteredPoints[i]['offer']['guests'],
        photos: filteredPoints[i]['offer']['photos'],
        price: filteredPoints[i]['offer']['price'],
        rooms: filteredPoints[i]['offer']['rooms'],
        type: filteredPoints[i]['offer']['type'],
      };
    console.log(filteredPoints[i]['offer']['type'])
    createMarker(points);
  }


}, DELAY);

// eslint-disable-next-line no-unused-vars
function setFilterChangeListener (points) {
  mapFiltersElement.addEventListener('change', () => {
    removeMarkers();
    createFilter(points);

  });
}


export {setFilterChangeListener, createFilter, mapFiltersElement, COUNT_MARKERS};

