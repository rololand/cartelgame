import React from 'react';
import BribeCard from './BribeCard.js'

const Bribes = (props) => {
  const isEnoughGoldToPayBribe = (bribeCost) => {
    return props.hero.gold > bribeCost
  }

  const payBribe = (bribeId) => {
    const newHero = props.hero
    if (isEnoughGoldToPayBribe(props.bribesList[bribeId].cost)) {
      console.log("pay bribe")
      newHero.gold -= props.bribesList[bribeId].cost
      newHero.prison.chance -= props.bribesList[bribeId].chanceReduction
      newHero.bribe.isPayed = true
      newHero.bribe.chanceReduction = props.bribesList[bribeId].chanceReduction
      newHero.bribe.id = bribeId
      const date = new Date();
      newHero.bribe.endTime = new Date(date.getTime() + props.bribesList[bribeId].duration*1000).getTime()
      console.log(newHero)
      props.updateHero(newHero)
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
                    heroBribe = {props.hero.bribe}
                    remainingBribeDuration = {props.remainingBribeDuration}
                    key = {id}/>
      )}
    </div>
  )
}

export default Bribes;
