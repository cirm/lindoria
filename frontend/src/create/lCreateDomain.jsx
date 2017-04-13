import React, { PropTypes } from 'react';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TextField from 'redux-form-material-ui/lib/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
import { createDomain } from './lCreateActionCreators';
import styles from './lActionContainer.styl';


class CreateDomain extends React.PureComponent {
  constructor(props) {
    super(props);
    this.saveDomain = this.saveDomain.bind(this);
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
    return (
      <Paper zdepth={1} className={styles.root} >
        <Toolbar>
          <ToolbarGroup >
            <ToolbarTitle text="Enter Domain details" />
          </ToolbarGroup>
        </Toolbar>
        <form onSubmit={handleSubmit(this.saveDomain)} >
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
          <RaisedButton label="Save" type="submit" primary className={styles.buttonMargin} />
        </form>
      </Paper>
    );
  }
}

CreateDomain.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  persons: ImmutablePropTypes.list,
};

const CreateDomainContainer = reduxForm({
  form: 'createDomain',
})(CreateDomain);

export default CreateDomainContainer;
