import * as React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: '100%'
  },
  textLabel: {
    fontSize: 22,
    color: '#2E2E2E',
    marginBottom: 3
  },
  textSubLabel: {
    fontSize: 18,
    color: '#2E2E2E',
    marginBottom: 15
  },
  textTitle: {
    fontSize: 16,
    color: '#2E2E2E'
  },
  input: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d6ccdb'
  },
  buttonCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#28527A',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20
  }
});

export default function AboutMeProfileScreen({ navigation }) {

    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.textLabel}>קצת עלי</Text>
          <Text style={styles.textSubLabel}>כאן זה המקום לספר על עצמך</Text>
        </View>

        <View>
          <Text style={styles.textTitle}>המשפט יופיע בדף הפורפיל שלך</Text>
          <TextInput
            style={styles.input}
            editable
            maxLength={300}
            multiline
            numberOfLines={4}
            placeholder="אני אוהב לקרוא ספרים..."
          />
        </View>

        <View>
          <Text style={styles.textTitle}>כאן כדאי לרשום מה אני מחפש במקום העבודה</Text>
          <TextInput
            style={styles.input}
            editable
            maxLength={300}
            multiline
            numberOfLines={4}
            placeholder="אני רוצה לעבוד בעבודה משרדית, בסביבה שקטה עם צוות קטן"
          />
        </View>

        <View>
          <Text style={styles.textTitle}>כאן זה המקום לספר על התחביבים שלך</Text>
          <Text style={styles.textTitle}>כדי שהמעסיק יוכל להכיר אותך מעט טוב יותר</Text>
          <TextInput
            style={styles.input}
            editable
            maxLength={300}
            multiline
            numberOfLines={4}
            placeholder="רשום פה תחביבים"
          />
        </View>
        <View style={styles.buttonCircle}>
            <Icon
              name='arrow-back-outline'
              type='ionicon'
              color='white'
              size={28}
              onPress={() => {alert(JSON.stringify(selectedItems))}}
            />
        </View>
      </View>
      
    );
}

