import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';

class RacesList extends Component {
  state = {
    raceslist: []
  };

  static getDerivedStateFromProps(props, state) {
    return (state = {
      raceslist: props.races
    });
  }

  showraces = () =>
    this.state.raceslist ? (
      <NodeGroup
        data={this.state.raceslist}
        keyAccessor={d => d.id}
        start={() => ({
          opacity: 0,
          x: -200
        })}
        enter={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        update={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        leave={(d, i) => ({
          opacity: [0],
          x: [-200],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
      >
        {nodes => (
          <div>
            {nodes.map(({ key, data, state: { x, opacity } }) => (
              <div
                key={key}
                className="race_box_big"
                style={{
                  opacity,
                  transform: `translate(${x}px)`
                }}
              >
                <div className="block_wraper">
                  <div className="block">
                    <div className="flagFrame">
                      <img className="flag" src={`./images/flags/${data.location}.png`} />
                    </div>

                    <div className="team">{data.raceName}</div>
                  </div>
                </div>
                <div className="block_wraper nfo">
                  <div>
                    <strong>Date:</strong> {data.date}
                  </div>
                  <div>
                    <strong>Best Bora Rider:</strong> {data.bestBoraRider}
                  </div>
                  <div>
                    <strong>Result:</strong> {data.bestBoraResult}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </NodeGroup>
    ) : null;

  render() {
    //console.log(this.state.raceslist);
    return <div>{this.showraces()}</div>;
  }
}

export default RacesList;
