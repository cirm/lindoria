import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import map from 'lodash/fp/map';
import { Field, reduxForm } from 'redux-form/immutable';
import PureComponent from '../lib/PureComponent';
import { createProvince, editProvince, stopEdit } from './lCreateActionCreators';
import styles from './lActionContainer.styl';


const renderTextField = field => (
  <TextField
    floatingLabelText={field.label}
    disabled={field.disabled}
    errorText={field.touched && field.error}
    {...field.input}
  />
);

const renderSelectField = field => (
  <SelectField
    floatingLabelText={field.label}
    errorText={field.meta.touched && field.meta.error}
    onChange={(event, index, value) => field.input.onChange(value)}
    {...field.input}
    {...field.custom}
  >{field.children}</SelectField>
);

/*
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
 */

const loyalty = [1, 2, 3, 4, 5];

const loyaltyMap = {
  1: 'Hostile',
  2: 'Unfriendly',
  3: 'Indifferent',
  4: 'Friendly',
  5: 'Helpful',
};

const provinceLevels = ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class CreateProvince extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['saveProvince']);
  }

  getFromProps(type) {
    return this.props[type] || [];
  }

  getLabel() {
    return this.isEdit() ? 'Edit' : 'Save';
  }

  stopEdit() {
    return this.props.dispatch(stopEdit());
  }

  isEdit() {
    if (!this.props.editFocus) return false;
    return this.props.editFocus.get('type') === 'province';
  }

  saveProvince(values) {
    if (this.isEdit()) {
      return this.props.dispatch(editProvince(values));
    }
    return this.props.dispatch(createProvince(values));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Paper className={styles.root} zdepth={1} >
        <Toolbar >
          <ToolbarGroup >
            <ToolbarTitle
              text={this.isEdit() ? `Edit ${this.props.editFocus.get('display')} details` : 'Enter Domain details'}
            />
          </ToolbarGroup>
        </Toolbar>
        <form className="provinceForm" onSubmit={handleSubmit(this.saveProvince)} >
          <div>
            <Field name="pname" component={renderTextField} disabled={this.isEdit()} label="Unique key" />
          </div>
          <div>
            <Field name="display" component={renderTextField} label="Province name" />
          </div>
          <div>
            <Field name="level" component={renderSelectField} label="Province level" >
              {map(level => <MenuItem
                value={level}
                primaryText={level}
              />)(provinceLevels)}
            </Field>
          </div>
          <div>
            <Field name="loyalty" component={renderSelectField} label="Are we Happy?" >
              {map(key => <MenuItem value={key} primaryText={loyaltyMap[key]} />)(loyalty)}
            </Field>
          </div>
          <div>
            <Field name="regent" component={renderSelectField} label="The master Guy" >
              {this.getFromProps('persons').map(person =>
                <MenuItem value={person.get('pname')} key={person.get('pname')} primaryText={person.get('display')} />)}
            </Field>
          </div>
          <div>
            <Field name="domain" component={renderSelectField} label="Where it belongs" >
              {this.getFromProps('domains').map(domain =>
                <MenuItem value={domain.get('dname')} key={domain.get('dname')} primaryText={domain.get('display')} />)}
            </Field>
          </div>
          <div>
            <Field name="abbr" component={renderTextField} label="Shortened form" />
          </div>
          <RaisedButton label={this.getLabel()} type="submit" primary style={{ margin: 12 }} />
          {this.isEdit() ?
            <RaisedButton
              label="Reset"
              type="button"
              onTouchTap={() => this.stopEdit()}
              style={{ margin: 12 }}
            /> :
            null}
        </form>
      </Paper>
    );
  }
}

CreateProvince.propTypes = {
  editFocus: ImmutablePropTypes.map,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const CreateProvinceForm = reduxForm({
  form: 'createProvince',
  // validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(CreateProvince);

const CreateProvinceContainer = connect(
  state => ({ initialValues: state.getIn(['landing', 'editFocus']) }),
)(CreateProvinceForm);


export default CreateProvinceContainer;
