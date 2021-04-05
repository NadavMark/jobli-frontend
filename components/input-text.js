import * as React from 'react';
import Theme from '../theme';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const InputText = (props) => {
    const wrapperStyle = [styles.wrapper, props.wrapperStyle]
    return (
        <View style={wrapperStyle}>
            <Input
                accessibilityLabel={props.accessibilityLabel || props.label}
                {...props}
                {...inputStyleProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 72,
    },
    inputContainerStyle: {
        flex: 1,
    },
    inputLabelStyle: {
        textAlign: 'right',
        color: Theme.textColor
    },
    inputStyle: {
        flex: 1,
        direction: 'rtl',
        textAlign: 'right'
    },
});

const inputStyleProps = {
    containerStyle: styles.inputContainerStyle,
    labelStyle: styles.inputLabelStyle,
    inputStyle: styles.inputStyle
}

export default InputText;