import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { authenticateUser } from './lAuthActionCreators';
import styles from './lAuthLoginForm.styl';


const renderTextField = field => (
  <TextField
    className={styles.textField}
    hintText={field.label}
    type={field.type}
    errorText={field.touched && field.error}
    {...field.input}
  />
);

let dispatch;
const triggerLogin = values => dispatch(authenticateUser(values));


const loginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  dispatch = props.dispatch;
  return (
    <Paper zdepth={1} className={styles.root} >
      <Toolbar >
        <ToolbarGroup >
          <ToolbarTitle text="Please Authenticate!" />
        </ToolbarGroup>
      </Toolbar>
      <form onSubmit={handleSubmit(triggerLogin)} >
        <div>
          <Field name="username" component={renderTextField} label="username" />
        </div>
        <div>
          <Field name="password" component={renderTextField} type="password" label="password" />
        </div>
        <div>
          <RaisedButton
            className={styles.button}
            type="submit"
            disabled={pristine || submitting}
          >Submit
          </RaisedButton>
          <RaisedButton
            className={styles.button}
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
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
