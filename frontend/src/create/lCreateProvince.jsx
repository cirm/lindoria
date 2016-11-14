import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { Field, reduxForm } from 'redux-form/immutable';
import PureComponent from '../lib/PureComponent';
import { createProvince } from './lCreateActionCreators';


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

const validate = (values) => {
  const errors = {};
  const requiredFields = ['domain', 'regent', 'loyalty'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const loyalty = [1, 2, 3, 4, 5];

const loyaltyMap = {
  1: 'hostile',
  2: 'unfriendly',
  3: 'indifferent',
  4: 'friendly',
  5: 'helpful',
};

const provinceLevels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

class CreateProvince extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['saveProvince']);
  }

  saveProvince(values) {
    this.props.dispatch(createProvince(values));
  }

  getPersons() {
    return this.props.persons || [];
  }

  getDomains() {
    return this.props.domains || [];
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Paper className="createProvince" zdepth={1} >
        <Toolbar className="toolBar" >
          <ToolbarGroup >
            <ToolbarTitle text="Enter Province details" />
          </ToolbarGroup>
        </Toolbar>
        <form className="provinceForm" onSubmit={handleSubmit(this.saveProvince)} >
          <div>
            <Field name="pname" component={renderTextField} label="Unique key" />
          </div>
          <div>
            <Field name="display" component={renderTextField} label="Province name" />
          </div>
          <div>
            <Field name="level" component={renderSelectField} label="Province level" >
              {provinceLevels.map(level =>
                <MenuItem value={level} primaryText={level} />)}
            </Field>
          </div>
          <div>
            <Field name="loyalty" component={renderSelectField} label="Are we Happy?" >
              {loyalty.map(key => <MenuItem value={key} primaryText={loyaltyMap[key]} />)}
            </Field>
          </div>
          <div>
            <Field name="regent" component={renderSelectField} label="The master Guy" >
              {this.getPersons().map(person =>
                <MenuItem value={person.get('pname')} primaryText={person.get('display')} />)}
            </Field>
          </div>
          <div>
            <Field name="domain" component={renderSelectField} label="Where it belongs" >
              {this.getDomains().map(domain =>
                <MenuItem value={domain.get('dname')} primaryText={domain.get('display')} />)}
            </Field>
          </div>
          <div>
            <Field name="abbr" component={renderTextField} label="Shortened form" />
          </div>
          <RaisedButton label="Save" type="submit" primary style={{ margin: 12 }} />
        </form>
      </Paper>
    );
  }
}

const CreateProvinceContainer = reduxForm({
  form: 'createProvince',
  validate,
})(CreateProvince);

export default CreateProvinceContainer;
