import React from 'react';
import './GameMenu.css';

function GameMenu(props) {

  return (

    <div className="menuContainer">
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Brief")}>Brief</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("MeetingRoom")}>Meeting Room {props.meetingRoomAlert}</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("OpenSpace")}>Open Space</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Assets")}>Assets</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("CoffeeBreak")}>Coffee Break</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("ItSupport")}>IT Support</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Market")}>Market</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Office")}>Office</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Team")}>Team</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("MailBox")}>MailBox</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClick("Evaluation")}>Evaluation</button></div>
      <div className="menuButtonContainer"><button onClick={() => props.onClickLogout()}>LogOut</button></div>
    </div>
  )

}

export default GameMenu;
