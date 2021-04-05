import React, {useState, useRef} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import steps from './steps';

const styles = StyleSheet.create({
  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
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
    backgroundColor: '#00C853',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDotStyle: {
    backgroundColor: '#FFAB73'
  },
  dotStyle: {
    backgroundColor: 'black'
  }
});

export default function SkillsWizard({onDone}) {
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
    if(index === steps.length - 1) { // last page of steps
      onDone(newAnswers);
    } else {
      skillWizardRef.current.goToSlide(index+1, true);
    }
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item?.text}</Text>
        <View style={styles.answerContainer}>
          <View style={{flex: 1, paddingLeft: 40}}>
            <View style={styles.buttonCircle}>
              <Icon
                name='ios-checkmark'
                type='ionicon'
                color='white'
                size={28}
                onPress={() => onAnswerPressed(index, true)}
              />
            </View>
          </View>
          <View style={{flex: 0, paddingRight: 40}}>
            <View style={styles.cancelButtonCircle}>
              <Icon
                name='close-outline'
                type='ionicon'
                color='white'
                size={28}
                onPress={() => onAnswerPressed(index, false)}
              />
            </View>
          </View>
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
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      onDone={_onDone}
    />
  )
}