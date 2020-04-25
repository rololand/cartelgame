import React from 'react';
import './Brief.css';

import AddStatsButton from './AddStatsButton.js';
import EquipmentCard from './EquipmentCard.js';
import AvatarCard from './AvatarCard.js';

class Brief extends React.Component {

  calculateStatsAllEquipments() {
    const equipmentNames = ["head", "body", "legs", "foots", "ammo", "palms", "finger", "neck", "amulet"];
    const statsNamesEN = ["strength", "dexterity", "stamina", "intelligence", "luck", "armor"];
    const newPlayer = this.props.player;
    const equipments = this.props.player.equipment;
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
    this.props.updatePlayer(newPlayer);
  }

  claculatePointCost(statName) {
    const statValue = this.props.player.stats[statName];
    const pointCost = (statValue + 1) * 10;

    return pointCost
  }

  isEnoughGoldToBuyStatsPoint(statName) {
    const playerGold = this.props.player.gold;
    const pointCost = this.claculatePointCost(statName);

    return playerGold > pointCost
  }

  addStatsPoint(statName) {
    const newPlayer = this.props.player;

    if(this.isEnoughGoldToBuyStatsPoint(statName)) {
      newPlayer.gold = newPlayer.gold - this.claculatePointCost(statName);
      newPlayer.stats[statName] = newPlayer.stats[statName] + 1;

      this.props.updatePlayer(newPlayer);
    }
  }

  render() {
    const statsNamesPL = ["siła", "zręczność", "wytrzymałość", "inteligencja", "szczęście", "pancerz"];
    const statsNamesEN = ["strength", "dexterity", "stamina", "intelligence", "luck", "armor"];

    return (
      <div id="Brief">

        <div className="equipment">
          <div>
            <EquipmentCard equipment={this.props.player.equipment.head} />
            <EquipmentCard equipment={this.props.player.equipment.body} />
            <EquipmentCard equipment={this.props.player.equipment.legs} />
            <EquipmentCard equipment={this.props.player.equipment.foots} />
          </div>
          <div>
            <AvatarCard avatar={this.props.player.avatar} />
            <EquipmentCard equipment={this.props.player.equipment.ammo} />
          </div>
          <div>
            <EquipmentCard equipment={this.props.player.equipment.palms} />
            <EquipmentCard equipment={this.props.player.equipment.finger} />
            <EquipmentCard equipment={this.props.player.equipment.neck} />
            <EquipmentCard equipment={this.props.player.equipment.amulet} />
          </div>
        </div>

        {statsNamesEN.map((statName, index)=>
          <div key={statsNamesPL[index]} className="statsContainer">
            <div className="statsName">
              {statsNamesPL[index]}: {this.props.player.stats[statName]} + {this.props.player.statsAllEquipments[statName]}
            </div>
            <AddStatsButton onClick={this.addStatsPoint.bind(this)}
                            statName={statName}
                            cost={this.claculatePointCost(statName)}
                            isDisabled={!this.isEnoughGoldToBuyStatsPoint(statName)}/><br />
          </div>
        )}
      </div>
    )
  }
}

export default Brief;
