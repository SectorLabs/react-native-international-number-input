import React from 'react';
import { TextInput } from 'react-native';

import { NumeralSystem } from './system';
import translateNumber from './translateNumber';

interface Props extends Omit<React.ComponentProps<typeof TextInput>, 'onChangeText' | 'value'> {
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
  const [text, setText] = React.useState((value || '').toString());

  const convertToNumber = React.useCallback(
    v => translateNumber(numberCharacters, decimalCharacter, v),
    [numberCharacters, decimalCharacter],
  );

  React.useEffect(() => {
    if (convertToNumber(text) !== value) {
      setText(value);
    }
  }, [value]);

  return (
    <TextInput
      placeholder={(placeholder || '').toString()}
      keyboardType={keyboardType || 'decimal-pad'}
      value={text}
      onChangeText={React.useCallback(text => {
        const number = convertToNumber(text);

        if (Number.isNaN(number)) {
          onChange(null);
          setText('');
        } else {
          onChange(number);
          setText(text);
        }
      })}
      {...rest}
    />
  );
};

export default InternationalNumberInput;
