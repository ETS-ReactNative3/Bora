import React from 'react';
import Featured from './featured';
import Races from './races';
import MeetRiders from './meetRiders';
import Promotion from './promotion';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Races />
      <MeetRiders />
      <Promotion />
    </div>
  );
};

export default Home;
