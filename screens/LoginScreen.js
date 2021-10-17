import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';

export default function LoginScreen({ navigation }) {
    const [user, setUser] = useState(null);


    async function isAuthenticated() {
        const user_id = await AsyncStorage.getItem('user_id')
        const jwtToken = await AsyncStorage.getItem('jwtToken')
        return jwtToken && user_id;
    }

    function getUser() {

        Auth.currentUserInfo()
            .then(async (userData) => {
                await AsyncStorage.setItem(
                    'user_id',
                    userData.attributes.sub
                );
            })
            .catch(() => console.log('Not signed in'));

        return Auth.currentAuthenticatedUser()
            .then(async (userData) => {
                await AsyncStorage.setItem(
                    'jwtToken',
                    userData.signInUserSession.idToken.jwtToken
                );
            })
            .catch(() => console.log('Not signed in'));
    }

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    getUser().then((userData) => setUser(userData));
                    navigation.navigate('ChooseUserTypeScreen');
                    break;
                case 'signOut':
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });

        isAuthenticated().then(isAuth => {
            if (!isAuth) {
                getUser().then((userData) => setUser(userData));
            } else {
                navigation.navigate('ChooseUserTypeScreen');
            }
        })
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Button
                title="Login With Google"
                onPress={() => Auth.federatedSignIn()
                }
            />
        </View>
    );
}
