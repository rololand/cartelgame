import React from 'react';
import './GameMenu.css';

class GameMenu extends React.Component {

  render() {
    return (

      <div className="menuContainer">
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("Brief")}>Brief</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("MeetingRoom")}>Meeting Room</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("OpenSpace")}>Open Space</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("Assets")}>Assets</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("CoffeeBreak")}>Coffee Break</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("ItSupport")}>IT Support</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("Market")}>Market</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("Office")}>Office</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("Team")}>Team</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("MailBox")}>MailBox</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClick("Evaluation")}>Evaluation</button></div>
        <div className="menuButtonContainer"><button onClick={() => this.props.onClickLogout()}>LogOut</button></div>
      </div>
    )
  }
}

export default GameMenu;
