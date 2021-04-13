const calculateParams = (val) => {
  const duration = Number(val);
  const endTime = Date.now();
  const durationInMs = duration * 60 * 1000; // duration in ms
  const startTime = endTime - durationInMs;

  return {
    startTime,
    endTime,
    duration,
  };
}

export const calculateDurationsFromInput = (duration) => {
  return {
    ...calculateParams(duration),
    durationLabel: 'CUSTOM',
  };
}


const notDefined = val => val === null || val === undefined;
export const calculateDurationsFromUrl = (urlParams, currentDuration, currentDurationLabel) => {
  const { duration: urlDuration, startTime: urlStartTime } = urlParams;
  let duration;
  let durationLabel;
  if (notDefined(urlDuration) || Number(urlDuration) === Number(currentDuration)) {
    if (notDefined(urlDuration) && urlStartTime) { // calculate duration from partial url
      const endTime = Date.now();
      const durationInMs = endTime - Number(urlStartTime);
      duration = durationInMs / (60000);
      durationLabel = 'CUSTOM';
    } else { // If not possible to calculate from partial
      duration = currentDuration;
      durationLabel = currentDurationLabel;
    }
  } else {
    duration = urlDuration;
    durationLabel = 'CUSTOM';
  }

  return {
    ...calculateParams(duration),
    durationLabel,
  };
}