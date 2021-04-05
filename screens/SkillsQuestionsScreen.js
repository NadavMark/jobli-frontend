import * as React from 'react';
import SkillsWizard from '../components/skills-wizard/skills-wizard';
import { post } from '../services/api.service';


export default function SkillsQuestionsScreen({ navigation }) {
    
    const onDone = async (answers) => {
      alert(JSON.stringify(answers));
      const res = await post('https://nj11xg4loc.execute-api.us-east-1.amazonaws.com/prod/jobli', answers);
      // TODO: navigate to Avisror screen
    }
    return (
      <SkillsWizard onDone={onDone}/>
    );
}
