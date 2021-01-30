import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import Logging from './logging/Logging.js'
import LogErrMsg from './logging/LogErrMsg.js'
import Game from './game/Game.js'

const App = (props) => {
  const [isUserLogged, setUserLogged] = useState(false);
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [logErrMsg, setLogErrMsg] = useState("");
  const [heroId, setHeroId] = useState("");

  const handleLoggingOnClickButton = () => {
    const url  = 'https://5cohdjbvl4.execute-api.us-east-1.amazonaws.com/dev/users/' + login;
    axios.get(url)
      .then(user => {
        if(user.data.password === password) {
          setHeroId(user.data._id);
          setUserLogged(true);
          setLogErrMsg("");
        } else {
          setLogErrMsg("Nieprawidłowe hasło.");
        }
      })
      .catch(err => {
        console.log('Error: ' + err);
        setLogErrMsg("Podany login nie istnieje.");
      });
  }


  return (
    <div className="App">
      {isUserLogged ?
        <Game onClickLogout={() => setUserLogged(false)}
              heroId={heroId}/> :
        <div>
          <Logging  handleLoggingOnClickButton={() => handleLoggingOnClickButton()}
                    handleChangeLogin={value => setLogin(value)}
                    handleChangePassword={value => setPassword(value)}
                    login={login}
                    password={password}
          />
          <LogErrMsg logErrMsg={logErrMsg} />
        </div>
      }
    </div>
  )

}

export default App;
