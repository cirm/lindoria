import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { loyaltyMap, getDisplay } from '../lib/utilities';

const lindoriaFocus = props => (
  <Paper zDepth={2} className="container focus province" >
    <TextField
      id="display"
      floatingLabelText="display"
      floatingLabelFixed
      hintText={props.focus.getIn(['province', 'display'])}
      disabled
    />
    <br />
    <TextField
      id="owner"
      floatingLabelText="regent"
      floatingLabelFixed
      hintText={getDisplay('persons', props) || 'unknown'}
      disabled
    />
    <br />
    <TextField
      id="domain"
      floatingLabelText="domain"
      floatingLabelFixed
      hintText={getDisplay('domains', props) || 'unalligned'}
      disabled
    />
    <br />
    <TextField
      id="level"
      floatingLabelText="Province level"
      floatingLabelFixed
      hintText={props.focus.getIn(['province', 'level']) || '0'}
      disabled
    />
    <br />
    <TextField
      id="loyalty"
      floatingLabelText="Province loyalty"
      floatingLabelFixed
      hintText={loyaltyMap[props.focus.getIn(['province', 'loyalty'])] || loyaltyMap[3]}
      disabled
    />
    <br />
  </Paper>);

lindoriaFocus.propTypes = {
  focus: ImmutablePropTypes.map,
};

export default lindoriaFocus;
