import React from 'react';
import './Prison.css';

const Prison = (props) => {
  const url = 'http://localhost:3000/db/others/prison.jpg';
  return (
    <div>
      <h1>Zostałeś złapany!</h1>
      <img className="PrisonImg" src={url} alt={''}/><br />
      <button disabled={props.isEnoughGoldToLeftPrison ? false : true}
              onClick={() => props.releaseFromPrison()}>
        Wyjście z więzienia {props.costOfGettingOutOfPrison} złota
      </button>
    </div>
  )
}

export default Prison;
