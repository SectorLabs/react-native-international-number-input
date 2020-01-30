# react-native-international-number-input

A wrapper over `react-native`'s `TextInput` that accepts numbers in the specified numeral system.

## Example

    import React from 'react';

    import {
        NumeralSystems,
        InternationalNumberInput,
    } from 'react-native-international-number-input';

    const MyComponent = () => {
        const [value, setValue] = React.useState(null);

        return (
            <InternationalNumberInput
                value={value}
                onChange={setValue}
                numeralSystem={NumeralSystems.EasternArabic}
            />
        );
    };
