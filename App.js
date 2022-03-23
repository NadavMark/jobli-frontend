import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from './theme';
// import HomeScreen from './screens/HomeScreen';
import SkillsQuestionsScreen from './screens/SkillsQuestionsScreen';
import ChooseUserTypeScreen from './screens/ChooseUserTypeScreen';
import { useFonts, Rubik_400Regular } from '@expo-google-fonts/rubik';
import JobliLoader from './components/JobliLoader';
import { StyleSheet, I18nManager, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import JobsListScreen from "./screens/JobsListScreen";

import AddLanguageScreen from "./screens/AddLanguageScreen";
import SkillsSummary from "./components/skills-wizard/skills-summary";
import AboutMeProfileScreen from "./screens/AboutMeProfileScreen";
import CreateProfileSeeker, { CreateProfileSeekerScreenName, CreateProfileSeekerScreenOptions } from "./screens/create-profile/CreateProfileSeeker";
import CreateProfileEmployer, { CreateProfileEmployerScreenName, CreateProfileEmployerScreenOptions } from "./screens/create-profile/CreateProfileEmployer";
import PostJobWizard, { PostJobWizardScreenName, PostJobWizardScreenOptions } from "./screens/post-job-wizard/post-job-wizard";
import SummaryScreen from "./screens/SummaryScreen";
import LoginScreen from "./screens/LoginScreen";
import { signOut } from './services/auth.service';

const Stack = createStackNavigator();

const navTheme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Theme.c1,
    colors: Theme.textColor,
    text: Theme.textColor,
    border: Theme.c1,
  },
};

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

const expoScheme = "jobli://";
// Technically you need to pass the correct redirectUrl to the web browser.
let redirectUrl = Linking.makeUrl();
if (redirectUrl.startsWith("exp://1")) {
  // handle simulator(localhost) and device(Lan)
  redirectUrl = redirectUrl + "/--/";
} else if (redirectUrl === expoScheme) {
  // dont do anything
} else {
  // handle the expo client
  redirectUrl = redirectUrl + "/";
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
    scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
    redirectSignIn: redirectUrl,
    responseType: "code",
    logout_uri: redirectUrl + 'Login',
    redirectSignOut: redirectUrl + 'Login',
  },
});

function App() {
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return <JobliLoader />
  } else return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="JobsList" component={JobsListScreen} options={{ title: 'הצעות עבודה', headerRight: () => (
          <Icon
          name='log-out-outline'
          type='ionicon'
          color={Theme.textColor}
          style={{ marginLeft: 10, marginRight: 10 }}
          size={28}
          onPress={() => Alert.alert(
            "ניתוק משתמש",
            "האם לנתק את המשתמש?",
            [
              {
                accessibilityLabel: "לא, הישאר מחובר", 
                text: "לא, הישאר מחובר"
              },
              {
                accessibilityLabel: "כן, רוצה להתנתק", 
                text: "כן, רוצה להתנתק",
                onPress: () => {signOut()}
              }
            ]
          )}
          accessibilityLabel="ניתוק משתמש"
        />
        )}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'התחברות', headerShown: false }} />
        <Stack.Screen name={CreateProfileSeekerScreenName} options={CreateProfileSeekerScreenOptions} component={CreateProfileSeeker} />
        <Stack.Screen name={CreateProfileEmployerScreenName} options={CreateProfileEmployerScreenOptions} component={CreateProfileEmployer} />
        <Stack.Screen name={PostJobWizardScreenName} options={PostJobWizardScreenOptions} component={PostJobWizard} />
        <Stack.Screen name="SkillsQuestions" component={SkillsQuestionsScreen} options={{ title: '' }} />
        <Stack.Screen options={{ headerShown: false }} name="ChooseUserTypeScreen" component={ChooseUserTypeScreen} />
        <Stack.Screen name="SkillsSummary" component={SkillsSummary} options={{ title: 'שאלון' }} />
        <Stack.Screen name="AddLanguage" component={AddLanguageScreen} options={{ title: 'בחירת שפה' }} />
        <Stack.Screen name="AboutMeProfile" component={AboutMeProfileScreen} options={{ title: 'יצירת פרופיל' }} />
        <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'סיכום' }} />
      </Stack.Navigator>
    </NavigationContainer>);
}

export default App;
const styles = StyleSheet.create({});
