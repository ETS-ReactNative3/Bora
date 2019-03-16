import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase';

const AdminNav = () => {
  const links = [
    {
      title: 'Races',
      linkTo: '/admin_races'
    },
    {
      title: 'Add Race',
      linkTo: '/admin_races/edit_race'
    },
    {
      title: 'Riders',
      linkTo: '/admin_riders'
    },
    {
      title: 'Add Riders',
      linkTo: '/admin_riders/add_riders'
    }
  ];

  const style = {
    color: '#ffffff',
    fontWeight: '300',
    borderBottom: '1px solid #353535'
  };

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Log out succesfull');
        },
        error => {
          console.log('Error logging out');
        }
      );
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={() => logoutHandler()}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;
