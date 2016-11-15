import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, ListItem } from 'material-ui/List';
import PureComponent from '../lib/PureComponent';
import { setFocus } from './lLandingActionCreators';
import { AddNewItem } from './lLandingAddNew';

class LindoriaList extends PureComponent {
  getFocusProvinceName() {
    return this.props.focus ? this.props.focus.getIn(['province', 'pname']) : false;
  }

  setFocus(target) {
    if (this.getFocusProvinceName() !== target.province.get('pname')) {
      this.props.dispatch(setFocus(target));
    }
  }

  getCreateMenuState(param) {
    if (!this.props.createMenu) {
      return false;
    }
    return this.props.createMenu.get(param);
  }

  render() {
    return (
      <Paper zDepth={2} >
        <List>
          {this.props.domains ?
            this.props.domains.map(domain =>
              < ListItem
                primaryText={domain.get('display')}
                primaryTogglesNestedList
                key={domain.get('dname')}
                nestedItems={this.props.provinces
                  .filter(province => province.get('domain') === domain.get('dname'))
                  .map(province =>
                    <ListItem
                      primaryText={province.get('display')}
                      key={province.get('pname')}
                      onClick={() => this.setFocus({ domain, province })}
                    />,
                  ).toJS()}
              />) : null}
          <AddNewItem
            dispatch={this.props.dispatch}
            state={this.getCreateMenuState('state')}
            target={this.getCreateMenuState('target')}
          />
        </List>
      </Paper>
    );
  }
}

LindoriaList.propTypes = {
  domains: ImmutablePropTypes.list,
  createMenu: ImmutablePropTypes.map,
  provinces: ImmutablePropTypes.list,
  focus: ImmutablePropTypes.map,
  dispatch: PropTypes.func,
};

export default LindoriaList;