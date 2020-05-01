import React, {useState} from 'react';
import './EquipmentCard.css';

function EquipmentCard(props) {
  const [isPopUp, setIsPopUp] = useState(false);
  const url = 'http://localhost:3000/db/items/' + props.equipment.imgUrl;
  const statsNamesPL = ["siła", "zręczność", "wytrzymałość", "inteligencja", "szczęście", "pancerz"];
  const statsNamesEN = ["strength", "dexterity", "stamina", "intelligence", "luck", "armor"];

  return (
    <div className="equipmentCard">
      <div  onMouseEnter={()=>setIsPopUp(true)}
            onMouseLeave={()=>setIsPopUp(false)}>
        <img src={url} alt={''}/>
      </div>
      {isPopUp && (props.equipment.name != '') && (
        <div className="equipmentInfo">
          <span className="equipmentTitle">{props.equipment.name}</span>
          <span className="equipmentDescription">{props.equipment.description}</span>
          {statsNamesEN.map((statName, index)=>
            <div key={statName} className="statsName">
              {props.equipment.stats[statName] > 0 && (
                <span>
                  {statsNamesPL[index]}: {props.equipment.stats[statName]}
                </span>
              )}

            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EquipmentCard;
