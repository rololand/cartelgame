import React from 'react';

class Brief extends React.Component {

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
    return (
      <div>
        Brief <br />
        Nick: {this.props.player.username}<br />
        Klasa: {this.props.player.category}<br />
        Złoto: {this.props.player.gold}<br />
        Siła: {this.props.player.stats.strength}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="strength"
                                                                cost={this.claculatePointCost("strength")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("strength")}/><br />
        Zręczność: {this.props.player.stats.dexterity}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="dexterity"
                                                                cost={this.claculatePointCost("dexterity")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("dexterity")}/><br />
        Wytrzymałość: {this.props.player.stats.stamina}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="stamina"
                                                                cost={this.claculatePointCost("stamina")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("stamina")}/><br />
        Inteligencja: {this.props.player.stats.intelligence}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="intelligence"
                                                                cost={this.claculatePointCost("intelligence")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("intelligence")}/><br />
        Szczęście: {this.props.player.stats.luck}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="luck"
                                                                cost={this.claculatePointCost("luck")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("luck")}/><br />
        Pancerz: {this.props.player.stats.armor}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="armor"
                                                                cost={this.claculatePointCost("armor")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("armor")}/><br />
      </div>
    )
  }
}

function AddStatsButton(props) {
  return (
    <div>
      <button onClick={() => props.onClick(props.statName)} disabled={props.isDisabled ? true : false}>+</button>
      Koszt: {props.cost}
    </div>
  )

}

export default Brief;
