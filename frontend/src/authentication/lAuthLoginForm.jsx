import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { authenticateUser } from './lAuthActionCreators';


const renderTextField = field => (
  <TextField
    hintText={field.label}
    type={field.type}
    errorText={field.touched && field.error}
    {...field.input}
  />
);

let dispatch;
const formContainerClass = 'container login';
const formClass = `${formContainerClass} form`;
const toolbarClass = `${formContainerClass} toolbar`;
const triggerLogin = (values) => dispatch(authenticateUser(values));


const loginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  dispatch = props.dispatch;
  return (
    <Paper zdepth={1} className={formContainerClass} >
      <Toolbar className={toolbarClass} >
        <ToolbarGroup >
          <ToolbarTitle text="Please Authenticate!" />
        </ToolbarGroup>
      </Toolbar>
      <form className={formClass} onSubmit={handleSubmit(triggerLogin)} >
        <div>
          <Field name="username" component={renderTextField} label="username" />
        </div>
        <div>
          <Field name="password" component={renderTextField} type="password" label="password" />
        </div>
        <div>
          <RaisedButton
            type="submit"
            disabled={pristine || submitting}
            style={{ margin: 12 }}
          >Submit
          </RaisedButton>
          <RaisedButton
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            style={{ margin: 12 }}
          >
            Reset
          </RaisedButton>
        </div>
      </form>
    </Paper>
  );
};

loginForm.propTypes = {
  dispatch: PropTypes.func,
};

const LoginForm = reduxForm({
  form: 'loginForm',
})(loginForm);

export default LoginForm;
