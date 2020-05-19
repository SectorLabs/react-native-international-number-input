import React from 'react';
import { TextInput } from 'react-native';
import isNil from 'lodash/isNil';

import { parseNumber } from './parse';
import { NumeralSystem } from './systems';
import { translateNumber } from './translate';
import keyboardTypeToNumberType from './keyboardTypeToNumberType';

interface Props
  extends Omit<React.ComponentProps<typeof TextInput>, 'onChangeText' | 'value' | 'onChange'> {
  numeralSystem: NumeralSystem;
  value: number | null;
  onChange: (value: number | null) => void;
}

const InternationalNumberInput = React.forwardRef<TextInput, Props>(
  ({ numeralSystem, onChange, value, placeholder, keyboardType = 'decimal-pad', ...rest }, ref) => {
    const [text, setText] = React.useState<string | null>(!isNil(value) ? value.toString() : null);

    const numberType = keyboardTypeToNumberType(keyboardType);

    const convertToNumber = React.useCallback(
      (v: string | null) => parseNumber(numberType, translateNumber(numeralSystem, v)),
      [numeralSystem, numberType],
    );

    React.useEffect(() => {
      if (convertToNumber(text) !== value) {
        setText(!isNil(value) ? value.toString() : null);
      }
    }, [value]);

    return (
      <TextInput
        ref={ref}
        placeholder={!isNil(placeholder) ? placeholder.toString() : ''}
        keyboardType={keyboardType || 'decimal-pad'}
        value={text || ''}
        onChangeText={React.useCallback(
          (text: string) => {
            const number = convertToNumber(text);

            if (isNil(number)) {
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
  },
);

export default InternationalNumberInput;
