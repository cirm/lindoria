import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import { connect } from 'react-redux';
import map from 'lodash/fp/map';
import { Field, reduxForm } from 'redux-form/immutable';
import { createHolding, editHolding, stopEdit } from './lCreateActionCreators';
import styles from './lActionContainer.styl';

const holdingLevels = ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const holdingTypes = ['law', 'guild', 'temple', 'source'];

class CreateHolding extends React.PureComponent {
  constructor(props) {
    super(props);
    this.saveHolding = this.saveHolding.bind(this);
  }

  getFromProps(type) {
    return this.props[type] || [];
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
    return this.props.editFocus.get('type') === 'holdings';
  }

  saveHolding(values) {
    this.isEdit() ?
      this.props.dispatch(editHolding(values)) :
      this.props.dispatch(createHolding(values));
  }

  render() {
    const { handleSubmit, change } = this.props;
    return (
      <Paper className={styles.root} zdepth={1} >
        <Toolbar >
          <ToolbarGroup >
            <ToolbarTitle text={this.isEdit() ? 'Edit Holding details' : 'Enter Holding details'} />
          </ToolbarGroup>
        </Toolbar>
        <form className="holdingForm" onSubmit={handleSubmit(this.saveHolding)} >
          <div>
            <Field name="level" component={SelectField} floatingLabelText="Holding level" >
              {map(level => <MenuItem
                value={level}
                primaryText={level}
              />)(holdingLevels)}
            </Field>
          </div>
          <div>
            <Field name="owner" component={SelectField} floatingLabelText="Corporation of" >
              {this.getFromProps('organizations').map(org =>
                <MenuItem
                  value={org.get('oname')}
                  key={org.get('oname')}
                  primaryText={org.get('display')}
                />)}
            </Field>
          </div>
          <div>
            <Field name="province" component={SelectField} floatingLabelText="Situated in" >
              {this.getFromProps('provinces').map(province =>
                <MenuItem
                  value={province.get('pname')}
                  key={province.get('pname')}
                  primaryText={province.get('display')}
                />)}
            </Field>
          </div>
          <div>
            <Field name="type" component={SelectField} floatingLabelText="Holding type" >
              {map(level => <MenuItem
                value={level}
                primaryText={level}
              />)(holdingTypes)}
            </Field>
          </div>
          <RaisedButton label={this.getLabel()} type="submit" primary className={styles.buttonMargin} />
          {this.isEdit() ?
            <RaisedButton
              label="Reset"
              type="button"
              onTouchTap={() => this.stopEdit(change)}
              className={styles.buttonMargin}
            /> :
            null}
        </form>
      </Paper>
    );
  }
}

CreateHolding.propTypes = {
  dispatch: PropTypes.func,
  change: PropTypes.func,
  handleSubmit: PropTypes.func,
  editFocus: ImmutablePropTypes.Map,
};

const CreateHoldingForm = reduxForm({
  form: 'createHolding',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(CreateHolding);

const CreateHoldingContainer = connect(
  state => ({ initialValues: state.getIn(['landing', 'editFocus']) }),
)(CreateHoldingForm);

export default CreateHoldingContainer;
