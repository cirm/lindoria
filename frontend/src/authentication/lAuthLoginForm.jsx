import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from 'redux-form-material-ui/lib/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { authenticateUser } from './lAuthActionCreators';
import styles from './lAuthLoginForm.styl';


let dispatch;
const triggerLogin = values => dispatch(authenticateUser(values));

const loginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  dispatch = props.dispatch;
  return (
    <Paper zdepth={1} className={styles.form} >
      <Toolbar >
        <ToolbarGroup >
          <ToolbarTitle text="Please Authenticate!" />
        </ToolbarGroup>
      </Toolbar>
      <form onSubmit={handleSubmit(triggerLogin)} >
        <div>
          <Field name="username" component={TextField} floatingLabelText="username" />
        </div>
        <div>
          <Field name="password" component={TextField} type="password" floatingLabelText="password" />
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
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
};

const LoginForm = reduxForm({
  form: 'loginForm',
})(loginForm);

export default LoginForm;
