import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from '../server/fireBaseConfig';

interface JwtPayload {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Signin: React.FC = () => {
  const [on, setOn] = useState(false);
  const [responsePayload, setResponsePayload] = useState<JwtPayload | null>(
    null
  );

  const handleCredentialResponse = (response: any) => {
    const payload = decodeJwtResponse(response.credential);
    setResponsePayload(payload);

    console.log('ID: ' + payload.sub);
    console.log('Full Name: ' + payload.name);
    console.log('Given Name: ' + payload.given_name);
    console.log('Family Name: ' + payload.family_name);
    console.log('Image URL: ' + payload.picture);
    console.log('Email: ' + payload.email);
  };

  const decodeJwtResponse = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    console.log('jsonPayload', jsonPayload);
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      (window as any).google.accounts.id.initialize({
        client_id:
          '311038679292-5tl75gqn8oemfqsrp69vk7mu8pbir5f5.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        context: 'signin',
        ux_mode: 'popup',
        auto_prompt: false
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [handleCredentialResponse]);

  const signIn = async () => {
    (window as any).google.accounts.id.prompt();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setOn(true);
      alert('Successfully signed in');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = () => {
    console.log('Signing out');
    setOn(false);
    setResponsePayload(null);
    alert('Signed out');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <h2>Sign-In with Google</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          width: '100%'
        }}
      >
        <button
          style={{ width: '180px', height: '40px', borderRadius: '20px' }}
          onClick={signIn}
        >
          Google Sign in
        </button>
        <button
          style={{ width: '180px', height: '40px', borderRadius: '20px' }}
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
      {on && responsePayload && (
        <div>
          <h1>{responsePayload.given_name || 'Given Name'}</h1>
          <div>
            <img
              src={responsePayload.picture}
              alt={responsePayload.name}
              style={{ borderRadius: '50%' }}
            />
            <h5>{responsePayload.family_name}</h5>
            <h5>{responsePayload.email}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
