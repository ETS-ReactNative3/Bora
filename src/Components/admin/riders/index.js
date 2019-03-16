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

import { firebaseRiders } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class AdminRiders extends Component {
  state = {
    isloading: true,
    riders: []
  };

  componentDidMount() {
    firebaseRiders.once('value').then(snapshot => {
      const riders = firebaseLooper(snapshot);

      this.setState({
        isloading: false,
        riders: reverseArray(riders)
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
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Speciality</TableCell>
                  <TableCell>UCI Ranking</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.riders
                  ? this.state.riders.map((rider, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Link to={`/admin_riders/add_riders/${rider.id}`}>{rider.firstname}</Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_riders/add_riders/${rider.id}`}>{rider.lastname}</Link>
                        </TableCell>
                        <TableCell>{rider.speciality}</TableCell>
                        <TableCell>{rider.ranking}</TableCell>
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

export default AdminRiders;
