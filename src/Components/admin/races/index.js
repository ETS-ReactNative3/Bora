import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseRaces } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class AdminRaces extends Component {
  state = {
    isloading: true,
    races: []
  };

  componentDidMount() {
    firebaseRaces
      .orderByChild('date')
      .once('value')
      .then(snapshot => {
        const races = firebaseLooper(snapshot);

        this.setState({
          isloading: false,
          races: reverseArray(races)
        });
      });
  }

  render() {
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Race</TableCell>
                  <TableCell>Best Bora Rider</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.races
                  ? this.state.races.map((race, i) => (
                      <TableRow key={i}>
                        <TableCell>{race.date}</TableCell>
                        <TableCell>
                          <Link to={`/admin_races/edit_race/${race.id}`}>{race.raceName}</Link>
                        </TableCell>
                        <TableCell>{race.bestBoraRider}</TableCell>
                        <TableCell>{race.bestBoraResult}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isloading ? <CircularProgress thickness={7} style={{ color: '#98c5e9' }} /> : ''}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminRaces;
