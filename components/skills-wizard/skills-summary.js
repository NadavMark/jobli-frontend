import React, {useState} from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, fontSize: 20},
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
});

export default SkillsSummary = ({navigation, route}) => {
  const [answers, setAnswers] = useState(route.params.answers || []);
  const skillsJSX = answers.map((item, index) =>
    <View key={item.key}>
      <View style={styles.container}>
        { item.answer ? 
              <View style={styles.buttonCircle}>
                  <Icon
                    name='ios-checkmark'
                    type='ionicon'
                    color='white'
                    size={28}
                  />
              </View>
          :
              <View style={styles.cancelButtonCircle}>
                  <Icon
                    name='close-outline'
                    type='ionicon'
                    color='white'
                    size={28}
                    onPress={() => onAnswerPressed(index, false)}
                  />
              </View>
        }
        <Text style={{fontSize: 15}}>{item.question}</Text>
      </View>
    </View>
  )

  const Headers = () => {
    return (
      <Text style={{paddingRight: 10, fontSize: 22}}>
        סיכום
      </Text>
    );
  }

  const onApply = async () => {
    try{
      alert(JSON.stringify(answers));
      const res = await post('https://b1f38ixvz0.execute-api.us-east-1.amazonaws.com/prod/api/seekers/11111/answers', answers);
      alert('success')
    } catch (e) {
      alert('error = ', JSON.stringify(e));
    }
    // // TODO: navigate to Avisror screen
  }

  return (
    <View>
      <Headers />
      {skillsJSX}
      <Button
        title="אישור"
        onPress={onApply}
      />
    </View>
  )
}