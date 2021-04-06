import React from "react";
import Theme from '../theme';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Chips = (props) => {
    const { value, onPress, chipStyle, chipBtnText = 'x' } = props;
    return (
        <TouchableOpacity style={[styles.chip, chipStyle]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[{ paddingHorizontal: 5 }]}>{value}</Text>
                <View style={styles.chipCloseBtn}><Text style={styles.chipBtnTxt}>{chipBtnText}</Text></View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chip: {
        borderColor: '#848787',
        borderWidth: 1,
        margin: 4,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 15
    },
    chipCloseBtn: {
        borderRadius: 8,
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        color: Theme.textColor
    },
    chipBtnTxt: {
        color: Theme.c3,
        fontSize: 20,
        marginTop: -4,
        paddingBottom: 3
    }
})

export default Chips;