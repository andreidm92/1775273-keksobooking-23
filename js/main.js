let getIntRandom = function(min, max){
    if (max - min >= 0) {
        return randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    
    }
    return -1
}

let getFloatRandom = function(min, max, digits){
    if (max - min >= 0) {
        let randomNumber = Math.random() * (max - min + 1) + min
        return randomNumber.toFixed([digits])
    
    }
    return -1
}
console.log(getFloatRandom(10, 15, 5))