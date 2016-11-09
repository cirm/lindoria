import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { setFocus } from './lLandingActionCreators';
import { AddNewItem } from './lLandingAddNew';
import forEach from 'lodash/forEach';

export class LindoriaList extends PureComponent {
  setFocus(target) {
    if (this.props.focus !== target.province) {
      this.props.dispatch(setFocus(target));
    }
  }

  getDomainsProvinces(dname) {
    const provinces = [];
    this.props.provinces.map(province => {
      if (province.get('domain') === dname) {
        provinces.push(province);
      }
    });
    return provinces;
  }

  getCreateMenuState(param) {
    if (!this.props.createMenu) {
      return false;
    }
    return this.props.createMenu.get(param);
  }

  render() {
    return (
      <Paper zDepth={2} className="container list" >
        <List>
          {!!this.props.domains ?
            this.props.domains.map(domain =>
              < ListItem
                primaryText={domain.get('display')}
                primaryTogglesNestedList
                key={domain.get('dname')}
                nestedItems={this.getDomainsProvinces(domain.get('dname')).map(province =>
                  <ListItem
                    primaryText={province.get('display')}
                    key={province.get('pname')}
                    onClick={() => this.setFocus({ domain, province })}
                  />
                )}
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
  domains: PropTypes.object,
  nestedItems: PropTypes.object,
  createMenu: PropTypes.object,
  provinces: PropTypes.object,
  focus: PropTypes.object,
  dispatch: PropTypes.func,
};
