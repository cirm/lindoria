import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import ListItem from 'material-ui/List/ListItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { toggleCreateMenu } from './lLandingActionCreators';
import { setCreateType } from '../create/lCreateActionCreators';
import browserHistory from 'react-router/lib/browserHistory';

export class AddNewItem extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['handleTouchTap']);
  }

  handleCreate(type) {
    this.props.dispatch(toggleCreateMenu({ state: false }));
    this.props.dispatch(setCreateType(type));
    browserHistory.push('/create');
  }

  handleTouchTap(event) {
    this.props.dispatch(toggleCreateMenu({ state: true, target: event.currentTarget }));
  }

  handleRequestClose() {
    this.props.dispatch(toggleCreateMenu({ state: false }));
  }

  render() {
    return (
      <div>
        <ListItem
          onTouchTap={this.handleTouchTap}
          primaryText="Add new...."
          label="Click me"
        />
        <Popover
          open={this.props.state}
          anchorEl={this.props.target}
          anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
          onRequestClose={() => this.handleRequestClose()}
        >
          <Menu>
            <MenuItem primaryText="Domain" key="domain" onClick={() => this.handleCreate('domain')} />
            <MenuItem primaryText="Province" key="province" onClick={() => this.handleCreate('province')} />
            <MenuItem primaryText="Holding" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

AddNewItem.propTypes = {
  state: PropTypes.bool,
  target: PropTypes.bool,
  dispatch: PropTypes.func,
};
