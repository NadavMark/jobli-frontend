import * as React from 'react';
import { View, Text } from 'react-native';
import Theme from '../../theme';

export default function PostJobWizard({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>משרות לפרסום</Text>
            <Text>
                כאן אפשר לנהל את המשרות ע"י פרסום, השהייה, מחיקה וניהול מועמדים.
            </Text>
        </View>
    );
}


export const PostJobWizardScreenName = 'משרות לפרסום';
export const PostJobWizardScreenOptions = {
    title: PostJobWizardScreenName,
    headerStyle: {
        backgroundColor: Theme.c1,
    },
    headerTintColor: Theme.textColor
}