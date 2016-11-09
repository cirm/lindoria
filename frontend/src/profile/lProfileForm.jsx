import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';

class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['triggerUpdate']);
  }

  triggerUpdate(values) {
    console.log(values);
    // const dispatch = this.props.dispatch;
    // dispatch(authenticateUser(values));
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

  render() {
    const { fields: { display, password, password1 }, handleSubmit } = this.props;
    const formContainerClass = 'container profile';
    const formClass = `${formContainerClass} form`;
    const toolbarClass = `${formContainerClass} toolbar`;
    return (
      <Paper className={formContainerClass} >
        <Toolbar className={toolbarClass} >
          <ToolbarGroup >
            <ToolbarTitle text="Profile" />
          </ToolbarGroup>
        </Toolbar>
        <form className={formClass} onSubmit={handleSubmit(this.triggerUpdate)} >
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
            type="password" {...password1} />
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
  dispatch: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  fields: React.PropTypes.array,
  profile: React.PropTypes.object,
  className: React.PropTypes.object,
};

export const ProfileFormContainer = reduxForm({
  form: 'profile',
  fields: ['display', 'password', 'password1'],
})(ProfileForm);

export default ProfileFormContainer;
