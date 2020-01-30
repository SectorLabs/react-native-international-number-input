# react-native-international-number-input

A wrapper over `react-native`'s `TextInput` that accepts numbers in the specified numeral system.

## Example

    import React from 'react';

    import { InternationalNumberInput } from 'react-native-international-number-input';
    import { EasternArabicNumeralSystem } from 'react-native-international-number-input/systems';

    const MyComponent = () => {
        const [value, setValue] = React.useState(null);

        return (
            <InternationalNumberInput
                numeralSystem={EasternArabicNumeralSystem}
                value={value}
                onChange={setValue}
            />
        );
    };
