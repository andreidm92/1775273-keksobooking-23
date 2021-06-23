import {massiveObjects} from './data.js';
import {generateAdvertising} from './generate.js';

const mapCanvasElement = document.querySelector('.map__canvas');
mapCanvasElement.appendChild(generateAdvertising(massiveObjects, 0));
// eslint-disable-next-line no-console
console.log(generateAdvertising(massiveObjects, 0));

