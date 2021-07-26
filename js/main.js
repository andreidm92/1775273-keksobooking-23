
import {activatePage, inactivatePage} from './activation.js';
import {COUNT_MARKERS, setFilterChangeListener } from './filters.js';
import {loadData} from './api.js';
import {onSuccess, onMistake} from './form.js';
import {saveData} from './api.js';
import {createMarker, loadMap} from './map.js';
import './map.js';

inactivatePage();
loadMap();

// Загрузка данных

loadData().then((bases) => {
  for (let i=0; i < COUNT_MARKERS; i++){
    const points =
      {
        title: bases[i]['offer']['title'],
        lat: bases[i]['location']['lat'].toFixed(5),
        lng: bases[i]['location']['lng'].toFixed(5),
        author: bases[i]['author']['avatar'],
        address: bases[i]['offer']['address'],
        checkin: bases[i]['offer']['checkin'],
        checkout: bases[i]['offer']['checkout'],
        description: bases[i]['offer']['description'],
        features: bases[i]['offer']['features'],
        guests: bases[i]['offer']['guests'],
        photos: bases[i]['offer']['photos'],
        price: bases[i]['offer']['price'],
        rooms: bases[i]['offer']['rooms'],
        type: bases[i]['offer']['type'],
      };
    createMarker(points);
  }
  setFilterChangeListener(bases);
  activatePage();

});


// Сохранение данных с формы

const adFormElement = document.querySelector('.ad-form');
adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  saveData(formData).then((response) => {
    if (response) {
      onSuccess();
      evt.target.reset();
    } else {
      onMistake();
    }
  });
});


