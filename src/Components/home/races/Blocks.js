import React, { Component } from 'react';
import { firebaseRaces } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import RacesBlock from '../../ui/races_block';
import Slide from 'react-reveal/Slide';

class Blocks extends Component {
  state = {
    races: []
  };

  componentDidMount() {
    firebaseRaces
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        const races = firebaseLooper(snapshot);

        this.setState({
          races: reverseArray(races)
        });
      });
  }

  showRaces = races =>
    races
      ? races.map(race => (
          <Slide bottom key={race.id}>
            <div className="item">
              <div className="wrapper">
                <RacesBlock race={race} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  render() {
    console.log(this.state);
    return <div className="home_races">{this.showRaces(this.state.races)}</div>;
  }
}

export default Blocks;
