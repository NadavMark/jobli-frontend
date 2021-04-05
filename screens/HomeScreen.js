import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go To About"
                onPress={() => navigation.navigate('About')}
            />
            <Button
                title="Go To Skills Questions"
                onPress={() => navigation.navigate('SkillsQuestions')}
            />
            <Button
                title="Go To Add Language"
                onPress={() => navigation.navigate('AddLanguage')}
            />
        </View>
        );
}
