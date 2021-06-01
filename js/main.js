const getIntRandom = function(min, max){
  if (max - min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return -1;
};

const getFloatRandom = function(min, max, digits){
  if (max - min >= 0) {
    const randomNumber = Math.random() * (max - min + 1) + min;
    return randomNumber.toFixed([digits]);
  }
  return -1;
};
getFloatRandom(10, 15, 5);
getIntRandom(10, 15);
