import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'one',
    title: 'האם תרצי לעבוד בישיבה?',
    text: 'Description.\nSay something cool',
    image: require('../assets/images/skills/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Other cool stuff',
    // image: require('./assets/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    // image: require('./assets/3.jpg'),
    backgroundColor: '#22bcb5',
  }
];

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
 const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  return (
    <AppIntroSlider renderItem={_renderItem} data={slides} renderNextButton={_renderNextButton} onDone={_onDone}/>
  )
}