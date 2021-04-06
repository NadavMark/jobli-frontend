export const BASE_URL = 'https://b1f38ixvz0.execute-api.us-east-1.amazonaws.com/prod/jobli';
// export const BASE_URL = 'https://nj11xg4loc.execute-api.us-east-1.amazonaws.com/prod/jobli';
export const SEEKER_PROFILE_URL = (id) => `${BASE_URL}/api/seekers/${id}/profile`;
export const EMPLOYER_JOB_URL = (id) => `${BASE_URL}/api/employers/${id}/job`;