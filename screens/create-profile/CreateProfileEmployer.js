import * as React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Theme from '../../theme';
import InputText from '../../components/input-text';
import UploadProfileImage from './UploadProfileImage';
import { Icon, Button } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

const FormProfile = () => {
    return (
        <View>
            <InputText
                label="שם העסק"
            />
            <InputText
                label="כתובת העסק"
            />
            <InputText
                label="קישור לאתר העסק"
            />
            <InputText
                label="תיאור העסק"
                placeholder="כאן כדאי לרשום תיאור קצר של בית העסק"
            />
        </View>
    );
};

export default function CreateProfileEmployer({ navigation }) {
    return (
        <View accessible={true} style={styles.wrapper}>
            {/* <View style={styles.uploadProfileImageWrapper}>
                <UploadProfileImage />
            </View> */}
            <View style={styles.formWrapper}>
                <FormProfile />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    accessibilityLabel="המשך לשלב הבא"
                    buttonStyle={{ backgroundColor: Theme.c3, borderRadius: 64, width: 64, height: 64 }}
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.white,
        alignItems: 'stretch'
    },
    formWrapper: {
        flex: 4,
        paddingTop: 30
    },
    buttonWrapper: {
        flex: 1,
        paddingBottom: 30,
    },
    uploadProfileImageWrapper: {
        height: 126,
        padding: 28,
        flex: 1,
    },
    birthday: {
        flexDirection: 'row',
        padding: 10,
        width: screenWidth
    },
    birthdayText: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.textColor,
        paddingRight: 16
    },
    titlePopup: {
        textAlign: 'right',
        fontSize: 22,
        color: Theme.textColor,
        paddingBottom: 20,

    },
    textPopup: {
        textAlign: 'right',
        fontSize: 16,
        color: Theme.textColor,
        paddingBottom: 20,
    },
});

export const CreateProfileEmployerScreenName = 'יצירת פרופיל מעסיק';
export const CreateProfileEmployerScreenOptions = {
    title: 'יצירת פרופיל',
    headerStyle: {
        backgroundColor: Theme.c1,
    },
    headerTintColor: Theme.textColor
}