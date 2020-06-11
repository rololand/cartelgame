import statsNamesEN from './statsNamesEN.js';

const getStatsAllEquipments = (equipments) => {
  const equipmentNames = ["head", "body", "legs", "foots", "ammo", "bullet", "palms", "finger", "neck", "amulet"];
  let equipmentStats = {}
  const newStatsAllEquipments = {
    shooting: 0,
    stamina: 0,
    intelligence: 0,
    flair: 0,
    agility: 0,
    luck: 0,
    armor: 0
  }

  for(var name of equipmentNames) {
    if(equipments[name]){
      equipmentStats = equipments[name].stats;
      for(var statName of statsNamesEN) {
        newStatsAllEquipments[statName] += equipmentStats[statName]
      }
    }
  }

  return newStatsAllEquipments;
}

export default getStatsAllEquipments
