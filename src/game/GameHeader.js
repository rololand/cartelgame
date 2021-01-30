import React, {useState} from 'react';
import './GameHeader.css';
import ProgressBar from './../utils/ProgressBar';

const GameHeader = (props) => {
  const [isPopUp, setIsPopUp] = useState(false);
  return (
    <div>
      <div className="headerContainer">
        <div className="headerItem">
          Nick: {props.hero.username}
        </div>
        <div className="headerItem">
          Klasa: {props.hero.category}
        </div>
        <div className="headerItem">
          Złoto: {props.hero.gold}
        </div>
        <div className="headerItem">
          Lvl: {props.hero.lvl}
        </div>
      </div>
      <div  id="progressBarHeader"
            onMouseEnter={()=>setIsPopUp(true)}
            onMouseLeave={()=>setIsPopUp(false)}>
        <ProgressBar value={props.hero.exp} max={props.hero.expNextLvl}/>
        {isPopUp && (
          <div id="progressBarHeaderInfo">
            {props.hero.exp} / {props.hero.expNextLvl}
          </div>
        )}
      </div>
    </div>
  )
}

export default GameHeader;
