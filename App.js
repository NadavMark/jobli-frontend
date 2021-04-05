import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from './theme';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import CreateProfile, { CreateProfileScreenName } from './screens/create-profile/CreateProfile';

const Stack = createStackNavigator();

const navTheme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Theme.c1,
    colors: Theme.textColor,
    text: Theme.textColor,
    border: Theme.c1
  },
};

const screenOptions = {
  title: CreateProfileScreenName,
  headerStyle: {
    backgroundColor: Theme.c1,
  },
  headerTintColor: Theme.textColor
};

function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name={CreateProfileScreenName} options={screenOptions} component={CreateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;