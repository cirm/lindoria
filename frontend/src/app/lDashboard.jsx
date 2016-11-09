import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import connect from 'react-redux/lib/components/connect';
import { LandingDashboardContainer } from '../landingBoard/lLandingDashBoard';
import MaterialUiForm from '../authentication/newFormLogin';

export class MainDashboard extends PureComponent {
  render() {
    return (
      <div>{!!this.props.profile.get('username') ?
        <LandingDashboardContainer {...this.props} /> : <MaterialUiForm {...this.props} />}
      </div>
    );
  }
}

MainDashboard.propTypes = {
  profile: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export const DashboardContainer = connect(
  mapStateToProps,
)(MainDashboard);
