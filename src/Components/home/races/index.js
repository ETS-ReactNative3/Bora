import React from 'react';
import { Tag } from '../../ui/misc';
import Blocks from './Blocks';

const RacesHome = () => {
  return (
    <div className="home_races_wrapper">
      <div className="container">
        <Tag size="50px" color="#ffffff">
          Most important races 2018
        </Tag>
        <Blocks />
        <Tag size="22px" color="#0e1731" link={true} linkto="/the_races">
          See more races
        </Tag>
      </div>
    </div>
  );
};

export default RacesHome;
