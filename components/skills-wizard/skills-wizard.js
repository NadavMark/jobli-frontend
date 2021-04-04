import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import steps from './steps';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '90%',
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SkillsWizard = () => {
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="rocket"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const _renderSkipButton = () => (
    <View style={styles.buttonCircle}>
      <Icon
        name="rocket"
        color="rgba(255, 255, 255, .9)"
        size={24} />
    </View>
  )
 const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  return (
    <AppIntroSlider renderItem={_renderItem} data={steps} showSkipButton={true} renderNextButton={_renderNextButton} renderSkipButton={_renderSkipButton} onDone={_onDone}/>
  )
}