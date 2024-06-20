// src/utils/youtubeApi.ts
import axios from 'axios';

const API_KEY = 'AIzaSyC2SbLjsDp_r_xsVL1fqjjTv-EJqnGlGdU';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
});

export const fetchUserDatas = async (accessToken: string) => {
  try {
    const response = await youtubeApi.get('/channels', {
      params: {
        part: 'snippet',
        mine: true
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
