import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import PureComponent from '../lib/PureComponent';
import { createPerson } from './lCreateActionCreators';
import styles from './lActionContainer.styl';

const renderTextField = field => (
  <TextField
    hintText={field.label}
    disabled={field.disabled}
    errorText={field.touched && field.error}
    {...field.input}
  />
);

class CreatePerson extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['savePerson']);
  }

  getLabel() {
    return this.isEdit() ? 'Edit' : 'Save';
  }

  isEdit() {
    if (!this.props.editFocus) return false;
    return this.props.editFocus.get('type') === 'person';
  }

  savePerson(values) {
    this.isEdit() ?
      console.log(values) :
      this.props.dispatch(createPerson(values));
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Paper className={styles.root} zdepth={1} >
        <Toolbar className="toolBar" >
          <ToolbarGroup >
            <ToolbarTitle text={this.isEdit() ? 'Edit person details' : 'Enter Person details'} />
          </ToolbarGroup>
        </Toolbar>
        <form className="personForm" onSubmit={handleSubmit(this.savePerson)} >
          <div>
            <Field
              name="pname" component={renderTextField} label="Unique name"
              disabled={this.isEdit()}
            />
          </div>
          <div>
            <Field
              name="display" component={renderTextField} label="Display name"
            />
          </div>
          <RaisedButton label={this.getLabel()} type="submit" primary style={{ margin: 12 }} />
        </form>
      </Paper>
    );
  }
}

const CreatePersonForm = reduxForm({
  form: ' createPerson',
})(CreatePerson);

const CreatePersonContainer = connect(
  state => ({ initialValues: state.getIn(['landing', 'editFocus']) }),
)(CreatePersonForm);

export default CreatePersonContainer;
