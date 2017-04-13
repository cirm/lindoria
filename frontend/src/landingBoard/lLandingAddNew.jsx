import React, { PropTypes } from 'react';
import ListItem from 'material-ui/List/ListItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import browserHistory from 'react-router/lib/browserHistory';
import { toggleCreateMenu } from './lLandingActionCreators';
import { setCreateType } from '../create/lCreateActionCreators';

class AddNewItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
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
            <MenuItem primaryText="Domain" key="domain" onClick={() => this.handleCreate('domains')} />
            <MenuItem primaryText="Province" key="province" onClick={() => this.handleCreate('provinces')} />
            <MenuItem primaryText="Holding" key="holding" onClick={() => this.handleCreate('holdings')} />
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

export default AddNewItem;