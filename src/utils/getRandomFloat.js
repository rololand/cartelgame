const getRandomFloat = (min, max, decimalPlaces) => {
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

export default getRandomFloat
