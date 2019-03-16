import React, { Component } from 'react';
import RiderCard from '../ui/riderCard';
import Fade from 'react-reveal/Fade';

import Stripes from '../../Resources/images/stripes.png';
import { firebaseRiders, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js';

class TheTeam extends Component {
  state = {
    loading: true,
    riders: []
  };

  componentDidMount() {
    firebaseRiders.once('value').then(async snapshot => {
      //debugger;
      const riders = firebaseLooper(snapshot);

      let promises = [];

      if (true) {
        for (let key in riders) {
          //const pl = riders[key];
          //debugger;

          promises.push(
            new Promise((resolve, reject) => {
              firebase
                .storage()
                .ref('riders')
                .child(riders[key].image)
                .getDownloadURL()
                .then(url => {
                  riders[key].image = url;
                  resolve();
                })
                .catch(err => {
                  //there is no image for this rider
                  console.log('STORAGE ERR: ', err);
                  resolve();
                });
            })
          );
        }

        Promise.all(promises).then(() => {
          this.setState({
            loading: false,
            riders
          });

          //debugger;
        });
      }
    });
  }

  showridersByCategory = category =>
    this.state.riders
      ? this.state.riders.map((rider, i) => {
          return rider.speciality === category ? (
            <Fade left delay={i * 20} key={i}>
              <div className="item">
                <RiderCard
                  ranking={rider.ranking}
                  firstname={rider.firstname}
                  lastname={rider.lastname}
                  bck={rider.image}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    //debugger;

    return (
      <div
        className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat`
        }}
      >
        {!this.state.loading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Allrounder</div>
              <div className="team_cards">{this.showridersByCategory('Allrounder')}</div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Sprinter</div>
              <div className="team_cards">{this.showridersByCategory('Sprinter')}</div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Climber</div>
              <div className="team_cards">{this.showridersByCategory('Climber')}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TheTeam;
