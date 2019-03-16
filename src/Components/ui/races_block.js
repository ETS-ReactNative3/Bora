import React from 'react';

const RacesBlock = ({ race }) => {
  return (
    <div className="race_block">
      <div className="race_date">
        <div style={{ float: 'left' }}>{race.date}</div>
        <div style={{ float: 'right' }}>{race.bestBoraRider}</div>
      </div>

      <div className="race_wrapper" style={{ clear: 'both' }}>
        <div className="race_top">
          <div className="left">
            <div className="flagFrame">
              <img className="flag" src={`./images/flags/${race.location}.png`} />
            </div>

            <div className="team_name">{race.raceName}</div>
          </div>
          <div className="right">{race.bestBoraResult}</div>
        </div>
      </div>
    </div>
  );
};

export default RacesBlock;
