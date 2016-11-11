import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import map from 'lodash/map';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

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

const dataList = (props) => {
  columnHeaders = [];
  getData(props.fields);
  return (
    <Paper className="dataList" >
      {columnHeaders.length >= 1 ?
        <Table height="30em" >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>{map(columnHeaders, header => (
              <TableHeaderColumn key={header} >
                {<TextField style={filterStyle} className="filterField" floatingLabelText={headerMap[header]} />}
              </TableHeaderColumn>
            ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {props.fields.map(item =>
              <TableRow key={item.get(columnHeaders[0])} >{map(columnHeaders, header =>
                <TableRowColumn key={item.get(header)} >
                  {item.get(header)}
                </TableRowColumn>)}
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
