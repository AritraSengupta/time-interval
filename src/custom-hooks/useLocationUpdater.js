import { useEffect } from 'react';
import qs from 'qs';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';

import { useStore } from '../store';
import { calculateDurationsFromUrl } from '../utils';
import usePrevious from './usePrevious';

function useLocationUpdater() {
  const location = useLocation();
  const history = useHistory();
  const duration = useStore(state => state.duration);
  const startTime = useStore(state => state.startTime);
  const endTime = useStore(state => state.endTime);
  const setTimes = useStore(state => state.setTimes);
  const userActivityType = useStore(state => state.userActivityType);
  const durationLabel = useStore(state => state.durationLabel);
  const parsedQuery = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const prevPath = usePrevious(location.pathname);
  const prevEndTime = usePrevious(endTime);
  // const values = calculateDurationsFromUrl(parsedQuery, duration, durationLabel);

  useEffect(() => {
    if (prevPath === location.pathname && userActivityType === 'INPUT' && prevEndTime !== endTime) {
      console.log('mark://', 'INPUT Actitivity', {duration, startTime, endTime, userActivityType})
      const newQuery = {
        ...parsedQuery,
        duration,
        startTime,
        endTime,
      };
      history.push({
        ...location,
        search: qs.stringify(newQuery),
      });
    }
  }, [location.pathname, prevPath, duration, startTime, endTime, userActivityType, durationLabel, history, location, parsedQuery, prevEndTime]);

  useEffect(() => { // In case the path changes calculate everything from new
    if (prevPath !== location.pathname) {
      const {
        startTime: currentStartTime,
        endTime: currentEndTime,
        duration: currentDuration,
        durationLabel: currentDurationLabel,
      } = calculateDurationsFromUrl(parsedQuery, duration, durationLabel);
      const newQuery = {
        ...parsedQuery,
        startTime: currentStartTime,
        endTime: currentEndTime,
        duration: currentDuration,
      };
      location.pathname = location.pathname === '/' ? '/screenA' : location.pathname;
      setTimes(currentDuration, currentStartTime, currentEndTime, currentDurationLabel, 'URL');
      history.push({
        ...location,
        search: qs.stringify(newQuery),
      });
    }
  }, [location.pathname, history, location, parsedQuery, prevPath, setTimes, duration, durationLabel]);
}

export default useLocationUpdater;