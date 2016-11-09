import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const loyaltyMap = {
  1: 'Hostile',
  2: 'Unfriendly',
  3: 'Indifferent',
  4: 'Friendly',
  5: 'Helpful',
};

export class LindoriaFocus extends PureComponent {
  render() {
    return (
      <Paper zDepth={2} className="container focus province" >
        <TextField
          id="display"
          floatingLabelText="display"
          floatingLabelFixed
          hintText={this.props.focus.getIn(['province', 'display'])}
          disabled
        />
        <br />
        <TextField
          id="owner"
          floatingLabelText="regent"
          floatingLabelFixed
          hintText={this.props.focus.getIn(['province', 'regent']) || 'unknown'}
          disabled
        />
        <br />
        <TextField
          id="domain"
          floatingLabelText="domain"
          floatingLabelFixed
          hintText={this.props.focus.getIn(['province', 'domain']) || 'unalligned'}
          disabled
        />
        <br />
        <TextField
          id="level"
          floatingLabelText="Province level"
          floatingLabelFixed
          hintText={this.props.focus.getIn(['province', 'level']) || '0'}
          disabled
        />
        <br />
        <TextField
          id="loyalty"
          floatingLabelText="Province loyalty"
          floatingLabelFixed
          hintText={loyaltyMap[this.props.focus.getIn(['province', 'loyalty'])] || loyaltyMap[3]}
          disabled
        />
        <br />
      </Paper>
    );
  }
}

LindoriaFocus.propTypes = {
  focus: React.PropTypes.object,
};