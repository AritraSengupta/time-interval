import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useStore } from '../store';
import DefaultInput from './DefaultInput';
import { calculateDurationsFromInput } from '../utils';

const NavigationBar = (props) => {
  const { links } = props;
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const reset = useStore(state => state.reset);
  const defaultDuration = useStore(state => state.duration);
  const durationLabel = useStore(state => state.durationLabel);
  const setTimes = useStore(state => state.setTimes);

  const onSave = (val) => {
    setShowModal(false);
    const {
      startTime,
      endTime,
      duration,
    } = calculateDurationsFromInput(val);
    const durationLabel = 'DEFAULT';
    setTimes(duration, startTime, endTime, durationLabel, 'INPUT');
  };
  const onReset = () => {
    reset();
    history.push('/');
  };
  const onCancel = () => setShowModal(false);
  const onClickShowModal = () => setShowModal(true);

  return (
    <div className={'navigation-background'}>
      <span className={'links-holder'}>
        {links.map(link => {
          let currentLink = false;
          if (location.pathname === link.to) {
            currentLink = true;
          }
          return (
            <span key={link.to}>
              {
                currentLink
                  ? <span className={'links'}>{link.name}</span>
                  : <Link to={link.to} className={'links'}>{link.name}</Link>
              }
            </span>
            
          );
        })}
      </span>
      {showModal && <DefaultInput onSave={onSave} onCancel={onCancel} defaultValue={defaultDuration} />}
      <button onClick={onReset} className={'navigation-button button2'}>Reset</button>
      {durationLabel === 'DEFAULT' && <button onClick={onClickShowModal} className={'navigation-button button4'}>Set Default</button>}
    </div>
  );
}

export default NavigationBar;