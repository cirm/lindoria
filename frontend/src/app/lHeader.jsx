import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import connect from 'react-redux/lib/components/connect';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import { logoutUser } from '../authentication/lAuthActionCreators';
import { setCreateType } from '../create/lCreateActionCreators';
import Link from 'react-router/lib/Link';
import browserHistory from 'react-router/lib/browserHistory';


const profile = <Link to="/profile" />;
const home = <Link to="/" />;

export class Header extends PureComponent {

  getProfile() {
    return this.props.profile || [];
  }

  triggerLogout() {
    this.props.dispatch(logoutUser());
  }

  createPerson() {
    this.props.dispatch(setCreateType('person'));
    browserHistory.push('/create');
  }

  render() {
    return (
      <div>
        <AppBar
          style={{ margin: 5 }}
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
              <FlatButton label={this.props.profile.get('display')} style={{ margin: 5 }} />}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Create Organization" onTouchTap={() => this.createPerson()} />
            <MenuItem primaryText="Create Person" onTouchTap={() => this.createPerson()} />
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
  profile: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    drawerState: state.landing.get('drawerState'),
  };
}

export const HeaderContainer = connect(mapStateToProps)(Header);
