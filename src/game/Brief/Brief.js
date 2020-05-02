import React from 'react';
import './Brief.css';

import statsNamesPL from './../../utils/statsNamesPL.js';
import statsNamesEN from './../../utils/statsNamesEN.js';
import blankEquipment from './../../utils/blankEquipment.js';
import getStatsEquipment from './../../utils/getStatsEquipment.js';

import AddStatsButton from './AddStatsButton.js';
import EquipmentCard from './EquipmentCard.js';
import BackpackCard from './BackpackCard.js';
import AvatarCard from './AvatarCard.js';

function Brief(props) {

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
  function deleteElementId(array, id) {
    let newArray = []
    array.forEach((item, i) => {
      if(i !== id) {
        newArray.push(item)
      }
    });
    return newArray;
  }

  function dressEquipment(equipment, id) {
    const newPlayer = props.player;
    const what = equipment.what;
    if(newPlayer.equipment[what]) {
      const newEquipent = newPlayer.backpack[id];
      const newBackpack = newPlayer.equipment[what];
      newPlayer.backpack[id] = newBackpack;
      newPlayer.equipment[what] = newEquipent;
    } else {
      newPlayer.equipment[what] = equipment;
      newPlayer.backpack = deleteElementId(props.player.backpack, id);
    }
    newPlayer.statsAllEquipments = getStatsEquipment(newPlayer.equipment)
    props.updatePlayer(newPlayer);
  }

  const i = [0, 1, 2, 3, 4];

  return (
    <div id="Brief">
      <div className="row">
        <div>
          <div className="row">
            <div>
              {props.player.equipment.head ?
                <EquipmentCard equipment={props.player.equipment.head}/> :
                <EquipmentCard equipment={blankEquipment} />
              }
              {props.player.equipment.body ?
                <EquipmentCard equipment={props.player.equipment.body} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
              {props.player.equipment.legs ?
                <EquipmentCard equipment={props.player.equipment.legs} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
              {props.player.equipment.foots ?
                <EquipmentCard equipment={props.player.equipment.foots} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
            </div>
            <div>
              <AvatarCard avatar={props.player.avatar} />
            </div>
            <div>
              {props.player.equipment.palms ?
                <EquipmentCard equipment={props.player.equipment.palms} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
              {props.player.equipment.finger ?
                <EquipmentCard equipment={props.player.equipment.finger} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
              {props.player.equipment.neck ?
                <EquipmentCard equipment={props.player.equipment.neck} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
              {props.player.equipment.amulet ?
                <EquipmentCard equipment={props.player.equipment.amulet} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
            </div>
          </div>
          <div className="row">
            <div className="row">
              {props.player.equipment.ammo ?
                <EquipmentCard equipment={props.player.equipment.ammo} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
              {props.player.equipment.bullet ?
                <EquipmentCard equipment={props.player.equipment.bullet} /> :
                <EquipmentCard equipment={blankEquipment} />
              }
            </div>
            <div className="row">
              flakony
            </div>
          </div>

        </div>
        <div className="backpack row">
          <div>
          {i.map(i =>
            props.player.backpack[i] ?
            <BackpackCard key={i} id={i} equipment={props.player.backpack[i]}
              dressEquipment={dressEquipment.bind(this)}/> :
            <BackpackCard key={i} id={i} equipment={blankEquipment}
            dressEquipment={dressEquipment.bind(this)}/>
          )}
          </div>
          <div>
          {i.map(i =>
            props.player.backpack[i+5] ?
            <BackpackCard key={i+5} id={i+5} equipment={props.player.backpack[i+5]}
              dressEquipment={dressEquipment.bind(this)}/> :
            <BackpackCard key={i} id={i} equipment={blankEquipment}
            dressEquipment={dressEquipment.bind(this)}/>
          )}
          </div>
        </div>
      </div>

      {statsNamesEN.map((statName, index)=>
        <div key={statsNamesPL[index]} className="row">
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
