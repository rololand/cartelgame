import React from 'react';

class Logging extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input value="Login" />
        <input value="Password" />
        <button onClick={this.props.handleLogging}>LOGIN</button>

      </div>
    )
  }
}

export default Logging;
