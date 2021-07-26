const formInformation = document.querySelector('.ad-form');
const interactiveElements = formInformation.querySelectorAll('fieldset');
const formFilter = document.querySelector('.map__filters');
const selectFilterElements = formFilter.querySelector('fieldset');
const interactiveFilterElements = formFilter.querySelectorAll('.map__filter');

const inactivatePage = function(){
  //Находим и делаем disable форму
  if (!formInformation.classList.contains('ad-form--disabled')){
    formInformation.classList.add('ad-form--disabled');
  }
  // Находим интерактивные элементы формы и делаем их disable
  interactiveElements.forEach((element) => {
    if (!element.classList.contains('disabled')){
      element.classList.add('disabled');
    }
  });
  // Находим форму фильтра и делаем disable эту форму
  if (!formFilter.classList.contains('map__filters--disabled')){
    formFilter.classList.add('map__filters--disabled');
  }
  // Находим и делаем disable селективные элементы формы типа checkbox
  if (!selectFilterElements.classList.contains('disabled')){
    selectFilterElements.classList.add('disabled');
  }
  // Находим и делаем disable другие элементы фильтра
  interactiveFilterElements.forEach((element) => {
    if (!element.classList.contains('disabled')){
      element.classList.add('disabled');
    }
  });

};


const activatePage = function(){
  //Вставляем блок карты в DOM HTML
  const mapBlock = document.querySelector('.map__canvas');
  const mapElementHTML = '<div id="map" style="width: px; height: 480px;"></div>';
  mapBlock.insertAdjacentHTML('beforeend', mapElementHTML);
  // Находим форму и убираем ad-form--disabled
  if (formInformation.classList.contains('ad-form--disabled')){
    formInformation.classList.remove('ad-form--disabled');
  }
  // Находим интерактивные элементы формы и убираем disable
  interactiveElements.forEach((element) => {
    if (element.classList.contains('disabled')){
      element.classList.remove('disabled');
    }
  });
  // Находим форму фильтра и убираем disable эту форму
  if (formFilter.classList.contains('map__filters--disabled')){
    formFilter.classList.remove('map__filters--disabled');
  }
  // Находим и убираем disable селективные элементы формы типа checkbox
  if (selectFilterElements.classList.contains('disabled')){
    selectFilterElements.classList.remove('disabled');
  }
  // Находим и убираем disable другие элементы фильтра
  interactiveFilterElements.forEach((element) => {
    if (element.classList.contains('disabled')){
      element.classList.remove('disabled');
    }
  });


  //markerGroup.clearLayers();

};

export {inactivatePage, activatePage};


