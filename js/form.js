const userNameInput = document.querySelector('#type');

const MIN_PRICE_BUNGALO = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOTEL = 3000;
const MIN_PRICE_HOME = 5000;
const MIN_PRICE_PALACE = 10000;

const N_0 = 0;
const N_1 = 1;
const N_2 = 2;
const N_3 = 3;
const N_4 = 4;

const INDEX_MAX = 3;


userNameInput.addEventListener('change', (event) => {
  const ind = event.target.selectedIndex;
  const element = document.querySelector('#price');
  switch (ind) {
    case N_0:
      element.placeholder =  MIN_PRICE_BUNGALO;
      element.setAttribute('min',  MIN_PRICE_BUNGALO);
      break;
    case N_1:
      element.placeholder = MIN_PRICE_FLAT;
      element.setAttribute('min', MIN_PRICE_FLAT);
      break;
    case N_2:
      element.placeholder = MIN_PRICE_HOTEL;
      element.setAttribute('min', MIN_PRICE_HOTEL);
      break;
    case N_3:
      element.placeholder = MIN_PRICE_HOME;
      element.setAttribute('min', MIN_PRICE_HOME);
      break;
    case N_4:
      element.placeholder = MIN_PRICE_PALACE;
      element.setAttribute('min', MIN_PRICE_PALACE);
      break;
  }

}, false);


const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
roomNumber.addEventListener('change', (event) => {
  const clear = function() {
    for (let index = 0; index <= INDEX_MAX; index++) {
      if (capacity[index].classList.contains('hidden')){
        capacity[index].classList.remove('hidden');
      }
    }
  };
  const ind = event.target.selectedIndex;
  if (ind===0) {
    clear();
    capacity[0].classList.add('hidden');
    capacity[1].classList.add('hidden');
    capacity[3].classList.add('hidden');
    capacity[0].removeAttribute('selected');
  }
  if (ind===1) {
    clear();
    capacity[0].classList.add('hidden');
    capacity[3].classList.add('hidden');
    capacity[0].removeAttribute('selected');
  }

  if (ind===2) {
    clear();
    capacity[3].classList.add('hidden');
    capacity[0].removeAttribute('selected');
  }
  if (ind===3) {
    clear();
    capacity[0].classList.add('hidden');
    capacity[1].classList.add('hidden');
    capacity[2].classList.add('hidden');
    capacity[0].removeAttribute('selected');
  }
});

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

const priceInput = document.querySelector('#price');

const MAX_PRICE = 1000000;
let MIN_PRICE = 0;
if (priceInput.min) {
  MIN_PRICE = priceInput.min;
}

priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;

  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена превысила максимальную цену ${ MAX_PRICE }`);
  } else if (priceValue < MIN_PRICE) {
    priceInput.setCustomValidity(`Цена меньше минимума ${  MIN_PRICE  }`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');

checkIn.addEventListener('change', (event) => {
  const i = event.target.selectedIndex;
  for(let j=0; j<checkOut.length; j++){
    checkOut[j].removeAttribute('selected');
    checkIn[j].removeAttribute('selected');
  }
  checkOut[i].setAttribute('selected','');
});
checkOut.addEventListener('change', (event) => {
  const i = event.target.selectedIndex;
  for(let j=0; j<checkIn.length; j++){
    checkIn[j].removeAttribute('selected');
    checkOut[j].removeAttribute('selected');
  }

  checkIn[i].setAttribute('selected','');
});


export {userNameInput, roomNumber};
