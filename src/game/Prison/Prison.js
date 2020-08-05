import React from 'react';

const Prison = (props) => {

  return (
    <div>
      <button onClick={() => props.releaseFromPrison()}>Wyjście z więzienia</button>
    </div>
  )
}

export default Prison;
