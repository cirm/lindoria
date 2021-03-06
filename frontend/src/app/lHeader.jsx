import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/connect/connect';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import Link from 'react-router/lib/Link';
import ImmutablePropTypes from 'react-immutable-proptypes';
import browserHistory from 'react-router/lib/browserHistory';
import styles from './lHeader.styl';
import { getContent } from '../landingBoard/lLandingActionCreators';
import { logoutUser, queriedUpdates } from '../authentication/lAuthActionCreators';
import { setCreateType } from '../create/lCreateActionCreators';


const profile = <Link to="/profile" />;
const home = <Link to="/" />;

export class Header extends React.PureComponent {
  componentWillMount() {
    if (this.props.profile) {
      if (this.props.profile.get('updates')) {
        this.props.dispatch(queriedUpdates());
        this.props.dispatch(getContent());
      }
    }
  }

  getProfile() {
    return this.props.profile || [];
  }

  triggerLogout() {
    this.props.dispatch(logoutUser());
  }

  createType(type) {
    this.props.dispatch(setCreateType(type));
    browserHistory.push('/create');
  }

  render() {
    return (
      <div>
        <AppBar
          className={styles.root}
          title="Lindoria Brithright Handler"
          iconElementLeft={
            <IconButton containerElement={home} >
              <AccountBalance />
            </IconButton>}
          iconElementRight={
            this.getProfile().size > 0 ?
              <div>
                <IconMenu
                  iconButtonElement={
                    <FlatButton label={this.props.profile.get('display')} className={styles.root} />}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  <MenuItem
                    primaryText="Create Organization" value="organizations"
                    onTouchTap={() => this.createType('organizations')}
                  />
                  <MenuItem
                    primaryText="Create Person" value="persons"
                    onTouchTap={() => this.createType('persons')}
                  />
                  <Divider />
                  <MenuItem primaryText="Home" containerElement={home} />
                  <MenuItem primaryText="Profile" containerElement={profile} />
                  <Divider />
                  <MenuItem primaryText="Sign out" onTouchTap={() => this.triggerLogout()} />
                </IconMenu>
              </div>
              : null
          }
        />
      </div>);
  }
}

Header.propTypes = {
  profile: ImmutablePropTypes.map,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    profile: state.get('profile'),
    drawerState: state.getIn(['landing', 'drawerState']),
  };
}

export const HeaderContainer = connect(mapStateToProps)(Header);
