import React from 'react';
import './Brief.css';

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
    const statsNamesPL = ["siła", "zręczność", "wytrzymałość", "inteligencja", "szczęście", "pancerz"];
    const statsNamesEN = ["strength", "dexterity", "stamina", "intelligence", "luck", "armor"];

    let head = require('../db/items/head/cap.png');
    let body = require('../db/items/body/shirt.png');
    let legs = require('../db/items/legs/belt.png');
    let foots = require('../db/items/foots/shoes.png');

    let avatar = require('../db/avatars/javierpena.png');
    let ammo = require('../db/items/ammo/gun.png');

    let palms = require('../db/items/palms/gloves.png');
    let finger = require('../db/items/finger/ring.png');
    let neck = require('../db/items/neck/necklace.png');
    let amulet = require('../db/items/amulets/glasses.png');
    return (
      <div>
        Brief <br />
        Nick: {this.props.player.username} {}
        Klasa: {this.props.player.category} {}
        Złoto: {this.props.player.gold}

        <div className="equipment">
          <div>
            <div>
              <img src={head} alt={''}/>
            </div>
            <div>
              <img src={body} alt={''}/>
            </div>
            <div>
              <img src={legs} alt={''}/>
            </div>
            <div>
              <img src={foots} alt={''}/>
            </div>
          </div>
          <div>
            <div>
              <img src={avatar} alt={''}/>
            </div>
            <div>
              <img src={ammo} alt={''}/>
            </div>
          </div>
          <div>
            <div>
              <img src={palms} alt={''}/>
            </div>
            <div>
              <img src={finger} alt={''}/>
            </div>
            <div>
              <img src={neck} alt={''}/>
            </div>
            <div>
              <img src={amulet} alt={''}/>
            </div>
          </div>
        </div>

        {statsNamesEN.map((statName, index)=>
          <div key={statsNamesPL[index]} className="statsContainer">
            <div className="statsName">
              {statsNamesPL[index]}: {this.props.player.stats[statName]}
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

function AddStatsButton(props) {
  return (
    <div>
      <button onClick={() => props.onClick(props.statName)} disabled={props.isDisabled ? true : false}>+</button>
      Koszt: {props.cost}
    </div>
  )

}

export default Brief;
