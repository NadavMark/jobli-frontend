import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Hub } from 'aws-amplify';
import { Button } from 'react-native-elements';
import { storeUserDetails, googleSignIn } from '../services/auth.service';
import { StorageKey } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [loading, setLoader] = useState(false);

    async function navigateToNextScreen() {
        AsyncStorage.getItem(StorageKey.SKIP_PROFILE_WIZARD_KEY).then((value) => {

            console.log('value: ', value, typeof value)
            if (value) {
                navigation.replace('JobsList');
            } else {
                navigation.replace('ChooseUserTypeScreen');
            }
        });
    }

    const hubCallback = async ({ payload: { event, data } }) => {
        setLoader(false);
        switch (event) {
            case 'signIn':
                await storeUserDetails();
                setLoader(true);
                setTimeout(() => {
                    navigateToNextScreen();
                }, 1000)
                break;
            case 'signOut':
                break;
            case 'signIn_failure':
            case 'cognitoHostedUI_failure':
                console.log('Sign in failure', data);
                Alert.alert('שגיאת התחברות', 'משהו קרה, נסה שנית');
                break;
        }
    }
    useEffect(() => {
        Hub.listen('auth', hubCallback);
    }, []);

    if (loading) {
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="התחברות עם גוגל"
                onPress={() => {
                    setLoader(true);
                    googleSignIn();
                }}
            />
        </View>
    );
}
