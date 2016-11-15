import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import ProfileForm from './lProfileForm';
import styles from './lProfileDashboard.styl';

import PureComponent from '../lib/PureComponent';

export class ProfileDashboard extends PureComponent {
  render() {
    return (
      <div className={styles.main}>
        <ProfileForm {...this.props} />
      </div>
    );
  }
}

ProfileDashboard.propTypes = {
  profile: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    profile: state.get('profile'),
  };
}

export const ProfileDashboardContainer = connect(
  mapStateToProps,
)(ProfileDashboard);
