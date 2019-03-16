import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseRaces } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';

import RankingsTable from './table';
import RacesList from './racesList';

class TheRaces extends Component {
  state = {
    loading: true,
    races: [],
    filterRaces: [],
    resultFilter: 'All'
  };

  componentDidMount() {
    firebaseRaces.once('value').then(snapshot => {
      const races = firebaseLooper(snapshot);

      this.setState({
        loading: false,
        races: reverseArray(races),
        filterRaces: reverseArray(races)
      });
    });
  }

  showResult = result => {
    let list = [];
    if (result != 'All') {
      const resInt = parseInt(result);

      list = this.state.races.filter(race => {
        return race.bestBoraResult <= resInt;
      });
    }

    this.setState({
      filterRaces: result === 'All' ? this.state.races : list,
      resultFilter: result
    });
  };

  render() {
    const state = this.state;

    return (
      <div className="the_races_container">
        <div className="the_races_wrapper">
          <div className="left">
            <div className="race_filters">
              <div className="race_filters_box">
                <div className="tag">Show Races - Results</div>
                <div className="cont">
                  <div
                    className={`option ${state.resultFilter === 'All' ? 'active' : ''}`}
                    onClick={() => this.showResult('All')}
                  >
                    All
                  </div>
                  <div
                    className={`option ${state.resultFilter === '5' ? 'active' : ''}`}
                    onClick={() => this.showResult('5')}
                  >
                    Top 5
                  </div>
                  <div
                    className={`option ${state.resultFilter === '10' ? 'active' : ''}`}
                    onClick={() => this.showResult('10')}
                  >
                    Top 10
                  </div>
                  <div
                    className={`option ${state.resultFilter === '20' ? 'active' : ''}`}
                    onClick={() => this.showResult('20')}
                  >
                    Top 20
                  </div>
                </div>
              </div>
            </div>
            <RacesList races={state.filterRaces} />
          </div>
          <div className="right">
            <RankingsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheRaces;
