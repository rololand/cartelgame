import React from 'react';
import './BribeCard.css';
import displayTime from './../../utils/displayTime';
import ProgressBar from './../../utils/ProgressBar';

const BribeCard = (props) => {
  const imgUrl = 'http://localhost:3000/db/avatars/' + props.imgUrl
  let remainingBribeDuration = props.remainingBribeDuration
  remainingBribeDuration = Number.isInteger(remainingBribeDuration) ?
                                  remainingBribeDuration :
                                  props.bribeDuration
  const bribeElapsedTime = props.bribeDuration - remainingBribeDuration
  return (
    <div className = "card">
      <img className = "cardImg" src={imgUrl} alt={''}/>
      <h1 className = "bribeHeader">{props.name}</h1>
      <p className = "bribeDescription">{props.description}</p>
      Koszt: {props.bribeCost}<br />
      Czas trwania: {displayTime(props.bribeDuration)}<br />
      Redukuje szansę złapania do więzienia o: {props.chanceReduction}%<br />
      {props.heroBribe.isPayed && props.heroBribe.id === props.id ?
        <div>
          {displayTime(remainingBribeDuration)} <br />
          <ProgressBar value={bribeElapsedTime}
                    max={props.bribeDuration} />
        </div> :
        <button disabled={props.isEnoughGoldToPayBribe && !props.heroBribe.isPayed? false : true}
                onClick={() => props.payBribe(props.id)}>
          Zapłać łapówkę!
        </button>}
    </div>
  )
}

export default BribeCard;
