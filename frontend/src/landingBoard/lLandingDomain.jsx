import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getDisplay } from '../lib/utilities';
import styles from './lLandingFocus.styl';


const lindoriaDomainFocus = props => (
  <Paper className={styles.focus} zDepth={2} >
    <TextField
      id="display"
      floatingLabelText="display"
      floatingLabelFixed
      hintText={props.focus.getIn(['domain', 'display']) || 'wilderness'}
      disabled
    />
    <br />
    <TextField
      id="ruler"
      floatingLabelText="ruler"
      floatingLabelFixed
      hintText={getDisplay('persons', props) || 'unknown'}
      disabled
    />
    <br />
    <TextField
      id="treasury"
      floatingLabelText="treasury"
      floatingLabelFixed
      hintText={props.focus.getIn(['domain', 'treasury']) || 'empty'}
      disabled
    />
    <br />
  </Paper>
);

lindoriaDomainFocus.propTypes = {
  focus: ImmutablePropTypes.map,
};

export default lindoriaDomainFocus;