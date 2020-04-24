import React, {useState} from 'react';
import './GameHeader.css';

function GameHeader(props) {
  const [isPopUp, setIsPopUp] = useState(false);
  return (
    <div>
      <div class="headerContainer">
        <div class="headerItem">
          Nick: {props.player.username}
        </div>
        <div class="headerItem">
          Klasa: {props.player.category}
        </div>
        <div class="headerItem">
          Złoto: {props.player.gold}
        </div>
        <div class="headerItem">
          Lvl: {props.player.lvl}
        </div>
      </div>
      <div id="progressBar"
          onMouseEnter={()=>setIsPopUp(true)}
          onMouseLeave={()=>setIsPopUp(false)}>
        <progress value={props.player.exp} max={props.player.expNextLvl}></progress>
        {isPopUp && (
          <div id="progressBarInfo">
            {props.player.exp} / {props.player.expNextLvl}
          </div>
        )}
      </div>
    </div>
  )
}

export default GameHeader;
