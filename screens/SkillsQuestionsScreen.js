import * as React from 'react';
import SkillsWizard from '../components/skills-wizard/skills-wizard';
import { post } from '../services/api.service';


export default function SkillsQuestionsScreen({ navigation }) {
    
    const onDone = async (answers) => {
      // navigate to skills summary
      navigation.navigate('SkillsSummary', {
        answers
      })
    }
    return (
      <SkillsWizard onDone={onDone}/>
    );
}
