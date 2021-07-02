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
  }
  if (ind===1) {
    clear();
    capacity[0].classList.add('hidden');
    capacity[3].classList.add('hidden');
  }

  if (ind===2) {
    clear();
    capacity[3].classList.add('hidden');
  }
  if (ind===3) {
    clear();
    capacity[0].classList.add('hidden');
    capacity[1].classList.add('hidden');
    capacity[2].classList.add('hidden');
  }
});

export {userNameInput, roomNumber};
