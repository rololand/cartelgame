import getRandomInt from './getRandomInt.js'
import getRandomFloat from './getRandomFloat.js'
import statsNamesEN from './statsNamesEN.js'
import getEquipmentPrice from './getEquipmentPrice.js';

function getNewItem(itemsList, playerLvl) {
  const id = getRandomInt(0, itemsList.length);
  let newItem = itemsList[id];
  for(let name of statsNamesEN) {
    newItem.stats[name] = Math.ceil(
      newItem.stats[name] *
      (playerLvl + 1) *
      getRandomFloat(0.5, 3, 1)
    );
  }
  newItem.price = getEquipmentPrice(newItem);

  return newItem;
}

export default getNewItem
