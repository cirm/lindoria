import React, { PropTypes } from 'react';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import TextField from 'redux-form-material-ui/lib/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { Field, reduxForm, reset } from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
import PureComponent from '../lib/PureComponent';
import { createDomain } from './lCreateActionCreators';
import styles from './lActionContainer.styl';


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
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const formContainerClass = 'container login';
    const formClass = `${formContainerClass} form`;
    const toolbarClass = `${formContainerClass} toolbar`;

    return (

      <Paper zdepth={1} className={styles.root} >
        <Toolbar className={toolbarClass} >
          <ToolbarGroup >
            <ToolbarTitle text="Enter Domain details" />
          </ToolbarGroup>
        </Toolbar>
        <form className={formClass} onSubmit={handleSubmit(this.saveDomain)} >
          <div>
            <Field name="dname" component={TextField} floatingLabelText="Unique key" />
          </div>
          <div>
            <Field name="display" component={TextField} floatingLabelText="Organization name" />
          </div>
          <div>
            <Field name="regent" component={SelectField} floatingLabelText="The master Guy" >
              {this.getPersons().map(person =>
                <MenuItem value={person.get('pname')} primaryText={person.get('display')} />)}
            </Field>
          </div>
          <div>
            <Field name="abbr" component={TextField} floatingLabelText="Shortened form" />
          </div>
          <div>
            <Field name="treasury" component={TextField} floatingLabelText="Big dollaz" type="number" />
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
