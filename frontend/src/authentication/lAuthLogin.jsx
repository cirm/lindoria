import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { reduxForm } from 'redux-form';
import { authenticateUser } from './lAuthActionCreators';
import Paper from 'material-ui/Paper';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['triggerLogin']);
  }

  triggerLogin(values) {
    const dispatch = this.props.dispatch;
    dispatch(authenticateUser(values));
  }

  render() {
    const { fields: { username, password }, handleSubmit } = this.props;
    const formContainerClass = 'container login';
    const formClass = `${formContainerClass} form`;
    const toolbarClass = `${formContainerClass} toolbar`;
    return (
      <Paper zdepth={1} className={formContainerClass} >
        <Toolbar className={toolbarClass} >
          <ToolbarGroup >
            <ToolbarTitle text="Please Authenticate!" />
          </ToolbarGroup>
        </Toolbar>
        <form className={formClass} onSubmit={handleSubmit(this.triggerLogin)} >
          <TextField id="username" hintText="username" {...username} />
          <br /><br />
          <TextField id="password" hintText="password" type="password" {...password} />
          <br /><br />
          <RaisedButton label="Submit" type="submit" primary style={{ margin: 12 }} />
        </form>
      </Paper>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
};

const LoginFormContainer = reduxForm({
  form: 'login',
  fields: ['username', 'password'],
})(Login);

export default LoginFormContainer;
