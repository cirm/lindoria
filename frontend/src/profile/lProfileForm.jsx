import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { reduxForm } from 'redux-form';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Paper from 'material-ui/Paper';
import PureComponent from '../lib/PureComponent';
import styles from './lProfileDashboard.styl';


class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['triggerUpdate']);
  }

  getUsername() {
    return this.props.profile.get('username');
  }

  getDisplay() {
    return this.props.profile.get('display');
  }

  getRoles() {
    return this.props.profile.get('roles') || [];
  }

  triggerUpdate(values) {
    console.log(values);
    // const dispatch = this.props.dispatch;
    // dispatch(authenticateUser(values));
  }

  render() {
    const { fields: { display, password, password1 }, handleSubmit } = this.props;
    return (
      <Paper className={styles.paper} >
        <Toolbar className={styles.toolbar} >
          <ToolbarGroup >
            <ToolbarTitle text="Profile" />
          </ToolbarGroup>
        </Toolbar>
        <form className={styles.form} onSubmit={handleSubmit(this.triggerUpdate)} >
          <TextField
            id="display"
            floatingLabelFixed
            floatingLabelText="Display name"
            hintText={this.getDisplay()} {...display}
          />
          <br />
          <TextField
            id="password"
            floatingLabelText="Password"
            hintText="password"
            type="password" {...password}
          />
          <br />
          <TextField
            id="password1"
            floatingLabelText="Password again"
            hintText="password"
            type="password" {...password1}
          />
          <br />
          <TextField
            id="username"
            floatingLabelText="Username"
            floatingLabelFixed hintText={this.getUsername()}
            disabled
          />
          <br />
          <TextField
            id="roles"
            floatingLabelText="Roles"
            floatingLabelFixed
            hintText={this.getRoles().map(role => `${role} `)}
            disabled
          />
          <br />
          <RaisedButton label="Update" type="submit" primary disabled style={{ margin: 12 }} />
        </form>
      </Paper>
    );
  }
}

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.list,
  profile: ImmutablePropTypes.map,
};

export const ProfileFormContainer = reduxForm({
  form: 'profile',
  fields: ['display', 'password', 'password1'],
})(ProfileForm);

export default ProfileFormContainer;
