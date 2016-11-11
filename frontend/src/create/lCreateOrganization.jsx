import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { Field, reduxForm } from 'redux-form';
import PureComponent from '../lib/PureComponent';
import { createOrganization } from './lCreateActionCreators';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


const renderTextField = field => (
  <TextField
    floatingLabelText={field.label}
    hintText={field.label}
    errorText={field.touched && field.error}
    {...field.input}
  />
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

class CreateOrganization extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['saveOrganization']);
  }

  saveOrganization(values) {
    console.log(values);
    this.props.dispatch(createOrganization(values));
  }

  getPersons() {
    return this.props.persons || [];
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Paper className="createOrganization" zdepth={1} >
        <Toolbar className="toolBar" >
          <ToolbarGroup >
            <ToolbarTitle text="Enter Organization details" />
          </ToolbarGroup>
        </Toolbar>
        <form className="organizationForm" onSubmit={handleSubmit(this.saveOrganization)} >
          <div>
            <Field name="oname" component={renderTextField} label="Unique key"/>
          </div>
          <div>
            <Field name="display" component={renderTextField} label="Organization name" />
          </div>
          <div>
            <Field name="owner" component={renderSelectField} label="The master Guy" >
              {this.getPersons().map(person =>
                <MenuItem value={person.get('pname')} primaryText={person.get('display')} />)}
            </Field>
          </div>
          <div>
            <Field name="abbr" component={renderTextField} label="Shortened form" />
          </div>
          <div>
            <Field name="treasury" component={renderTextField} label="Big dollaz" type="number" />
          </div>
          <RaisedButton label="Save" type="submit" primary style={{ margin: 12 }} />
        </form>
      </Paper>
    );
  }
}

const CreateOrganizationContainer = reduxForm({
  form: 'createOrganization',
})(CreateOrganization);

export default CreateOrganizationContainer;
