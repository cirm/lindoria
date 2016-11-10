import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import PureComponent from '../lib/PureComponent';
import { LandingDashboardContainer } from '../landingBoard/lLandingDashBoard';
import MaterialUiForm from '../authentication/lAuthLoginForm';

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
