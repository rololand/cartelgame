import React from 'react';
import './Prison.css';
import displayTime from './../../utils/displayTime.js';

const Prison = (props) => {
  const url = 'http://localhost:3000/db/others/prison.jpg';
  let remainingPrisonDuration = props.remainingPrisonDuration
  remainingPrisonDuration = Number.isInteger(remainingPrisonDuration) ?
                                  remainingPrisonDuration :
                                  props.prisonDuration
  const prisonElapsedTime = props.prisonDuration - remainingPrisonDuration
  return (
    <div>
      <h1>Zostałeś złapany!</h1>
      <img className="PrisonImg" src={url} alt={''}/><br />
      {displayTime(remainingPrisonDuration)} <br />
      <progress value={prisonElapsedTime}
                max={props.prisonDuration}>
      </progress>
      <h2>Przeczekaj odsiadkę lub opłać kaucję</h2>
      <button disabled={props.isEnoughGoldToLeftPrison ? false : true}
              onClick={() => props.releaseFromPrison()}>
        Wyjdź z więzienia za {props.costOfGettingOutOfPrison} złota
      </button>
    </div>
  )
}

export default Prison;
