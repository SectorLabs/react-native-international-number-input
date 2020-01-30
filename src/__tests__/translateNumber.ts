import translateNumber from '../translateNumber';
import { NumeralSystem } from '../types';

const mockNumeralSystem: NumeralSystem = {
  numberCharacters: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  decimalCharacter: '|',
};

describe('translateNumbers', () => {
  it('translates integers', () => {
    const number = translateNumber(mockNumeralSystem, 'rt');
    expect(number).toBe(34);
  });

  it('translates decimals', () => {
    const number = translateNumber(mockNumeralSystem, 'rt|qw');
    expect(number).toBe(34.01);
  });

  it('handles western arabic numbers', () => {
    const number = translateNumber(mockNumeralSystem, '23.09');
    expect(number).toBe(23.09);
  });

  it('allows mixing in western arabic numbers', () => {
    const number = translateNumber(mockNumeralSystem, 'rt.09');
    expect(number).toBe(34.09);
  });

  it('returns NaN for invalid numbers', () => {
    const number = translateNumber(mockNumeralSystem, 'sdsdl23');
    expect(Number.isNaN(number)).toBe(true);
  });
});
