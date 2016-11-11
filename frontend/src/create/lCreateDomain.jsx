import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
import PureComponent from '../lib/PureComponent';
import { createDomain } from './lCreateActionCreators';

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

class CreateDomain extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['saveDomain']);
  }

  getPersons() {
    return this.props.persons || [];
  }

  saveDomain(values) {
    console.log(values);
    this.props.dispatch(createDomain(values));
  }

  render() {
    const { handleSubmit } = this.props;
    const formContainerClass = 'container login';
    const formClass = `${formContainerClass} form`;
    const toolbarClass = `${formContainerClass} toolbar`;

    return (

      <Paper zdepth={1} className={formContainerClass} >
        <Toolbar className={toolbarClass} >
          <ToolbarGroup >
            <ToolbarTitle text="Enter Domain details" />
          </ToolbarGroup>
        </Toolbar>
        <form className={formClass} onSubmit={handleSubmit(this.saveDomain)} >
          <div>
            <Field name="dname" component={renderTextField} label="Unique key" />
          </div>
          <div>
            <Field name="display" component={renderTextField} label="Organization name" />
          </div>
          <div>
            <Field name="regent" component={renderSelectField} label="The master Guy" >
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
    )
      ;
  }

}

const CreateDomainContainer = reduxForm({
  form: 'createDomain',
})(CreateDomain);

export default CreateDomainContainer;
