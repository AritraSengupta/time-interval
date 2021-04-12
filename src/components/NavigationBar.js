import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

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
  const setTimes = useStore(state => state.setTimes);
  const parsedQuery = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const onSave = (val) => {
    setShowModal(false);
    const {
      startTime,
      endTime,
      duration,
    } = calculateDurationsFromInput(val);
    const durationLabel = 'DEFAULT';
    const newQuery = {
      ...parsedQuery,
      duration,
      startTime,
      endTime,
      durationLabel,
    };
    setTimes(duration, startTime, endTime, durationLabel, 'INPUT');
    history.push({
      ...location,
      search: qs.stringify(newQuery),
    });
  };

  const onCancel = () => setShowModal(false);
  const onClickShowModal = () => setShowModal(true);

  return (
    <div className={'navigation-background'}>
      {links.map(link => {
        let currentLink = false;
        if (location.pathname === link.to) {
          currentLink = true;
        }
        return (
          <React.Fragment key={link.to}>
            {
              currentLink
                ? <span className={'links'}>{link.name}</span>
                : <Link to={link.to} className={'links'}>{link.name}</Link>
            }
          </React.Fragment>
          
        );
      })}
      {showModal && <DefaultInput onSave={onSave} onCancel={onCancel} defaultValue={defaultDuration} />}

      <button onClick={() => {
        reset();
        history.push('/');
      }}
      className={'navigation-button'}
      >Reset</button>
      <button onClick={onClickShowModal} className={'navigation-button'}>Set Default</button>
    </div>
  );
}

export default NavigationBar;