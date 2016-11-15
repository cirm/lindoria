import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import PureComponent from '../lib/PureComponent';
import LandingDashboardContainer from '../landingBoard/lLandingDashBoard';
import UILoginForm from '../authentication/lAuthLoginForm';
import styles from './lDashboard.styl';

class MainDashboard extends PureComponent {
  render() {
    return (
      <div className={styles.container} >{!!this.props.profile.get('username') ?
        <LandingDashboardContainer className={styles.landing} {...this.props} /> : <UILoginForm {...this.props} />}
      </div>
    );
  }
}

MainDashboard.propTypes = {
  profile: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    profile: state.get('profile'),
  };
}

const DashboardContainer = connect(
  mapStateToProps,
)(MainDashboard);

export default DashboardContainer;
