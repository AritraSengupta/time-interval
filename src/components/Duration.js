import React, { useEffect, useState } from 'react';

import { useStore } from '../store';
import { calculateDurationsFromInput } from '../utils';
import Label from './Label';

const Duration = () => {
  const label = 'Duration(minutes)';
  const setTimes = useStore(state => state.setTimes);
  const duration = useStore(state => state.duration);
  const [display, setDisplay] = useState(duration);
  const [inputVal, setInputVal] = useState(duration);
  const [showInput, toggleInput] = useState(false);

  useEffect(() => {
    setDisplay(duration);
    setInputVal(duration);
  }, [duration]);

  const buttonClick = () => {
    if (showInput) {
      setDisplay(inputVal);
      const {
        startTime,
        endTime,
        duration,
      } = calculateDurationsFromInput(inputVal);
      setTimes(duration, startTime, endTime, 'CUSTOM', 'INPUT');
    } else { // When clicking edit, reset the value of input box to the display
      setInputVal(display);
    }
    toggleInput(!showInput);
  };
  
  return (
    <React.Fragment>
      {showInput && <React.Fragment>
        <span>{label}</span>
        <input type='number' onChange={(e) => setInputVal(e.target.value)} value={inputVal} />
      </React.Fragment>}
      {!showInput && <div style={{ display: 'inline-block' }}><Label label={label} value={display} /></div>}
      <button className={`icon-button ${showInput ? 'icon-button1' : 'icon-button2'}`} onClick={buttonClick}>{showInput ? '\u2714' : '\u2710'}</button>
      {showInput && <button onClick={() => toggleInput(false)} className={'icon-button icon-button3'}>{'\u2716'}</button>}
    </React.Fragment>
  );
}

export default Duration;