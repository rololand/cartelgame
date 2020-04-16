import React from 'react';

class Logging extends React.Component {
  render() {
    return (
      <div>
        <input value={this.props.login} onChange={this.props.handleChangeLogin}/>
        <input value={this.props.password} onChange={this.props.handleChangePassword}/>
        <button onClick={this.props.handleLoggingOnClickButton}>LOGIN</button>
      </div>
    )
  }
}

export default Logging;
