import React, {useState} from 'react';
import './GameHeader.css';
import ProgressBar from './../utils/ProgressBar';

const GameHeader = (props) => {
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
      <div  id="progressBarHeader"
            onMouseEnter={()=>setIsPopUp(true)}
            onMouseLeave={()=>setIsPopUp(false)}>
        <ProgressBar value={props.player.exp} max={props.player.expNextLvl}/>
        {isPopUp && (
          <div id="progressBarHeaderInfo">
            {props.player.exp} / {props.player.expNextLvl}
          </div>
        )}
      </div>
    </div>
  )
}

export default GameHeader;
