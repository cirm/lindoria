import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export class LindoriaDomainFocus extends PureComponent {
  render() {
    return (
      <Paper zDepth={2} className="container focus domain" >
        <TextField
          id="display"
          floatingLabelText="display"
          floatingLabelFixed
          hintText={this.props.focus.getIn(['domain', 'display']) || 'wilderness' }
          disabled
        />
        <br />
        <TextField
          id="ruler"
          floatingLabelText="ruler"
          floatingLabelFixed
          hintText={this.props.focus.getIn(['domain', 'regent']) || 'unknown'}
          disabled
        />
        <br />
        <TextField
          id="treasury"
          floatingLabelText="treasury"
          floatingLabelFixed
          hintText={this.props.focus.getIn(['domain', 'treasury']) || 'empty'}
          disabled
        />
        <br />
      </Paper>
    );
  }
}

LindoriaDomainFocus.propTypes = {
  focus: React.PropTypes.object,
};