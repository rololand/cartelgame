import React, {useState} from 'react';
import './GameHeader.css';

function GameHeader(props) {
  const [isPopUp, setIsPopUp] = useState(false);
  return (
    <div>
      <div className="headerContainer">
        <div className="headerItem">
          Nick: {props.player.username}
        </div>
        <div className="headerItem">
          Klasa: {props.player.category}
        </div>
        <div className="headerItem">
          Złoto: {props.player.gold}
        </div>
        <div className="headerItem">
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
