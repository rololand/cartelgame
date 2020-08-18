import React, { useState, useEffect } from 'react';
import './ProgressBar.css'

const ProgressBar = (props) => {


  return (
    <progress value={props.value} max={props.max}></progress>
  )
}

export default ProgressBar;
