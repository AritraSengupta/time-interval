import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { calculateDurationsFromInput } from "./utils";

const NAME = 'time-travel';

// type userActivityType = INPUT | URL

const getDefaultState = (duration) => ({
  activityCount: 0,
  duration,
  ...calculateDurationsFromInput(duration),
  durationLabel: 'DEFAULT',
  userActivityType: 'INPUT',
});

const { state: restoredState } = JSON.parse(localStorage?.getItem(NAME) || "{}");

const store = persist(
  (set, get) => ({
    ...getDefaultState(0),
    ...(restoredState || {}),
    reset: () => {
      localStorage?.clear();
      set(getDefaultState(0));
    },
    setTimes: (duration, startTime, endTime, durationLabel, userActivityType) => set({ duration, startTime, endTime, durationLabel, userActivityType, activityCount: get().activityCount + 1 }),
    setDefault: (value) => set(getDefaultState(Number(value))),
  }),
  {
    name: NAME, // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
);
export const useStore = create(devtools(store));

