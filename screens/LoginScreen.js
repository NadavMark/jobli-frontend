import * as React from 'react';
import { View, Text } from 'react-native';

import { Button } from 'react-native-elements';

export default function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About Screen</Text>
          <Button
                  title="Go To Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}
