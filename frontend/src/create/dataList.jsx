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
import { startEdit } from './lCreateActionCreators';
import styles from './lListContainer.styl';

let columnHeaders = [];

const getData = (data) => {
  if (!data.size) return [];
  return data.first().mapKeys(key => columnHeaders.push(key));
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

const filterStyle = {
  width: '6rem',
  fontSize: '1em',
};

const editRow = (props, item) => props.dispatch(startEdit(item.set('type', props.type)));

const dataList = (props) => {
  columnHeaders = [];
  getData(props.fields);
  return (
    <Paper className={styles.root} >
      {columnHeaders.length >= 1 ?
        <Table height="30em" >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>{map(header => (
              <TableHeaderColumn key={header} >
                {<TextField style={filterStyle} className="filterField" floatingLabelText={headerMap[header]} />}
              </TableHeaderColumn>
            ))(columnHeaders)}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {props.fields.map(item =>
              <TableRow
                onTouchTap={() => editRow(props, item)}
                key={item.get(columnHeaders[0])}
              >{map(header =>
                <TableRowColumn key={item.get(header)} >
                  {item.get(header)}
                </TableRowColumn>)(columnHeaders)}
              </TableRow>)}
          </TableBody>
        </Table> : <h4>No data to display!</h4>}
    </Paper>
  );
};

dataList.propTypes = {
  fields: PropTypes.object,
};

export default dataList;
