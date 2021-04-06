import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Theme from '../../theme';
import PostJobWizardInit from './init';
import PostJobWizardStep1 from './step-1';
import PostJobWizardStep2 from './step-2';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function PostJobWizard({ navigation }) {
    const [state, setState] = React.useState('INIT');
    switch (state) {
        case 'INIT':
            return <PostJobWizardInit next={() => setState('STEP_1')} />
        case 'STEP_1':
            return <PostJobWizardStep1 next={() => setState('STEP_2')} />
        case 'STEP_2':
            return <PostJobWizardStep2 next={() => setState('STEP_3')} />
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Theme.white,
        alignItems: 'stretch',
        padding: 20
    },
    title: {
        textAlign: 'right',
        fontSize: 22,
        color: Theme.textColor,
        paddingBottom: 20,

    },
    text: {
        textAlign: 'right',
        fontSize: 16,
        color: Theme.textColor,
        paddingBottom: 20,
    },
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: screenHeight / 2
    },
    buttonAddJob: {
        backgroundColor: Theme.white,
        borderColor: Theme.c3,
        borderWidth: 1,
        borderRadius: 64,
        width: 64,
        height: 64,
        marginLeft: screenWidth - 170
    }
});

export const PostJobWizardScreenName = 'משרות לפרסום';
export const PostJobWizardScreenOptions = {
    title: PostJobWizardScreenName,
    headerStyle: {
        backgroundColor: Theme.c1,
    },
    headerTintColor: Theme.textColor
}