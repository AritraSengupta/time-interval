import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import {
  Switch,
  useHistory,
  useLocation,
  Route,
} from "react-router-dom";
import { ScreenA, ScreenB, ScreenC } from './screens';
import { useStore } from './store';

import './App.css';
import { calculateDurationsFromUrl } from './utils';
import { NavigationBar } from './components';

const links = [
  {
    name: 'Screen A',
    to: '/screenA',
  },
  {
    name: 'Screen B',
    to: '/screenB',
  },
  {
    name: 'Screen C',
    to: '/screenC',
  }
];

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function useLocationListener() {
  const location = useLocation();
  const history = useHistory();
  const duration = useStore(state => state.duration);
  const setTimes = useStore(state => state.setTimes);
  const durationLabel = useStore(state => state.durationLabel);
  const parsedQuery = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const prevPath = usePrevious(location.pathname);

  const values = calculateDurationsFromUrl(parsedQuery, duration, durationLabel);

  useEffect(() => { // In case the path changes calculate everything from new
    if (prevPath !== location.pathname) {
      const newQuery = {
        ...parsedQuery,
        ...values,
      };
      location.pathname = location.pathname === '/' ? '/screenA' : location.pathname;
      const {
        startTime: currentStartTime,
        endTime: currentEndTime,
        duration: currentDuration,
        durationLabel: currentDurationLabel,
      } = values;
      setTimes(currentDuration, currentStartTime, currentEndTime, currentDurationLabel, 'URL');
      history.push({
        ...location,
        search: qs.stringify(newQuery),
      });
    }
  }, [location.pathname, history, location, parsedQuery, prevPath, setTimes, values]);
}

function App() {
  useLocationListener();

  return (
    <React.Fragment>
      <NavigationBar links={links} />
      <Switch>
        <Route exact path="/screenA">
          <ScreenA />
        </Route>
        <Route exact path="/screenB">
          <ScreenB />
        </Route>
        <Route exact path="/screenC">
          <ScreenC />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
