import * as React from 'react';
import { View, Text } from 'react-native';
import Theme from '../theme';

export default function JobliLoader() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Theme.c1 }}>
            <Text>טוען...</Text>
        </View>
    );
}
