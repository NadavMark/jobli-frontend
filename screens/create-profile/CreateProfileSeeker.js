import * as React from 'react';
import { View, TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';
import Theme from '../../theme';
import InputText from '../../components/input-text';
import { Icon, Button, Overlay } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

const UploadProfileImage = () => {
    return (
        <TouchableOpacity>
            <View style={styles.uploadProfileImage}>
                <Icon
                    color={Theme.white}
                    size={135}
                    style={{ position: 'relative' }}
                    name='person' />
                <Icon
                    color='red'
                    size={40}
                    style={{ top: 1, zIndex: 3, position: 'absolute' }}
                    name='person' />
            </View>
        </TouchableOpacity>
    );
};

const FormProfile = () => {
    return (
        <View>
            <InputText
                label="שם מלא"
            />
            <Text style={styles.birthdayText}>תאריך לידה</Text>
            <View style={styles.birthday}>
                <InputText
                    keyboardType="numeric"
                    label="שנת"
                    maxLength={4}
                    wrapperStyle={{ width: '33.3%' }}
                />
                <InputText
                    keyboardType="numeric"
                    label="חודש"
                    maxLength={2}
                    wrapperStyle={{ width: '33.3%' }}
                />
                <InputText
                    keyboardType="numeric"
                    label="יום"
                    maxLength={2}
                    wrapperStyle={{ width: '33.3%' }}
                />
            </View>
            <InputText
                label="כתובת מגורים"
            />
            <InputText
                label="דואר אלקטרוני"
            />
        </View>
    );
};

export default function CreateProfileSeeker({ navigation }) {
    const [visible, setVisible] = React.useState(false);
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
                    onPress={() => setVisible(true)}
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
            <Overlay isVisible={visible} onBackdropPress={setVisible} overlayStyle={{ padding: 20, margin: 20 }}>
                <Text style={styles.titlePopup}>על מנת שנכיר יוטר טוב</Text>
                <Text style={styles.textPopup}>
                    לפניך שאלון קצר.
                    שאלות אלו יסייעו לנו במציאת המשרה המתאימה ביותר עבורך.
                </Text>
                <Button
                    accessibilityLabel="בואו נתחיל"
                    title="בואו נתחיל"
                    buttonStyle={{ backgroundColor: Theme.c3 }}
                />
            </Overlay>
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
    uploadProfileImage: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.c2,
        width: screenWidth * .8
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

export const CreateProfileSeekerScreenName = 'יצירת פרופיל';
export const CreateProfileSeekerScreenOptions = {
    title: CreateProfileSeekerScreenName,
    headerStyle: {
        backgroundColor: Theme.c1,
    },
    headerTintColor: Theme.textColor
}