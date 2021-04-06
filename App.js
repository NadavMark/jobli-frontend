import React, { useEffect, useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';
import { Linking } from 'expo'
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

debugger
const expoScheme = "jobli://"
// Technically you need to pass the correct redirectUrl to the web browser.
let redirectUrl = Linking.makeUrl();
if (redirectUrl.startsWith('exp://1')) {
  // handle simulator(localhost) and device(Lan)
  redirectUrl = redirectUrl + '/--/';
} else
if (redirectUrl === expoScheme) {
  // dont do anything
} else {
  // handle the expo client
  redirectUrl = redirectUrl + '/'
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: redirectUrl,
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
          Auth.federatedSignIn()
        }} />
      )}
    </View>
  );
}

export default App;