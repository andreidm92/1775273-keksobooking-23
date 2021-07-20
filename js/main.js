
import {activePage, inactivePage} from './activation.js';
import {COUNT_MARKERS, setFilterChangeListener } from './filters.js';
import {loadData} from './api.js';
import {onSuccess, onMistake} from './form.js';
import {saveData} from './api.js';
import {createMarker, loadMap} from './map.js';
import './map.js';

inactivePage();
activePage();
loadMap();

// Загрузка данных

loadData().then((base) => {
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


