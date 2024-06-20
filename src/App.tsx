import React from 'react';
// import UserVideos from './component/userVideo';
import Signin from './component/signin';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <div className=" flex ">
        <Signin />
      </div>
      {/* <div className="flex">
        <h3>YouTube User Videos:</h3>
        <div className="w-12">
          <UserVideos />
        </div>
      </div> */}
    </div>
  );
};

export default App;
