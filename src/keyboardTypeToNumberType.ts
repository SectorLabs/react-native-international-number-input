import { KeyboardTypeOptions } from 'react-native';

import { NumberType } from './parse';

const keyboardTypeToNumberType = (keyboardType: KeyboardTypeOptions): NumberType => {
  switch (keyboardType) {
    case 'decimal-pad':
    case 'numeric':
      return NumberType.DECIMAL;

    case 'number-pad':
      return NumberType.INTEGER;

    default:
      throw new Error(
        'Invalid keyboardType, this is a numeric input. Use a keyboardType that accepts numbers only.',
      );
  }
};

export default keyboardTypeToNumberType;
