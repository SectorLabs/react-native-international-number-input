import React from 'react';
import { TextInput, KeyboardTypeOptions } from 'react-native';
import isNil from 'lodash/isNil';

import { NumeralSystem } from './types';
import translateNumber from './translateNumber';

interface Props
  extends Omit<React.ComponentProps<typeof TextInput>, 'onChangeText' | 'value' | 'onChange'> {
  numeralSystem: NumeralSystem;
  value: number | null;
  onChange: (value: number | null) => void;
}

const determineInterpretFunc = (keyboardType: KeyboardTypeOptions) => {
  switch (keyboardType) {
    case 'decimal-pad':
    case 'numeric':
      return Number.parseFloat;

    case 'number-pad':
      return Number.parseInt;

    default:
      throw new Error(
        'Invalid keyboardType, this is a numeric input. Use a keyboardType that accepts numbers only.',
      );
  }
};

const InternationalNumberInput = ({
  numeralSystem,
  onChange,
  value,
  placeholder,
  keyboardType = 'decimal-pad',
  ...rest
}: Props) => {
  const [text, setText] = React.useState<string | null>(!isNil(value) ? value.toString() : null);

  const interpretFunc = determineInterpretFunc(keyboardType);

  const convertToNumber = React.useCallback(
    (v: string | null) => translateNumber(interpretFunc, numeralSystem, v),
    [numeralSystem],
  );

  React.useEffect(() => {
    if (convertToNumber(text) !== value) {
      setText(!isNil(value) ? value.toString() : null);
    }
  }, [value]);

  return (
    <TextInput
      placeholder={!isNil(placeholder) ? placeholder.toString() : ''}
      keyboardType={keyboardType || 'decimal-pad'}
      value={text || ''}
      onChangeText={React.useCallback(
        (text: string) => {
          const number = convertToNumber(text);

          if (Number.isNaN(number)) {
            onChange(null);
            setText('');
          } else {
            onChange(number);
            setText(text);
          }
        },
        [convertToNumber, text, setText, onChange],
      )}
      {...rest}
    />
  );
};

export default InternationalNumberInput;
