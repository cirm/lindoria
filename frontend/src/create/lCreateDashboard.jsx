import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import connect from 'react-redux/lib/components/connect';
import CreatePersonForm from './lCreatePerson';
import CreateDomainForm from './lCreateDomain';
import GetCreateType from './lGetCreateType';
import DataList from './dataList';
import styles from './create.styl';

class CreateDashboard extends PureComponent {
  getCreateType() {
    if (this.props.createType === 'domain') {
      return (
        <div>
          <DataList fields={this.props.domains} />
          <CreateDomainForm dispatch={this.props.dispatch} />
        </div>);
    } else if (this.props.createType === 'person') {
      return (
        <div>
          <DataList fields={this.props.persons} />
          <CreatePersonForm dispatch={this.props.dispatch} />
        </div>);
    } else if (this.props.createType === 'province') {
      return (
        <div>
          <DataList fields={this.props.provinces} />
          <CreatePersonForm dispatch={this.props.dispatch} />
        </div>);
    }
    return null;
  }

  render() {
    return (<div>{!!this.props.createType ? <div>{this.getCreateType()}</div> :
      <GetCreateType dispatch={this.props.dispatch} />}</div>);
  }
}

function mapStateToProps(state) {
  return {
    createType: state.create.get('type'),
    persons: state.landing.get('persons'),
    domains: state.landing.get('domains'),
    provinces: state.landing.get('provinces'),
  };
}

export const CreateDashboardContainer = connect(
  mapStateToProps,
)(CreateDashboard);
