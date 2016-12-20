import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import map from 'lodash/fp/map';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import { startEdit, applyFilter } from './lDataTableActionCreators';
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
  province: 'Located in',
  type: 'Holding type',
  holding_id: 'Holding id',
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
  getData() {
    if (!this.props.tableData) return this.props.fields;
    if (this.props.tableData.first().keySeq().equals(this.props.fields.first().keySeq())) {
      return this.props.tableData;
    }
    return this.props.fields;
  }

  setFilter(event, field) {
    return this.props.dispatch(applyFilter(event.target.value, field, this.props.type));
  }

  editRow(item) {
    this.props.dispatch(startEdit(item.set('type', this.props.type)));
  }

  render() {
    return (
      <Paper className={styles.root} >
        {this.props.columnHeaders.length >= 1 ?
          <Table className={styles.table} >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>{map(header => (
                <TableHeaderColumn key={header} >
                  {<TextField
                    style={filterStyle} className={styles.filterField} key={header}
                    floatingLabelText={headerMap[header]}
                    onChange={e => this.setFilter(e, header)}
                  />}
                </TableHeaderColumn>
              ))(this.props.columnHeaders)}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} >
              {this.getData().map(item =>
                <TableRow
                  className={styles.tableRow}
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
  fields: ImmutablePropTypes.listOf(
    ImmutablePropTypes.map,
  ),
  columnHeaders: PropTypes.arrayOf(PropTypes.string),
  tableData: ImmutablePropTypes.list,
  dispatch: PropTypes.func,
  type: PropTypes.string,
};

export default DataTable;
