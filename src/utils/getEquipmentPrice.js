import statsNamesEN from './statsNamesEN.js';

const getEquipmentPrice = (equipment) => {
  let sum = 0;
  for(var statName of statsNamesEN) {
    sum += equipment.stats[statName];
  }
  return sum;
}

export default getEquipmentPrice
