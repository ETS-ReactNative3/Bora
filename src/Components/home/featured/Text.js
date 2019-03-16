import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import FeaturedRider from '../../../Resources/images/featuredRider.png';

class Text extends Component {
  animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, rotate }) => {
        return (
          <div
            className="featured_bora"
            style={{
              opacity,
              transform: `translate(270px,170px) rotateY(${rotate}deg)`
            }}
          >
            BORA
          </div>
        );
      }}
    </Animate>
  );

  animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 450
      }}
      enter={{
        opacity: [1],
        x: [260],
        y: [310],
        timing: { duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured_hg"
            style={{
              opacity,
              transform: `translate(${x}px,${y}px)`
            }}
          >
            hansgrohe
          </div>
        );
      }}
    </Animate>
  );

  animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 586
      }}
      enter={{
        opacity: [1],
        x: [260],
        y: [640],
        timing: { delay: 300, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured_cycling"
            style={{
              opacity,
              transform: `translate(${x}px,${y}px)`
            }}
          >
            German Professional Cycling Team
          </div>
        );
      }}
    </Animate>
  );

  animateRider = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],
        timing: { delay: 800, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity }) => {
        return (
          <div
            className="featured_rider"
            style={{
              opacity,
              background: `url(${FeaturedRider})`,
              transform: `translate(670px,100px)`
            }}
          />
        );
      }}
    </Animate>
  );

  render() {
    return (
      <div className="featured_text">
        {this.animateRider()}
        {this.animateNumber()}
        {this.animateFirst()}
        {this.animateSecond()}
      </div>
    );
  }
}

export default Text;
