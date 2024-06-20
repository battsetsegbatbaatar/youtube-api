import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseConfig from './server/fireBaseConfig';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
