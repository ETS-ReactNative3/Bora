import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import { BoraLogo } from '../ui/icons';

class Header extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: '#339C82',
          boxShadow: 'none',
          padding: '10px 0',
          borderBottom: '2px solid #00285e'
        }}
      >
        <Toolbar style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <BoraLogo link={true} linkTo="/" width="150px" height="75px" />
            </div>
          </div>

          <Link to="/admin_races">
            <Button color="inherit">Admin</Button>
          </Link>
          <Link to="/the_team">
            <Button color="inherit">The team</Button>
          </Link>
          <Link to="/the_races">
            <Button color="inherit">Races</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
