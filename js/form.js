const userNameInput = document.querySelector('#type');

const minPriceBungalo = 0;
const minPriceFlat = 1000;
const minPriceHotel = 3000;
const minPriceHome = 5000;
const minPricePalace = 10000;

userNameInput.addEventListener('change', (event) => {
  const ind = event.target.selectedIndex;
  const element = document.querySelector('#price');
  switch (ind) {
    case 0:
      element.placeholder = minPriceBungalo;
      element.setAttribute('min', minPriceBungalo);
      break;
    case 1:
      element.placeholder = minPriceFlat;
      element.setAttribute('min', minPriceFlat);
      break;
    case 2:
      element.placeholder = minPriceHotel;
      element.setAttribute('min', minPriceHotel);
      break;
    case 3:
      element.placeholder = minPriceHome;
      element.setAttribute('min', minPriceHome);
      break;
    case 4:
      element.placeholder = minPricePalace;
      element.setAttribute('min', minPricePalace);
      break;
  }

}, false);


const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
roomNumber.addEventListener('change', (event) => {
  const clear = function() {
    for (let index = 0; index <= 3; index++) {
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
