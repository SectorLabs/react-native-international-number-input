# react-native-international-number-input

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/react-native-international-number-input.svg)](https://badge.fury.io/js/react-native-international-number-input)

A wrapper over `react-native`'s `TextInput` that accepts numbers in the specified numeral system.

In plain English: a simple text input component that allows users to enter numbers in their native language. For example, Arabic speakers can enter Eastern-Arabic numbers. The application will receive the number translated/transformed to a `number`.

## Installation
### NPM

    npm install react-native-international-number-input
    
### Yarn
    
    yarn add react-native-international-number-input

## Usage
### Full example
The `InternationalNumberInput` is a thin wrapper over react-native's [`TextInput`](https://facebook.github.io/react-native/docs/textinput) component. It accepts all props that `TextInput` does and some additional ones.

`InternationalNumberInput` is a managed/controlled component. You **must** manage the current state/value of the component as described below. [Read more about controlled components.](https://reactjs.org/docs/forms.html#controlled-components).

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

### Characteristics
* Validates numbers based on the specified `keyboardType`.
    * `keyboardType=decimal-pad` would only allow decimal numbers to be inputted.
    * `keyboardType=number-pad` would only allow integers to be inputted.

    `keyboardType` not only changes the keyboard type the user is shown but it also adds extra validation and prevents the user from entering invalid input.

* Returns `null` in the `onChange` callback when the input is invalid or non-existent/empty.
