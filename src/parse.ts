import isNil from 'lodash/isNil';

export enum NumberType {
  INTEGER = 'integer',
  DECIMAL = 'decimal',
}

/**
 * Stricter version of {@see Number.parseInt} that doesn't tolerate
 * and convert decimal numbers into integers.
 *
 * {@see Number.parseInt} would return `2` when given `'1.2'`. This
 * version would return NaN.
 */
const parseInteger = (value: string | null): number => {
  const normalizedValue = value || '';
  const containsDecimal = normalizedValue.includes('.');
  return Number.parseInt(containsDecimal ? '' : normalizedValue);
};

export const parseNumber = (type: NumberType, value: string | null): number | null => {
  if (isNil(value) || value === '') {
    return null;
  }

  let parsedValue = null;
  switch (type) {
    case NumberType.INTEGER:
      parsedValue = parseInteger(value);
      break;

    case NumberType.DECIMAL:
      parsedValue = Number.parseFloat(value || '');
      break;
  }

  if (isNil(parsedValue) || Number.isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
};
