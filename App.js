import React, { useEffect, useState } from 'react';
import { Button, Linking, Platform, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'exp://localhost:19000',
    responseType: 'code'
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getUser().then((userData) => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then((userData) => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <View>
      <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
      {user ? (
        <Button title="Sign Out" onPress={() => Auth.signOut()} />
      ) : (
        <Button title="Federated Sign In" onPress={() => {
          debugger;
          Auth.federatedSignIn({provider: 'Google'})
        }} />
      )}
    </View>
  );
}

export default App;