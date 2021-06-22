
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


const generateObject = function (name, body, destination) {
  return {'author': name, 'offer': body, 'location':destination};
};

const getRandomSubArray = function(list){
  const oneNumber = getIntRandom(0, list.length);
  const secondNumber = getIntRandom(0, list.length);
  if (oneNumber <= secondNumber) {
    return list.slice(oneNumber, secondNumber);
  }
  else {
    return list.slice(secondNumber, oneNumber);
  }
};

export {getIntRandom, getFloatRandom, generateObject, getRandomSubArray};
