import React, {useState} from 'react';
import './EquipmentCard.css';
import statsNamesPL from './../../utils/statsNamesPL.js';
import statsNamesEN from './../../utils/statsNamesEN.js';

function BackpackCard(props) {
  const [isPopUpStats, setIsPopUpStats] = useState(false);
  const url = 'http://localhost:3000/db/items/' + props.equipment.imgUrl;

  return (
    <div  className="equipmentCard"
          onMouseEnter={()=>setIsPopUpStats(true)}
          onMouseLeave={()=>setIsPopUpStats(false)}>
      <div>
        <img src={url} alt={''}/>
      </div>
      {isPopUpStats && (props.equipment.name !== '') && (
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
          Wartość: {props.equipment.price}
          <div>
            <button onClick={() => props.dressEquipment(props.equipment, props.id)}>zaloz</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackpackCard;
