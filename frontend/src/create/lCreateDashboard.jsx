import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetCreateType from './lGetCreateType';
import DataList from '../dataTable/lDataTable';
import PureComponent from '../lib/PureComponent';
import PersonForm from './lPersonData';
import CreateOrganizationForm from './lCreateOrganization';
import CreateDomainForm from './lCreateDomain';
import ProvinceForm from './lProvinceData';
import HoldingForm from './lHoldingData';

class CreateDashboard extends PureComponent {
  getColumnHeaders() {
    if (!this.props.createType) return [];
    if (!this.props[this.props.createType]) return [];
    if (this.props[this.props.createType].size < 1) return [];
    return this.props[this.props.createType].first().keySeq().toArray();
  }

  getCreateType() {
    switch (this.props.createType) {
      case 'domains':
        return (
          <CreateDomainForm
            dispatch={this.props.dispatch}
            persons={this.props.persons}
            editFocus={this.props.editFocus}
          />);
      case 'organizations':
        return (
          <CreateOrganizationForm
            dispatch={this.props.dispatch}
            persons={this.props.persons}
            editFocus={this.props.editFocus}
          />);
      case 'persons':
        return (
          <PersonForm
            dispatch={this.props.dispatch}
            editFocus={this.props.editFocus}
          />);
      case 'provinces':
        return (
          <ProvinceForm
            editFocus={this.props.editFocus}
            dispatch={this.props.dispatch}
            persons={this.props.persons}
            domains={this.props.domains}
          />);
      case 'holdings':
        return (
          <HoldingForm
            editFocus={this.props.editFocus}
            dispatch={this.props.dispatch}
            organizations={this.props.organizations}
            provinces={this.props.provinces}
          />);
      default:
        return null;
    }
  }

  render() {
    return (<div>{this.props.createType ?
      <div>
        <DataList
          fields={this.props[this.props.createType]}
          type={this.props.createType}
          tableData={this.props.tableData}
          dispatch={this.props.dispatch}
          columnHeaders={this.getColumnHeaders()}
        />
        {this.getCreateType()}
      </div> :
      <GetCreateType dispatch={this.props.dispatch} />}</div>);
  }
}

function mapStateToProps(state) {
  return {
    createType: state.getIn(['create', 'type']),
    persons: state.getIn(['data', 'persons']),
    tableData: state.getIn(['data', 'table']),
    organizations: state.getIn(['data', 'organizations']),
    domains: state.getIn(['data', 'domains']),
    holdings: state.getIn(['data', 'holdings']),
    provinces: state.getIn(['data', 'provinces']),
    editFocus: state.getIn(['landing', 'editFocus']),
  };
}

CreateDashboard.propTypes = {
  createType: PropTypes.string,
  tableData: ImmutablePropTypes.list,
  dispatch: PropTypes.func,
  persons: ImmutablePropTypes.list,
  domains: ImmutablePropTypes.list,
  provinces: ImmutablePropTypes.list,
  editFocus: PropTypes.string,
};

const CreateDashboardContainer = connect(
  mapStateToProps,
)(CreateDashboard);

export default CreateDashboardContainer;
