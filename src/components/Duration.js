import React, { useEffect, useState } from 'react';
import qs from 'qs';
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { useStore } from '../store';
import { calculateDurationsFromInput } from '../utils';
import Label from './Label';

const Duration = () => {
  const label = 'Duration(minutes)';
  const setTimes = useStore(state => state.setTimes);
  const duration = useStore(state => state.duration);
  const location = useLocation();
  const history = useHistory();
  const [display, setDisplay] = useState(duration);
  const [inputVal, setInputVal] = useState(duration);
  const [showInput, toggleInput] = useState(false);

  const parsedQuery = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  useEffect(() => {
    setDisplay(duration);
    setInputVal(duration);
  }, [duration]);

  const buttonClick = () => {
    if (showInput) {
      // Submit Value
      setDisplay(inputVal);
      const {
        startTime,
        endTime,
        duration,
      } = calculateDurationsFromInput(inputVal);
      const newQuery = {
        ...parsedQuery,
        duration,
        startTime,
        endTime,
        durationLabel: 'CUSTOM',
      };
      setTimes(duration, startTime, endTime, 'CUSTOM', 'INPUT');
      history.push({
        ...location,
        search: qs.stringify(newQuery),
      });
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
      <button className={'icon-button'} onClick={buttonClick}>{showInput ? '\u2714' : '\u2710'}</button>
      {showInput && <button onClick={() => toggleInput(false)} className={'icon-button'}>{'\u2716'}</button>}
    </React.Fragment>
  );
}

export default Duration;