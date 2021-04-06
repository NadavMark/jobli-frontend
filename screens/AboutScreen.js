import * as React from 'react';
import { View, Text } from 'react-native';

import { Button } from 'react-native-elements';

export default function SummaryScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Summary Screen</Text>
            <Button
                title="Go To Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}
