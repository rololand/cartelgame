import React from 'react';
import './Hero.css';

import statsNamesPL from './../../utils/statsNamesPL.js';
import statsNamesEN from './../../utils/statsNamesEN.js';
import blankEquipment from './../../utils/blankEquipment.js';
import getStatsAllEquipments from './../../utils/getStatsAllEquipments.js';

import AddStatsButton from './AddStatsButton.js';
import EquipmentCard from './EquipmentCard.js';
import BackpackCard from './BackpackCard.js';
import AvatarCard from './AvatarCard.js';

const Hero = (props) => {

  const claculatePointCost = (statName) => {
    const statValue = props.player.stats[statName];
    const pointCost = (statValue + 1) * 10;

    return pointCost
  }

  const isEnoughGoldToBuyStatsPoint = (statName) => {
    const playerGold = props.player.gold;
    const pointCost = claculatePointCost(statName);

    return playerGold > pointCost
  }

  const addStatsPoint = (statName) => {
    const newPlayer = props.player;

    if(isEnoughGoldToBuyStatsPoint(statName)) {
      newPlayer.gold = newPlayer.gold - claculatePointCost(statName);
      newPlayer.stats[statName] = newPlayer.stats[statName] + 1;
      props.updatePlayer(newPlayer);
    }
  }

  const deleteElementId = (array, id) => {
    let newArray = []
    array.forEach((item, i) => {
      if(i !== id) {
        newArray.push(item)
      }
    });
    return newArray;
  }

  const dressEquipment = (equipment, id) => {
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
    newPlayer.statsAllEquipments = getStatsAllEquipments(newPlayer.equipment);
    props.updatePlayer(newPlayer);
  }

  const undressEquipment = (equipment) => {
    const newPlayer = props.player;
    delete newPlayer.equipment[equipment.what];
    if(props.player.backpack.length < 10) {
      props.player.backpack.push(equipment);
    }
    console.log(newPlayer);
    newPlayer.statsAllEquipments = getStatsAllEquipments(newPlayer.equipment)
    props.updatePlayer(newPlayer);
  }

  const sellEquipment = (equipment, id) => {
    const newPlayer = props.player;
    newPlayer.gold += equipment.price;
    if(Number.isInteger(id)) {
      newPlayer.backpack = deleteElementId(props.player.backpack, id);
    } else {
      delete newPlayer.equipment[equipment.what];
    }
    newPlayer.statsAllEquipments = getStatsAllEquipments(newPlayer.equipment)
    props.updatePlayer(newPlayer);
  }

  const getEquipmentCard = (equipment) => {
    if(equipment) {
      return (
        <EquipmentCard equipment={equipment}
          undressEquipment = {undressEquipment.bind(this)}
          sellEquipment = {sellEquipment.bind(this)}/>
      )
    } else {
      return (
        <EquipmentCard equipment={blankEquipment}
          undressEquipment = {undressEquipment.bind(this)}
          sellEquipment = {sellEquipment.bind(this)}/>
      )
    }
  }

  const getBackpackCard = (equipment, i) => {
    if(equipment) {
      return (
        <BackpackCard key={i} id={i} equipment={equipment}
          dressEquipment={dressEquipment.bind(this)}
          sellEquipment={sellEquipment.bind(this)}/>
      )
    } else {
      return (
        <BackpackCard key={i} id={i} equipment={blankEquipment}
          dressEquipment={dressEquipment.bind(this)}
          sellEquipment={sellEquipment.bind(this)}/>
      )
    }
  }

  const i = [0, 1, 2, 3, 4];

  return (
    <div id="Hero">
      <div className="row">
        <div>
          <div className="row">
            <div>
              {getEquipmentCard(props.player.equipment.head)}
              {getEquipmentCard(props.player.equipment.body)}
              {getEquipmentCard(props.player.equipment.legs)}
              {getEquipmentCard(props.player.equipment.foots)}
            </div>
            <div>
              <AvatarCard avatar={props.player.avatar} />
            </div>
            <div>
              {getEquipmentCard(props.player.equipment.palms)}
              {getEquipmentCard(props.player.equipment.finger)}
              {getEquipmentCard(props.player.equipment.neck)}
              {getEquipmentCard(props.player.equipment.amulet)}
            </div>
          </div>
          <div className="row">
            <div className="row">
              {getEquipmentCard(props.player.equipment.ammo)}
              {getEquipmentCard(props.player.equipment.bullet)}
            </div>
            <div className="row">
              flakony
            </div>
          </div>

        </div>
        <div className="backpack row">
          <div>
          {i.map(i =>
            getBackpackCard(props.player.backpack[i], i)
          )}
          </div>
          <div>
          {i.map(i =>
            getBackpackCard(props.player.backpack[i+5], i+5)
          )}
          </div>
        </div>
      </div>

      {statsNamesEN.map((statName, index)=>
        statName !== "armor" && (
          <div key={statsNamesPL[index]} className="row">
            <div className="statsName">
              {statsNamesPL[index]}: {props.player.stats[statName]} + {props.player.statsAllEquipments[statName]}
            </div>
            <AddStatsButton onClick={(statName) => addStatsPoint(statName)}
                            statName={statName}
                            cost={claculatePointCost(statName)}
                            isDisabled={!isEnoughGoldToBuyStatsPoint(statName)}/><br />
          </div>
        )
      )}
    </div>
  )
}

export default Hero;
