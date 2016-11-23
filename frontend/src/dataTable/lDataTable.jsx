import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import map from 'lodash/fp/map';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import { startEdit, applyFilter, setTableData } from './lDataTableActionCreators';
import PureComponent from '../lib/PureComponent';
import styles from './lListContainer.styl';

const filterStyle = {
  width: '6rem',
  fontSize: '1em',
};

const headerMap = {
  pname: 'Unique key',
  display: 'Display name',
  treasury: 'Treasury',
  abbr: 'Abbr',
  dname: 'Unique key',
  ruler: 'Ruler',
  regent: 'Regent',
  loyalty: 'Loyalty',
  level: 'Level',
  domain: 'Domain',
  oname: 'Unique key',
  owner: 'Responsible person',
};

class DataTable extends PureComponent {
  setFilter(event, type) {
    console.log(event.target.value);
    console.log(type);
  };

  editRow(item) {
    this.props.dispatch(startEdit(item.set('type', this.props.type)));
  }

  render() {
    return (
      <Paper className={styles.root} >
        {this.props.columnHeaders.length >= 1 ?
          <Table height="30em" >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>{map(header => (
                <TableHeaderColumn key={header} >
                  {<TextField
                    style={filterStyle} className="filterField" key={header} floatingLabelText={headerMap[header]}
                    onChange={e => this.setFilter(e, header)}
                  />}
                </TableHeaderColumn>
              ))(this.props.columnHeaders)}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} >
              {this.props.fields.map(item =>
                <TableRow
                  onTouchTap={() => this.editRow(item)}
                  key={item.get(this.props.columnHeaders[0])}
                >{map(header =>
                  <TableRowColumn key={item.get(header)} >
                    {item.get(header)}
                  </TableRowColumn>)(this.props.columnHeaders)}
                </TableRow>)}
            </TableBody>
          </Table> : <h4>No data to display!</h4>}
      </Paper>
    );
  }
}

DataTable.propTypes = {
  fields: PropTypes.object,
};

export default DataTable;
