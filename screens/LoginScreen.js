import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';

import { Button } from 'react-native-elements';

export default function LoginScreen({ navigation }) {

    const [user, setUser] = useState(null);

    function getUser() {
        return Auth.currentAuthenticatedUser()
          .then((userData) => userData)
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

        getUser().then((userData) => setUser(userData));
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
