import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import connect from 'react-redux/lib/components/connect';
import ProfileFormContainer from './lProfileForm';


export class ProfileDashboard extends PureComponent {
  render() {
    return (
      <div>
        <ProfileFormContainer {...this.props} />
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
