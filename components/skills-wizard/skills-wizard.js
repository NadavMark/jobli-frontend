import React, {useState, useRef} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
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
    color: 'black',
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

export default function SkillsWizard() {
  const skillWizardRef = useRef();
  const [answers, setAnswers] = useState([]);
  
  const onAnswerPressed = (index, answer)=> {
    const currentStep = steps[index];
    const { key } = currentStep;
    let newAnswers = [...answers];
    newAnswers[index] = {
      key,
      answer
    };
    setAnswers(newAnswers);
    skillWizardRef.current.goToSlide(index+1, true);
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        {<Text>{JSON.stringify(answers)}</Text>}
        <Image style={styles.image} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item?.text}</Text>
        <View style={styles.buttonCircle}>
          <Icon
            name="rocket"
            color="rgba(255, 255, 255, .9)"
            size={24}
            onPress={() => onAnswerPressed(index, true)}
          />
        </View>
        <View style={styles.buttonCircle}>
          <Icon
            name="rocket"
            color="rgba(255, 255, 255, .9)"
            size={24}
            onPress={() => onAnswerPressed(index, false)}
          />
        </View>

        
      </View>
    );
  }
  
  
 const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  return (
    <AppIntroSlider 
    ref={(ref) => (skillWizardRef.current = ref)}
      renderItem={_renderItem} 
      data={steps} 
      showSkipButton={false}
      showNextButton={false}
      showDoneButton={false}
      onDone={_onDone}
    />
  )
}