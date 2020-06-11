import React from 'react';

const AddStatsButton = (props) => {
  return (
    <div>
      <button onClick={() => props.onClick(props.statName)} disabled={props.isDisabled ? true : false}>+</button>
      Koszt: {props.cost}
    </div>
  )
}

export default AddStatsButton;
