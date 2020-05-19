import { NumeralSystem } from './systems';

/**
 * Translates a number that was written in the specified numeral
 * system into the Western Arabic numeral system.
 */
export const translateNumber = (
  numeralSystem: NumeralSystem,
  value: string | null,
): string | null => {
  if (!value) {
    return null;
  }

  let normalizedNumber = '';

  for (let i = 0; i < value.length; ++i) {
    const char = value[i];

    if (numeralSystem.decimalCharacters.includes(char)) {
      normalizedNumber += '.';
      continue;
    }

    const convertedChar = numeralSystem.numberCharacters.indexOf(char);
    if (convertedChar >= 0) {
      normalizedNumber += convertedChar;
    } else {
      normalizedNumber += char;
    }
  }

  return normalizedNumber.replace(/ /g, '');
};
