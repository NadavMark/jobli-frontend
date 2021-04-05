import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Button } from 'react-native-elements';
import { JOBLI_FONT, PRIMARY_BTN, SECONDARY_BTN } from '../assets/theme';

export default function ChooseUserTypeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Image style={styles.imageStyle} resizeMode="contain" source={require('./../assets/images/JobliLogo.png')} />
            <View style={styles.contentContainer}>
                <Text style={[styles.textStyle, JOBLI_FONT]}>מה ברצונך לעשות?</Text>
                <Button
                    buttonStyle={[styles.choosetypeBtn, styles.seekingForWorkBtnStyle, PRIMARY_BTN.BTN_STYLE]}
                    title="לחפש עבודה"
                    titleStyle={PRIMARY_BTN.TITLE_STYLE}
                    onPress={() => navigation.navigate('יצירת פרופיל מחפש עבודה')}
                />
                <Button
                    buttonStyle={[styles.choosetypeBtn, styles.seekingForEmployeesBtnStyle, SECONDARY_BTN.BTN_STYLE]}
                    title="לחפש עובדים"
                    titleStyle={SECONDARY_BTN.TITLE_STYLE}
                    onPress={() => navigation.navigate('יצירת פרופיל מעסיק')}
                />
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 162,
        height: 74,
        marginTop: 100
    },
    textStyle: {
        fontSize: 22,
        fontFamily: 'Rubik',
        color: '#000000',
        marginBottom: 20,
    },
    choosetypeBtn: {
        margin: 15
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seekingForWorkBtnStyle: {
        width: 251,
    },
    seekingForEmployeesBtnStyle: {
        width: 165,
    }
})