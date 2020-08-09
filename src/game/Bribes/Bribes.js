import React from 'react';
import BribeCard from './BribeCard.js'

const Bribes = (props) => {
  const isEnoughGoldToPayBribe = (bribeCost) => {
    return props.player.gold > bribeCost
  }

  const payBribe = (bribeId) => {
    const newPlayer = props.player
    if (isEnoughGoldToPayBribe(props.bribesList[bribeId].cost)) {
      console.log("pay bribe")
      newPlayer.gold -= props.bribesList[bribeId].cost
      newPlayer.prison.chance -= props.bribesList[bribeId].chanceReduction
      newPlayer.bribe.isPayed = true
      newPlayer.bribe.chanceReduction = props.bribesList[bribeId].chanceReduction
      newPlayer.bribe.id = bribeId
      const date = new Date();
      newPlayer.bribe.endTime = new Date(date.getTime() + props.bribesList[bribeId].duration*1000).getTime()
      console.log(newPlayer)
      props.updatePlayer(newPlayer)
    }
  }

  return (
    <div className = "row">
      {[0, 1, 2].map(id =>
        <BribeCard  imgUrl = {props.bribesList[id].imgUrl}
                    name = {props.bribesList[id].name}
                    description = {props.bribesList[id].description}
                    bribeCost = {props.bribesList[id].cost}
                    chanceReduction = {props.bribesList[id].chanceReduction}
                    bribeDuration = {props.bribesList[id].duration}
                    isEnoughGoldToPayBribe = {isEnoughGoldToPayBribe(props.bribesList[id].cost)}
                    payBribe = {(id) => payBribe(id)}
                    id = {id}
                    playerBribe = {props.player.bribe}
                    remainingBribeDuration = {props.remainingBribeDuration}
                    key = {id}/>
      )}
    </div>
  )
}

export default Bribes;
