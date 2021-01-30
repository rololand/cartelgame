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
    const statValue = props.hero.stats[statName];
    const pointCost = (statValue + 1) * 10;

    return pointCost
  }

  const isEnoughGoldToBuyStatsPoint = (statName) => {
    const heroGold = props.hero.gold;
    const pointCost = claculatePointCost(statName);

    return heroGold > pointCost
  }

  const addStatsPoint = (statName) => {
    const newHero = props.hero;

    if(isEnoughGoldToBuyStatsPoint(statName)) {
      newHero.gold = newHero.gold - claculatePointCost(statName);
      newHero.stats[statName] = newHero.stats[statName] + 1;
      props.updateHero(newHero);
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
    const newHero = props.hero;
    const what = equipment.what;
    if(newHero.equipment[what]) {
      const newEquipent = newHero.backpack[id];
      const newBackpack = newHero.equipment[what];
      newHero.backpack[id] = newBackpack;
      newHero.equipment[what] = newEquipent;
    } else {
      newHero.equipment[what] = equipment;
      newHero.backpack = deleteElementId(props.hero.backpack, id);
    }
    newHero.statsAllEquipments = getStatsAllEquipments(newHero.equipment);
    props.updateHero(newHero);
  }

  const undressEquipment = (equipment) => {
    const newHero = props.hero;
    delete newHero.equipment[equipment.what];
    if(props.hero.backpack.length < 10) {
      props.hero.backpack.push(equipment);
    }
    console.log(newHero);
    newHero.statsAllEquipments = getStatsAllEquipments(newHero.equipment)
    props.updateHero(newHero);
  }

  const sellEquipment = (equipment, id) => {
    const newHero = props.hero;
    newHero.gold += equipment.price;
    if(Number.isInteger(id)) {
      newHero.backpack = deleteElementId(props.hero.backpack, id);
    } else {
      delete newHero.equipment[equipment.what];
    }
    newHero.statsAllEquipments = getStatsAllEquipments(newHero.equipment)
    props.updateHero(newHero);
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
              {getEquipmentCard(props.hero.equipment.head)}
              {getEquipmentCard(props.hero.equipment.body)}
              {getEquipmentCard(props.hero.equipment.legs)}
              {getEquipmentCard(props.hero.equipment.foots)}
            </div>
            <div>
              <AvatarCard avatar={props.hero.avatar} />
            </div>
            <div>
              {getEquipmentCard(props.hero.equipment.palms)}
              {getEquipmentCard(props.hero.equipment.finger)}
              {getEquipmentCard(props.hero.equipment.neck)}
              {getEquipmentCard(props.hero.equipment.amulet)}
            </div>
          </div>
          <div className="row">
            <div className="row">
              {getEquipmentCard(props.hero.equipment.ammo)}
              {getEquipmentCard(props.hero.equipment.bullet)}
            </div>
            <div className="row">
              flakony
            </div>
          </div>

        </div>
        <div className="backpack row">
          <div>
          {i.map(i =>
            getBackpackCard(props.hero.backpack[i], i)
          )}
          </div>
          <div>
          {i.map(i =>
            getBackpackCard(props.hero.backpack[i+5], i+5)
          )}
          </div>
        </div>
      </div>
      <div className="statsContainer">
        <div className="row">
          <div>
            {statsNamesEN.slice(0,3).map((statName, index)=>
              statName !== "armor" && (
                <div key={statsNamesPL[index]} className="row">
                  <div className="statsName">
                    {statsNamesPL[index]}: {props.hero.stats[statName]} + {props.hero.statsAllEquipments[statName]}
                  </div>
                  <AddStatsButton onClick={(statName) => addStatsPoint(statName)}
                                  statName={statName}
                                  cost={claculatePointCost(statName)}
                                  isDisabled={!isEnoughGoldToBuyStatsPoint(statName)}/><br />
                </div>
              )
            )}
          </div>
          <div>
            {statsNamesEN.slice(3,statsNamesEN.length).map((statName, index)=>
              statName !== "armor" && (
                <div key={statsNamesPL[index+3]} className="row">
                  <div className="statsName">
                    {statsNamesPL[index+3]}: {props.hero.stats[statName]} + {props.hero.statsAllEquipments[statName]}
                  </div>
                  <AddStatsButton onClick={(statName) => addStatsPoint(statName)}
                                  statName={statName}
                                  cost={claculatePointCost(statName)}
                                  isDisabled={!isEnoughGoldToBuyStatsPoint(statName)}/><br />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
