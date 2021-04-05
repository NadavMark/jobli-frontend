import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Theme from '../../theme';
const screenWidth = Dimensions.get('window').width;

export default () => {
    return (
        <TouchableOpacity>
            <View style={styles.uploadProfileImage}>
                <Icon
                    color={Theme.white}
                    size={135}
                    style={{ position: 'relative' }}
                    name='person' />
                <Icon
                    color='red'
                    size={40}
                    style={{ top: 1, zIndex: 3, position: 'absolute' }}
                    name='person' />
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    uploadProfileImage: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.c2,
        width: screenWidth * .8
    },
});