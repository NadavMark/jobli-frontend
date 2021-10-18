import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { get } from "../services/api.service";
import Theme from "./../theme";
import { StorageKey } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: { margin: 5, fontSize: 20, color: "red" },
  header: { fontSize: 25, textAlign: "left" },
  text: { fontSize: 16, padding: 5 },
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

export default function SummaryScreen({ navigation }) {
  const [userSummary, setUserSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await get("/api/seeker/summary");
      setUserSummary(res.data);
      console.log("summary: ", res.data);
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
    if (userSummary) {
      return (
        <>
          {/* <Text style={styles.text}>{userSummary.profile.full_name}</Text> */}
          {userSummary.profile.birth_date && <Text style={styles.text}>{new Date(userSummary.profile.birth_date).toLocaleString()}</Text>}
          <Text style={styles.text}>{userSummary.profile.address}</Text>
          <Text style={styles.text}>{userSummary.profile.email}</Text>
          {userSummary?.profile?.about_me && <Text style={styles.text}>{userSummary.profile.about_me}</Text>}
          {userSummary?.profile?.job_ambitions && <Text style={styles.text}>{userSummary.profile.job_ambitions}</Text>}
          {userSummary?.profile?.hobbies && <Text style={styles.text}>{userSummary.profile.hobbies}</Text>}

          <Text style={styles.header}>שפות</Text>
          <FlatList
            data={userSummary.profile.languages}
            renderItem={({ item }) => (
              <Text style={styles.text} key={item}>
                {item}
              </Text>
            )}
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
                navigation.replace("JobsList");
                AsyncStorage.setItem(StorageKey.SKIP_PROFILE_WIZARD_KEY, '1').then(() => {
                  console.log('save: ', StorageKey.SKIP_PROFILE_WIZARD_KEY)
                });
              }}
            />
          </View>
        </View>
      )}
    </>
  );
}
