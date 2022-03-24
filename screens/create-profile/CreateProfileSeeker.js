import * as React from 'react';
import { View, ScrollView, Dimensions, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Theme from '../../theme';
import InputText from '../../components/input-text';
import { Icon, Button, Overlay } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { put } from '../../services/api.service';
import useAxios from '../../hooks/axios.hook';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("דואר אלקטרוני לא תקין")
        .required('דואר אלקטרוני הוא שדה חובה'),
    full_name: yup
        .string()
        .required('חובה להזין שם מלא'),
    address: yup
        .string(),
    birth_year: yup
        .number()
        .test('len', 'שנה לא תקינה', val => Number(val) > 1970 && Number(val) < new Date().getFullYear())
        .required('חובה להזין שנת לידה'),
    birth_month: yup
        .number()
        .test('len', 'חודש לא תקין', val => Number(val) > 0 && Number(val) < 13)
        .required('חובה להזין חודש לידה'),
    birth_day: yup
        .number()
        .test('len', 'יום לא תקין', val => Number(val) > 0 && Number(val) < 32)
        .required('חובה להזין יום לידה'),
})

const FormProfile = ({ handleChange, handleBlur, values }) => {
    return (
        <View>
            <InputText
                onChangeText={handleChange('full_name')}
                onBlur={handleBlur('full_name')}
                value={values.full_name}
                label="שם מלא"
            />
            <Text style={styles.birthdayText}>תאריך לידה</Text>
            <View style={styles.birthday}>
                <InputText
                    onChangeText={handleChange('birth_year')}
                    onBlur={handleBlur('birth_year')}
                    value={values.birth_year}
                    keyboardType="numeric"
                    label="שנת"
                    maxLength={4}
                    wrapperStyle={{ width: '33.3%' }}
                />
                <InputText
                    onChangeText={handleChange('birth_month')}
                    onBlur={handleBlur('birth_month')}
                    value={values.birth_month}
                    keyboardType="numeric"
                    label="חודש"
                    maxLength={2}
                    wrapperStyle={{ width: '33.3%' }}
                />
                <InputText
                    onChangeText={handleChange('birth_day')}
                    onBlur={handleBlur('birth_day')}
                    value={values.birth_day}
                    keyboardType="numeric"
                    label="יום"
                    maxLength={2}
                    wrapperStyle={{ width: '33.3%' }}
                />
            </View>
            <InputText
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                label="כתובת מגורים"
            />
            <InputText
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                label="דואר אלקטרוני"
            />
        </View>
    );
};

export default function CreateProfileSeeker({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const [submitLoading, setLoader] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState(null);

    const { response, loading, error } = useAxios({
        method: 'get',
        url: '/api/seeker/profile',
    });

    React.useEffect(() => {
        if (response) {
            const values = {
                full_name: response.full_name,
                birth_year: new Date(response.birth_date).getFullYear().toString(),
                birth_month: (new Date(response.birth_date).getMonth() + 1).toString(),
                birth_day: new Date(response.birth_date).getDate().toString(),
                address: response.address,
                email: response.email,
            }
            setInitialValues(values);
        } else if (response === undefined) {
            setInitialValues({
                full_name: '',
                birth_year: '',
                birth_month: '',
                birth_day: '',
                address: '',
                email: '',
            });
        }
    }, [response])

    function submit(values) {
        setLoader(true);
        put('/api/seeker/profile', values).then(async res => {
            navigation.push('AboutMeProfile');
            setLoader(false);
        })
    }

    if (submitLoading || loading || !initialValues) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{ fontSize: 16, padding: 5 }}>טוען...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={values => submit(values)}
            >
                {(formikHelpers) => (
                    <View accessible={true} style={styles.wrapper}>
                        {/* <View style={styles.uploadProfileImageWrapper}>
                            <UploadProfileImage />
                        </View> */}
                        <View style={styles.formWrapper}>

                            <FormProfile {...formikHelpers} />

                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => {
                                    const { isValid, errors } = formikHelpers;
                                    if (!isValid) {
                                        const firstErrorKey = Object.keys(errors)[0];
                                        Alert.alert('', errors[firstErrorKey]);
                                        setVisible(false)
                                    } else {
                                        setVisible(true)
                                    }
                                }}
                                accessibilityLabel="המשך לשלב הבא"
                                buttonStyle={styles.button}
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
                            <Text style={styles.titlePopup}>על מנת שנכיר יותר טוב</Text>
                            <Text style={styles.textPopup}>
                                לפניך שאלון קצר.
                                שאלות אלו יסייעו לנו במציאת המשרה המתאימה ביותר עבורך.
                            </Text>
                            <Button
                                onPress={formikHelpers.handleSubmit}
                                accessibilityLabel="בואו נתחיל"
                                title="בואו נתחיל"
                                buttonStyle={{backgroundColor: Theme.c3}}
                            />
                        </Overlay>
                    </View>
                )}
            </Formik>
        </ScrollView>
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
        height: screenHeight - 60
    },
    formWrapper: {
        flex: 4,
        paddingTop: 30
    },
    buttonWrapper: {
        flex: 1,
        paddingBottom: 30,
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    button: {
        backgroundColor: Theme.c3,
        borderRadius: 64,
        width: 64,
        height: 64,
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

export const CreateProfileSeekerScreenName = 'יצירת פרופיל מחפש עבודה';
export const CreateProfileSeekerScreenOptions = {
    title: 'יצירת פרופיל',
    headerStyle: {
        backgroundColor: Theme.c1,
    },
    headerTintColor: Theme.textColor
}