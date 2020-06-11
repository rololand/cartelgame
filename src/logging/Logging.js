import React from 'react';

const Logging = (props) => {
  return (
    <div>
      <input value={props.login} onChange={event => props.handleChangeLogin(event.target.value)}/>
      <input value={props.password} onChange={event => props.handleChangePassword(event.target.value)}/>
      <button onClick={() => props.handleLoggingOnClickButton()}>LOGIN</button>
    </div>
  )
}

export default Logging;
