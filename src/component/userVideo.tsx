import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { fetchUserDatas } from '../utils/youtubeApi';

interface UserVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

const UserVideos: React.FC = () => {
  const [userVideos, setUserVideos] = useState<UserVideo[]>([]);

  const handleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    if (token) {
      try {
        const fetchedUserVideos = await fetchUserDatas(token);
        setUserVideos(fetchedUserVideos);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  return (
    <div>
      <h2>User Videos</h2>
      {userVideos.map((video) => (
        <div key={video.id}>
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.description}</p>
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
        </div>
      ))}
    </div>
  );
};

export default UserVideos;
