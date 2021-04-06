export const BASE_URL = 'https://kfs2hqzgu6.execute-api.us-east-1.amazonaws.com/prod';
export const SEEKER_PROFILE_URL = (id) => `${BASE_URL}/api/seekers/${id}/profile`;
export const EMPLOYERS = `${BASE_URL}/api/employers`;
export const EMPLOYER = (id) => `${BASE_URL}/api/employers/${id}`;
export const EMPLOYER_JOB_URL = (id) => `${BASE_URL}/api/employers/${id}/job`;