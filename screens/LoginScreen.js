import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import { Hub } from 'aws-amplify';
import { Button, Icon } from 'react-native-elements';
import { storeUserDetails, googleSignIn } from '../services/auth.service';
import { StorageKey } from '../constants';
import Theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [loading, setLoader] = useState(false);

    async function navigateToNextScreen() {
        AsyncStorage.getItem(StorageKey.SKIP_PROFILE_WIZARD_KEY).then((value) => {

            // console.log('value: ', value, typeof value)
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
        <View style={styles.container}>
            <Image style={styles.imageStyle} resizeMode="contain" source={require('./../assets/images/JobliLogo.png')} />
            <Button
                title="התחברות עם גוגל"
                iconRight={true}
                titleStyle={{color: Theme.c3}}
                buttonStyle={styles.button}
                icon={
                    <Icon
                        name="google"
                        size={15}
                        color={Theme.c3}
                        type="font-awesome"
                        style={{ paddingLeft: 10 }}
                        />
                }
                onPress={() => {
                    setLoader(true);
                    googleSignIn();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      height: "100%",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    button: {
        borderRadius: 90,
        backgroundColor: Theme.white,
        borderColor: Theme.c3,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    imageStyle: {
        width: 162,
        height: 74,
        marginTop: 100
    },
});
  