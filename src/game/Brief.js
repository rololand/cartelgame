import React from 'react';
import axios from 'axios';

class Brief extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        username: '',
        class: '',
        gold: 0,
        stats: {
          strength: 0,
          dexterity: 0,
          stamina: 0,
          intelligence: 0,
          luck: 0,
          armor: 0
        }
      }
    };
  }

  componentDidMount() {
    this.getPlayer();
  }

  getPlayer() {
    const url  = 'http://localhost:5000/heros/' + this.props.playerId;
    axios.get(url)
      .then(player => {
        this.setState({
          player: player.data
        })
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  claculatePointCost(statName) {
    const statValue = this.state.player.stats[statName];
    const pointCost = (statValue + 1) * 10;

    return pointCost
  }

  isEnoughGoldToBuyStatsPoint(statName) {
    const playerGold = this.state.player.gold;
    const pointCost = this.claculatePointCost(statName);

    return playerGold > pointCost
  }

  addStatsPoint(statName) {
    const newPlayer = this.state.player;

    if(this.isEnoughGoldToBuyStatsPoint(statName)) {
      newPlayer.gold = newPlayer.gold - this.claculatePointCost(statName);
      newPlayer.stats[statName] = newPlayer.stats[statName] + 1;
      const url  = 'http://localhost:5000/heros/update/' + this.state.player._id;
      axios.post(url, newPlayer)
        .then((player) => {
          this.setState({
            player: newPlayer
          });
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
  }

  render() {
    return (
      <div>
        Brief <br />
        Nick: {this.state.player.username}<br />
        Klasa: {this.state.player.class}<br />
        Złoto: {this.state.player.gold}<br />
        Siła: {this.state.player.stats.strength}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="strength"
                                                                cost={this.claculatePointCost("strength")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("strength")}/><br />
        Zręczność: {this.state.player.stats.dexterity}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="dexterity"
                                                                cost={this.claculatePointCost("dexterity")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("dexterity")}/><br />
        Wytrzymałość: {this.state.player.stats.stamina}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="stamina"
                                                                cost={this.claculatePointCost("stamina")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("stamina")}/><br />
        Inteligencja: {this.state.player.stats.intelligence}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="intelligence"
                                                                cost={this.claculatePointCost("intelligence")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("intelligence")}/><br />
        Szczęście: {this.state.player.stats.luck}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
                                                                statName="luck"
                                                                cost={this.claculatePointCost("luck")}
                                                                isDisabled={!this.isEnoughGoldToBuyStatsPoint("luck")}/><br />
        Pancerz: {this.state.player.stats.armor}<AddStatsButton onClick={this.addStatsPoint.bind(this)}
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
