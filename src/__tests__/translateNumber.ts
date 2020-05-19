import { NumeralSystem } from '../systems';
import { translateNumber } from '../translate';

const mockNumeralSystem: NumeralSystem = {
  numberCharacters: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  decimalCharacters: ['|', '/'],
};

describe('translateNumbers', () => {
  it('translates integers', () => {
    const translatedValue = translateNumber(mockNumeralSystem, 'rt');
    expect(translatedValue).toBe('34');
  });

  it('translates decimals', () => {
    const translatedValue = translateNumber(mockNumeralSystem, 'rt|qw');
    expect(translatedValue).toBe('34.01');
    const secondDecimal = translateNumber(mockNumeralSystem, 'rt/qw');
    expect(secondDecimal).toBe('34.01');
  });

  it('handles western arabic translatedValues', () => {
    const translatedValue = translateNumber(mockNumeralSystem, '23.09');
    expect(translatedValue).toBe('23.09');
  });

  it('allows mixing in western arabic translatedValues', () => {
    const translatedValue = translateNumber(mockNumeralSystem, 'rt.09');
    expect(translatedValue).toBe('34.09');
  });

  it('does not modify the string in any other way', () => {
    const translatedValue = translateNumber(mockNumeralSystem, 'sdsdl23');
    expect(translatedValue).toBe('sdsdl23');
  });

  it('removes spaces from the input', () => {
    const translatedValue = translateNumber(mockNumeralSystem, '  12');
    expect(translatedValue).toBe('12');
  });
});
