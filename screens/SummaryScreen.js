import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { get } from "../services/api.service";
import Theme from "./../theme";
import { languagesList, StorageKey } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: { margin: 5, fontSize: 20, color: "red" },
  header: { fontSize: 25, textAlign: "left" },
  text: { fontSize: 16, padding: 5 },
  text2: { fontSize: 16, fontWeight: 'bold', padding: 5 },
  subTitle: { fontSize: 16, backgroundColor: Theme.c2, padding: 5 },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#00C853",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

function TextRow({title, text}) {
  if (!text) {
    return null;
  }

  return (
    <Text accessibilityLabel={`${title} ${text}`}>
      <Text style={styles.text2}>{title}:</Text>
      <Text style={styles.text}>{text}</Text>
    </Text>
  );
}

export default function SummaryScreen({ navigation }) {
  const [userSummary, setUserSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await get("/api/seeker/summary");
      setUserSummary(res.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);

  const showUserExperienceList = () =>
    userSummary.experience_list &&
    userSummary.experience_list.length > 0 && (
      <FlatList
        data={userSummary.experience_list}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.subTitle} key={item}>
              {item.workplace_name}
            </Text>
            <Text style={styles.text}>
              {item.start_year} - {item.end_year || ""}
            </Text>
            <Text style={styles.text}>{item.role}</Text>
            <Text style={styles.text}>{item.role_description}</Text>
          </View>
        )}
      />
    );

  const showUserSummary = () => {
    if (userSummary && userSummary.profile) {
      const { profile } = userSummary;
      const { 
        birth_date,
        address,
        email,
        about_me,
        job_ambitions,
        hobbies,
        languages
       } = profile;

      return (
        <>
          {/* <Text style={styles.text}>{userSummary.profile.full_name}</Text> */}
          <TextRow title="תאריך לידה" text={new Date(birth_date).toLocaleString()}/>
          <TextRow title="כתובת מגורים" text={address}/>
          <TextRow title="דואר אלקטרוני" text={email}/>
          <TextRow title="קצת עליי" text={about_me}/>
          <TextRow title="מה אני מחפש במקום העבודה" text={job_ambitions}/>
          <TextRow title="תחביבים שלי" text={hobbies}/>

          <Text style={styles.header}>שפות</Text>
          <FlatList
            data={languages}
            renderItem={({ item }) => {
              const languageObj = languagesList.find(lang => lang.id === item);
              return (
                <Text style={styles.text} key={languageObj.id}>
                  {languageObj.name}
                </Text>
              )
            }}
          />
          {/* <Text style={styles.header}>נסיון</Text>
          {showUserExperienceList()} */}
        </>
      );
    }
    return <Text style={styles.text}>הייתה שגיאה, נסה שוב מאוחר יותר</Text>;
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>{userSummary?.profile && userSummary?.profile.full_name + " : "} פרופיל אישי</Text>
          <View>{loading ? <Text style={styles.text}>טוען...</Text> : showUserSummary()}</View>
        </View>
      </ScrollView>
      {userSummary && (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonCircle}>
            <Icon
              name="ios-checkmark"
              type="ionicon"
              color="white"
              size={30}
              onPress={() => {
                navigation.reset({
                  routes: [
                    { name: 'JobsList' }
                  ]
                });
                AsyncStorage.setItem(StorageKey.SKIP_PROFILE_WIZARD_KEY, '1')
              }}
            />
          </View>
        </View>
      )}
    </>
  );
}
