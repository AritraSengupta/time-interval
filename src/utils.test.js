import { calculateDurationsFromInput, calculateDurationsFromUrl } from './utils';

describe('utils', () => {
  describe('calculateDurationsFromInput', () => {
    it('should calculate proper values from duration', () => {
      const { startTime, endTime, durationLabel} = calculateDurationsFromInput(0);
      expect(endTime-startTime).toBe(0);
      expect(durationLabel).toBe('CUSTOM');
    });
  });

  describe('calculateDurationsFromUrl', () => {
    it('should calculate duration from url startime', () => {
      const values = calculateDurationsFromUrl({ startTime: 12313232 }, 0, 'DEFAULT');
      expect(values.durationLabel).toBe('CUSTOM');
    });

    it('should take default values if duration same as current duration', () => {
      const values = calculateDurationsFromUrl({ duration: 0 }, 0, 'DEFAULT');
      expect(values.durationLabel).toBe('DEFAULT');
    });

    it('should use the currently stored values if nothing is available in url', () => {
      const values = calculateDurationsFromUrl(undefined, 0, 'DEFAULT');
      expect(values.durationLabel).toBe('DEFAULT');
    });

    it('should otherwise calculate from url', () => {
      const values = calculateDurationsFromUrl({ duration: 1 }, 0, 'DEFAULT');
      expect(values.durationLabel).toBe('CUSTOM');
    });
  });
});