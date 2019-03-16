import React, { Component } from 'react';
import { firebaseDB } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const style = {
  cell: {
    padding: '4px 16px 4px 11px',
    borderBottom: '1px solid #ffffff',
    color: '#ffffff',
    textAlign: 'center'
  }
};

class RankingsTable extends Component {
  state = {
    rankings: []
  };

  componentDidMount() {
    firebaseDB
      .ref('rankings')
      .once('value')
      .then(snapshot => {
        const rankings = firebaseLooper(snapshot);

        this.setState({
          rankings
        });
      });
  }

  showTeamRankings = rank =>
    rank
      ? rank.map((rank, i) => (
          <TableRow key={i}>
            <TableCell style={style.cell}>{i + 1}</TableCell>
            <TableCell style={style.cell}>{rank.team}</TableCell>
            <TableCell numeric style={style.cell}>
              {rank.points}
            </TableCell>
          </TableRow>
        ))
      : null;

  render() {
    return (
      <div className="rankings_table_wrapper">
        <div className="title">UCI Team Rankings</div>
        <div style={{ background: '#A89375' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={style.cell}>Ranking</TableCell>
                <TableCell style={style.cell}>Team</TableCell>
                <TableCell style={style.cell}>UCI Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.showTeamRankings(this.state.rankings)}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default RankingsTable;
