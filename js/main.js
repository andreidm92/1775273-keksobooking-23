
import {massiveObjects} from './data.js';
import {generateAdvertising} from './generate.js';
import {userNameInput} from './form.js';
import {roomNumber} from './form.js';

const mapCanvasElement = document.querySelector('.map__canvas');
mapCanvasElement.appendChild(generateAdvertising(massiveObjects, 1));


