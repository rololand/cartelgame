import React from 'react';
import './GameMenu.css';

function GameMenu(props) {

  return (

    <div className="menuContainer">
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Hero")}>Bohater</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("City")}>Miasto {props.CityAlert}</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Residence")}>Willa</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Warehouse")}>Magazyn</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Lab")}>Labolatorium</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Bribes")}>Łapówki</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Map")}>Mapa</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Socios")}>Socios</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Cartel")}>Kartel</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("MailBox")}>MailBox</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Shop")}>Sklep</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClickLogout()}>LogOut</button></div>
    </div>
  )

}

export default GameMenu;
