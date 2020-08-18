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
  const [playerId, setPlayerId] = useState("");

  const handleLoggingOnClickButton = () => {
    const url  = 'http://localhost:5000/users/findByUsername/' + login;
    axios.get(url)
      .then(user => {
        if(user.data.password === password) {
          setPlayerId(user.data._id);
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

  const createHero = () => {
    console.log('create hero..');
    const user = {
      username: 'admin',
      password: 'admin',
      email: 'roland.erkiert@gmail.com',
      sex: 'M'
    };

    const urluser  = 'http://localhost:5000/users/add';
    axios.post(urluser, user)
      .then(user => {
        console.log(user);

        const hero = {
          _id: user.data._id,
          username: "admin",
          category: "developer",
          gold: 1000,
          stats: {
            strength: 1,
            dexterity: 1,
            stamina: 1,
            intelligence: 1,
            luck: 1,
            armor: 1
          }
        };

        const urlhero  = 'http://localhost:5000/heros/add';
        axios.post(urlhero, hero)
          .then(hero => {
            console.log(hero);
          })
          .catch(err => {
            console.log('Error: ' + err);
          });
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }
  handleLoggingOnClickButton();
  return (
    <div className="App">
      {isUserLogged ?
        <Game onClickLogout={() => setUserLogged(false)}
              playerId={playerId}/> :
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
