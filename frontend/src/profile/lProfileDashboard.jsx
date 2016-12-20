import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import ProfileForm from './lProfileForm';
import styles from './lProfileDashboard.styl';

import PureComponent from '../lib/PureComponent';

class ProfileDashboard extends PureComponent {
  render() {
    return (
      <div className={styles.main} >
        <ProfileForm {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.get('profile'),
  };
}

const ProfileDashboardContainer = connect(
  mapStateToProps,
)(ProfileDashboard);

export default ProfileDashboardContainer;
