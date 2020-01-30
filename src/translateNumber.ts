import { NumeralSystem } from './types';

type InterpretFunc = (value: string | null) => number;

/**
 * Translates a number that was written in the specified numeral
 * system into a {@see Number}.
 *
 * @param numeralSystem Numeral system used in the input string.
 * @param value Value containing a number in the specified numeral system.
 * @returns NaN if the number could not be converted or the input
 * is not a valid number after translation.
 */
const translateNumber = (
  interpretFunc: InterpretFunc,
  numeralSystem: NumeralSystem,
  value: string | null,
): number => {
  if (!value) {
    return interpretFunc(value);
  }

  let normalizedNumber = '';

  for (let i = 0; i < value.length; ++i) {
    const char = value[i];

    if (char === numeralSystem.decimalCharacter) {
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

  return interpretFunc(normalizedNumber);
};

export default translateNumber;
