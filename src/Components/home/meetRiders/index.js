import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal/Reveal';
import HomeCards from './cards';

import Sagan from '../../../Resources/images/riders/sagan.jpg';

class MeetTeam extends Component {
  state = {
    show: false
  };

  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({
            show: true
          });
        }}
      >
        <div className="home_meetriders" style={{ background: `#ffffff url(${Stripes})` }}>
          <div className="container">
            <div className="home_meetriders_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={this.state.show} player={Sagan} />
              </div>
              <div className="home_text_wrapper">
                <div>
                  <Tag
                    size="100px"
                    color="#0e1731"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    Meet
                  </Tag>
                </div>
                <div>
                  <Tag
                    size="100px"
                    color="#0e1731"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    The
                  </Tag>
                </div>
                <div>
                  <Tag
                    size="100px"
                    color="#0e1731"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    Team
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#ffffff"
                    size="27px"
                    color="#0e1731"
                    link={true}
                    linkto="/the_team"
                    add={{
                      display: 'inline-block',
                      marginBottom: '27px',
                      border: '1px solid #0e1731'
                    }}
                  >
                    Check out the team
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetTeam;
