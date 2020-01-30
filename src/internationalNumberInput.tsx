import React from 'react';
import { TextInput } from 'react-native';
import isNil from 'lodash/isNil';

import { NumeralSystem } from './types';
import translateNumber from './translateNumber';

interface Props
  extends Omit<React.ComponentProps<typeof TextInput>, 'onChangeText' | 'value' | 'onChange'> {
  numeralSystem: NumeralSystem;
  value: number | null;
  onChange: (value: number | null) => void;
}

const InternationalNumberInput = ({
  numeralSystem,
  onChange,
  value,
  placeholder,
  keyboardType,
  ...rest
}: Props) => {
  const [text, setText] = React.useState<string | null>(!isNil(value) ? value.toString() : null);

  const convertToNumber = React.useCallback(
    (v: string | null) => translateNumber(numeralSystem, v),
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
