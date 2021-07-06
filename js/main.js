
import {massiveObjects} from './data.js';
import {generateAdvertising} from './generate.js';
import {userNameInput} from './form.js';
import {roomNumber} from './form.js';
import {inactivePage, activePage} from './formMgt.js';


const mapCanvasElement = document.querySelector('.map__canvas');
//mapCanvasElement.appendChild(generateAdvertising(massiveObjects, 1));


//inactivePage();
activePage();

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((base) => {
    console.log('Результат', base[1]);
    console.log(generateAdvertising(base, 1));
    for (let i=0; i < base.length; i++){
      console.log(generateAdvertising(base, i));

    }

  });


