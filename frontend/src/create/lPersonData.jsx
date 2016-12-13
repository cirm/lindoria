import React, { PropTypes } from 'react';
import TextField from 'redux-form-material-ui/lib/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import PureComponent from '../lib/PureComponent';
import { createPerson, editPerson, stopEdit } from './lCreateActionCreators';
import styles from './lActionContainer.styl';

class CreatePerson extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['savePerson']);
  }

  getLabel() {
    return this.isEdit() ? 'Edit' : 'Save';
  }

  stopEdit(change) {
    this.props.dispatch(stopEdit());
    change('pname', '');
    change('display', '');
  }

  isEdit() {
    if (!this.props.editFocus) return false;
    return this.props.editFocus.get('type') === 'persons';
  }

  savePerson(values) {
    this.isEdit() ?
      this.props.dispatch(editPerson(values)) :
      this.props.dispatch(createPerson(values));
  }

  render() {
    const { handleSubmit, change } = this.props;
    return (
      <Paper className={styles.root} zdepth={1} >
        <Toolbar >
          <ToolbarGroup >
            <ToolbarTitle text={this.isEdit() ? 'Edit person details' : 'Enter Person details'} />
          </ToolbarGroup>
        </Toolbar>
        <form className="personForm" onSubmit={handleSubmit(this.savePerson)} >
          <div>
            <Field
              name="pname" component={TextField} floatingLabelText="Unique name" disabled={this.isEdit()}
            />
          </div>
          <div>
            <Field
              name="display" component={TextField} floatingLabelText="Display name"
            />
          </div>
          <RaisedButton label={this.getLabel()} type="submit" primary style={{ margin: 12 }} />
          {this.isEdit() ?
            <RaisedButton
              label="Reset"
              type="button"
              onTouchTap={() => this.stopEdit(change)}
              style={{ margin: 12 }}
            /> :
            null}
        </form>
      </Paper>
    );
  }
}

const CreatePersonForm = reduxForm({
  form: 'createPerson',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(CreatePerson);

const CreatePersonContainer = connect(
  state => ({ initialValues: state.getIn(['landing', 'editFocus']) }),
)(CreatePersonForm);

export default CreatePersonContainer;
