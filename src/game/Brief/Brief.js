import React from 'react';
import './Brief.css';

import AddStatsButton from './AddStatsButton.js';
import EquipmentCard from './EquipmentCard.js';
import AvatarCard from './AvatarCard.js';

function Brief(props) {

  function calculateStatsAllEquipments() {
    const equipmentNames = ["head", "body", "legs", "foots", "ammo", "palms", "finger", "neck", "amulet"];
    const statsNamesEN = ["strength", "dexterity", "stamina", "intelligence", "luck", "armor"];
    const newPlayer = props.player;
    const equipments = props.player.equipment;
    let equipmentStats = {}
    const newStatsAllEquipments = {
      strength: 0,
      dexterity: 0,
      stamina: 0,
      intelligence: 0,
      luck: 0,
      armor: 0
    }

    for(var name of equipmentNames) {
        equipmentStats = equipments[name].stats;
        for(var statName of statsNamesEN) {
          newStatsAllEquipments[statName] += equipmentStats[statName]
        }
    }

    newPlayer.statsAllEquipments = newStatsAllEquipments;
    props.updatePlayer(newPlayer);
  }

  function claculatePointCost(statName) {
    const statValue = props.player.stats[statName];
    const pointCost = (statValue + 1) * 10;

    return pointCost
  }

  function isEnoughGoldToBuyStatsPoint(statName) {
    const playerGold = props.player.gold;
    const pointCost = claculatePointCost(statName);

    return playerGold > pointCost
  }

  function addStatsPoint(statName) {
    const newPlayer = props.player;

    if(isEnoughGoldToBuyStatsPoint(statName)) {
      newPlayer.gold = newPlayer.gold - claculatePointCost(statName);
      newPlayer.stats[statName] = newPlayer.stats[statName] + 1;

      props.updatePlayer(newPlayer);
    }
  }


    const statsNamesPL = ["siła", "zręczność", "wytrzymałość", "inteligencja", "szczęście", "pancerz"];
    const statsNamesEN = ["strength", "dexterity", "stamina", "intelligence", "luck", "armor"];
    const i = [0, 1, 2, 3, 4];
    const blankEquipment = {
      name: '',
      description: '',
      imgUrl: 'blank.png',
      stats: {
        strength: 0,
        dexterity: 0,
        stamina: 0,
        intelligence: 0,
        luck: 0,
        armor: 0
      }
    }

    return (
      <div id="Brief">
        <div className="briefRow">
          <div className="equipment">
            <div>
              <EquipmentCard equipment={props.player.equipment.head} />
              <EquipmentCard equipment={props.player.equipment.body} />
              <EquipmentCard equipment={props.player.equipment.legs} />
              <EquipmentCard equipment={props.player.equipment.foots} />
            </div>
            <div>
              <AvatarCard avatar={props.player.avatar} />
              <EquipmentCard equipment={props.player.equipment.ammo} />
            </div>
            <div>
              <EquipmentCard equipment={props.player.equipment.palms} />
              <EquipmentCard equipment={props.player.equipment.finger} />
              <EquipmentCard equipment={props.player.equipment.neck} />
              <EquipmentCard equipment={props.player.equipment.amulet} />
            </div>
          </div>
          <div className="backpack">
            <div>
            {i.map(i =>
              props.player.backpack[i] ?
              <EquipmentCard equipment={props.player.backpack[i]} /> :
              <EquipmentCard equipment={blankEquipment} />
            )}
            </div>
            <div>
            {i.map(i =>
              props.player.backpack[i+5] ?
              <EquipmentCard equipment={props.player.backpack[i+5]} /> :
              <EquipmentCard equipment={blankEquipment} />
            )}
            </div>
          </div>
        </div>

        {statsNamesEN.map((statName, index)=>
          <div key={statsNamesPL[index]} className="statsContainer">
            <div className="statsName">
              {statsNamesPL[index]}: {props.player.stats[statName]} + {props.player.statsAllEquipments[statName]}
            </div>
            <AddStatsButton onClick={(statName) => addStatsPoint(statName)}
                            statName={statName}
                            cost={claculatePointCost(statName)}
                            isDisabled={!isEnoughGoldToBuyStatsPoint(statName)}/><br />
          </div>
        )}
      </div>
    )
}

export default Brief;
