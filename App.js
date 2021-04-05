// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SkillsQuestionsScreen from './screens/SkillsQuestionsScreen'
import ChooseUserTypeScreen from './screens/ChooseUserTypeScreen';
import { useFonts, Rubik_400Regular } from '@expo-google-fonts/rubik';
import JobliLoader from './components/JobliLoader';
import { StyleSheet } from 'react-native';



const Stack = createStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular
  });
  if (!fontsLoaded) {
    return <JobliLoader />
  } else return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChooseUserTypeScreen">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="SkillsQuestions" component={SkillsQuestionsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ChooseUserTypeScreen" component={ChooseUserTypeScreen} />
      </Stack.Navigator>
    </NavigationContainer>);

}

export default App;

const styles=StyleSheet.create({
  
})