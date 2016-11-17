import React from 'react';
import connect from 'react-redux/lib/components/connect';
import GetCreateType from './lGetCreateType';
import DataList from './dataList';
import PureComponent from '../lib/PureComponent';
import CreatePersonForm from './lCreatePerson';
import CreateOrganizationForm from './lCreateOrganization';
import CreateDomainForm from './lCreateDomain';
import CreateProvinceForm from './lCreateProvince';

class CreateDashboard extends PureComponent {
  getCreateType() {
    switch (this.props.createType) {
      case 'domain':
        return (<div>
          <DataList fields={this.props.domains} type={this.props.createType} />
          <CreateDomainForm dispatch={this.props.dispatch} persons={this.props.persons} />
        </div>);
      case 'organization':
        return (<div>
          <DataList fields={this.props.organizations} type={this.props.createType} />
          <CreateOrganizationForm dispatch={this.props.dispatch} persons={this.props.persons} />
        </div>);
      case 'person':
        return (
          <div>
            <DataList fields={this.props.persons} type={this.props.createType} dispatch={this.props.dispatch} />
            <CreatePersonForm dispatch={this.props.dispatch} editFocus={this.props.editFocus} />
          </div>);
      case 'province':
        return (
          <div>
            <DataList fields={this.props.provinces} type={this.props.createType} />
            <CreateProvinceForm
              dispatch={this.props.dispatch}
              persons={this.props.persons}
              domains={this.props.domains}
            />
          </div>);
      default:
        return null;
    }
  }

  render() {
    return (<div>{!!this.props.createType ?
      <div>{this.getCreateType()}</div> :
      <GetCreateType dispatch={this.props.dispatch} />}</div>);
  }
}

function mapStateToProps(state) {
  return {
    createType: state.getIn(['create', 'type']),
    persons: state.getIn(['landing', 'persons']),
    organizations: state.getIn(['landing', 'organizations']),
    domains: state.getIn(['landing', 'domains']),
    provinces: state.getIn(['landing', 'provinces']),
    editFocus: state.getIn(['landing', 'editFocus']),
  };
}

const CreateDashboardContainer = connect(
  mapStateToProps,
)(CreateDashboard);

export default CreateDashboardContainer;
