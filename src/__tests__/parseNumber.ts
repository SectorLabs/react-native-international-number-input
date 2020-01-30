import { NumberType, parseNumber } from '../parse';

describe('parseNumber', () => {
  it('parses integers', () => {
    expect(parseNumber(NumberType.INTEGER, '12')).toBe(12);
  });

  it('parses decimals', () => {
    expect(parseNumber(NumberType.DECIMAL, '12.4')).toBe(12.4);
  });

  it('rejects decimals in integers', () => {
    expect(parseNumber(NumberType.INTEGER, '12.4')).toBe(null);
  });

  [null, ''].forEach(inputValue => {
    Object.keys(NumberType).forEach(numberTypeName => {
      const numberType = NumberType[numberTypeName];

      it(`returns null for ${inputValue} as ${numberType}`, () => {
        expect(parseNumber(numberType, inputValue)).toBe(null);
      });
    });
  });

  it('returns zero for zero', () => {
    expect(parseNumber(NumberType.INTEGER, '0')).toBe(0);
  });
});
