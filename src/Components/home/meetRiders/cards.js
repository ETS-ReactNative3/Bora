import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import RiderCard from '../../ui/riderCard';

import sagan from '../../../Resources/images/riders/sagan.jpg';
import konrad from '../../../Resources/images/riders/konrad.jpg';
import postlberger from '../../../Resources/images/riders/postlberger.jpg';
import grossschartner from '../../../Resources/images/riders/grossschartner.jpg';

class HomeCards extends Component {
  state = {
    cards: [
      {
        bottom: 90,
        left: 300,
        firstname: 'Lukas',
        lastname: 'Pöstlberger',
        ranking: '355',
        photo: postlberger
      },
      {
        bottom: 60,
        left: 200,
        firstname: 'Felix',
        lastname: 'Großschartner',
        ranking: '91',
        photo: grossschartner
      },
      {
        bottom: 30,
        left: 100,
        firstname: 'Patrick',
        lastname: 'Konrad',
        ranking: '41',
        photo: konrad
      },
      {
        bottom: 0,
        left: 0,
        firstname: 'Peter',
        lastname: 'Sagan',
        ranking: '2',
        photo: sagan
      }
    ]
  };

  showAnimateCards = () =>
    this.state.cards.map((card, i) => (
      <Animate
        key={i}
        show={this.props.show}
        start={{
          left: 0,
          bottom: 0
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 1000, ease: easePolyOut }
        }}
      >
        {({ left, bottom }) => {
          return (
            <div
              style={{
                position: 'absolute',
                left,
                bottom
              }}
            >
              <RiderCard
                ranking={[card.ranking]}
                firstname={[card.firstname]}
                lastname={[card.lastname]}
                bck={[card.photo]}
              />
            </div>
          );
        }}
      </Animate>
    ));

  render() {
    return <div>{this.showAnimateCards()}</div>;
  }
}

export default HomeCards;
