
import {massiveObjects} from './data.js';
import {generateAdvertising} from './generate.js';
import {userNameInput} from './form.js';
import {roomNumber} from './form.js';

const mapCanvasElement = document.querySelector('.map__canvas');
mapCanvasElement.appendChild(generateAdvertising(massiveObjects, 1));
// eslint-disable-next-line no-console
console.log(userNameInput);
// eslint-disable-next-line no-console
console.log(roomNumber);
