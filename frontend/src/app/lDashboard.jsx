// @flow

import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LandingDashboardContainer from '../landingBoard/lLandingDashBoard';
import UILoginForm from '../authentication/lAuthLoginForm';
import styles from './lDashboard.styl';

class MainDashboard extends React.PureComponent {
  props: {
    profile: ImmutablePropTypes.map,
  };

  render() {
    return (
      <div className={styles.container} >{this.props.profile.get('username') ?
        <LandingDashboardContainer className={styles.landing} {...this.props} /> :
        <UILoginForm {...this.props} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.get('profile'),
  };
}

const DashboardContainer = connect(
  mapStateToProps,
)(MainDashboard);

export default DashboardContainer;
