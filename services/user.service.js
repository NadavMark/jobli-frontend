import base64 from 'react-native-base64'
import { userTokenId } from './auth.service';
import { post } from './api.service';

export const UserType = {
  JOB_SEEKER: 'job_seeker',
  EMPLOYER: 'employer'
}

export async function getUserType(userType) {
  return new Promise((resolve) => {
    if (userTokenId) {
      let results = userTokenId.split('.');
      results = results[1];
      results = base64.decode(results);
      resolve(results.indexOf(userType) > -1)
    } else {
      resolve(false)
    }
  })
  
}

export async function isJobSeeker() {
  return getUserType(UserType.JOB_SEEKER);
}

