import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Theme from '../../theme';
import ReactChipsInput from 'react-native-chips';
import Chips from '../../components/chips';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const optionalValues = [
    'שוטף כלים',
    'פקיד',
    'רואה חשבון',
];

export default function PostJobWizardStep2({ next }) {
    const [list, updateList] = React.useState([]);

    function addToSelectedList(item) {
        updateList([...list, item]);
    }

    function removefromSelectedList(itemToRemove) {
        const newList = list.filter(item => item !== itemToRemove)
        updateList(newList);
    }

    function submit() {
        Alert.alert('', JSON.stringify(list));
        next();
    }

    return (
        <View accessible={true} style={styles.wrapper}>
            <Text style={styles.title}>מה היקף המשרה</Text>
            
            <View accessible={true} style={styles.buttonsWrapper}>
                <Button
                    onPress={submit}
                    accessibilityLabel="המשך לשלב הבא"
                    buttonStyle={{ backgroundColor: Theme.c3, borderRadius: 64, width: 64, height: 64, alignSelf: 'flex-start' }}
                    icon={
                        <Icon
                            name="arrow-back"
                            size={30}
                            color={Theme.white}
                        />
                    }
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Theme.white,
        alignItems: 'stretch',
        padding: 20
    },
    title: {
        textAlign: 'right',
        fontSize: 22,
        color: Theme.textColor,
    },
    text: {
        textAlign: 'right',
        fontSize: 16,
        color: Theme.textColor,
        paddingBottom: 20,
    },
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: screenHeight / 2
    },
    buttonAddJob: {
        backgroundColor: Theme.white,
        borderColor: Theme.c3,
        borderWidth: 1,
        borderRadius: 64,
        width: 64,
        height: 64,
        marginLeft: screenWidth - 170
    },
    inputStyle: {
        fontSize: 22,
        borderColor: Theme.c5,
        borderWidth: 2,
        borderRadius: 20,
    },
    chipStyle: {
        borderColor: Theme.c3,
        backgroundColor: Theme.white
    },
    selectedChipStyle: {
        borderColor: Theme.c4,
        backgroundColor: Theme.c4
    }
});
