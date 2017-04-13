import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import TextField from 'redux-form-material-ui/lib/TextField';
import { Field, reduxForm } from 'redux-form/immutable';
import { createOrganization } from './lCreateActionCreators';
import styles from './lActionContainer.styl';


class CreateOrganization extends React.PureComponent {
  constructor(props) {
    super(props);
    this.saveOrganization = this.saveOrganization.bind(this);
  }

  getPersons() {
    return this.props.persons || [];
  }

  saveOrganization(values) {
    console.log(values);
    this.props.dispatch(createOrganization(values));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Paper className={styles.root} zdepth={1} >
        <Toolbar className="toolBar" >
          <ToolbarGroup >
            <ToolbarTitle text="Enter Organization details" />
          </ToolbarGroup>
        </Toolbar>
        <form className="organizationForm" onSubmit={handleSubmit(this.saveOrganization)} >
          <div>
            <Field name="oname" component={TextField} floatingLabelText="Unique key" />
          </div>
          <div>
            <Field name="display" component={TextField} floatingLabelText="Organization name" />
          </div>
          <div>
            <Field name="owner" component={SelectField} floatingLabelText="The master Guy" >
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
          <RaisedButton label="Save" type="submit" primary className={styles.buttonMargin} />
        </form>
      </Paper>
    );
  }
}

CreateOrganization.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  persons: ImmutablePropTypes.list,
};

const CreateOrganizationContainer = reduxForm({
  form: 'createOrganization',
})(CreateOrganization);

export default CreateOrganizationContainer;
