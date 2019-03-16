import React from 'react';
import { BoraLogo } from '../ui/icons';

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <BoraLogo width="150px" height="75px" link={true} linkTo="/" />
      </div>
      <div className="footer_discl">BORA hansgrohe 2018.All rights reserved.</div>
    </footer>
  );
};

export default Footer;
