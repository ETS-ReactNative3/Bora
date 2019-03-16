import React from 'react';

const RiderCard = props => {
  return (
    <div className="rider_card_wrapper">
      <div className="rider_card_thmb" style={{ background: `#f2f9ff url(${props.bck})` }} />
      <div className="rider_card_nfo">
        <div className="uci_rank">UCI Ranking</div>
        <div className="rider_card_number">{props.ranking}</div>
        <div className="rider_card_name">
          <span>{props.firstname}</span>
          <span>{props.lastname}</span>
        </div>
      </div>
    </div>
  );
};

export default RiderCard;
