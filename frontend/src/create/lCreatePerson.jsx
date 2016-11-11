import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { Field, reduxForm } from 'redux-form';
import PureComponent from '../lib/PureComponent';
import { createPerson } from './lCreateActionCreators';

const renderTextField = field => (
  <TextField
    hintText={field.label}
    errorText={field.touched && field.error}
    {...field.input}
  />
);

class CreatePerson extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['savePerson']);
  }

  savePerson(values) {
    console.log(values);
    this.props.dispatch(createPerson(values));
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Paper className="createPerson" zdepth={1} >
        <Toolbar className="toolBar" >
          <ToolbarGroup >
            <ToolbarTitle text="Enter Person details" />
          </ToolbarGroup>
        </Toolbar>
        <form className="personForm" onSubmit={handleSubmit(this.savePerson)} >
          <div>
            <Field name="pname" component={renderTextField} label="Unique key" />
          </div>
          <div>
            <Field name="display" component={renderTextField} label="Person name" />
          </div>
          <RaisedButton label="Save" type="submit" primary style={{ margin: 12 }} />
        </form>
      </Paper>
    );
  }
}

const CreatePersonContainer = reduxForm({
  form: 'createPerson',
})(CreatePerson);

export default CreatePersonContainer;
