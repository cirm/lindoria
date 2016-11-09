import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import connect from 'react-redux/lib/components/connect';
import { LindoriaList } from './lLandingList';
import { LindoriaFocus } from './lLandingFocus';
import { getContent } from './lLandingActionCreators';
import { LindoriaDomainFocus } from './lLandingDomain';

class LandingDashboard extends PureComponent {
  componentWillMount() {
    return this.props.dispatch(getContent());
  }

  getModalState() {
    if (!this.props.createModal) {
      return false;
    }
    return this.props.createModal.get('state');
  }

  render() {
    return (
      <div>
        <LindoriaList
          focus={this.props.focus}
          domains={this.props.domains}
          persons={this.props.persons}
          provinces={this.props.provinces}
          dispatch={this.props.dispatch}
          createMenu={this.props.createMenu}
        />
        {!!this.props.focus ?
          <div>
            <LindoriaDomainFocus focus={this.props.focus} />
            <LindoriaFocus focus={this.props.focus} />
          </div> : null}
      </div>
    );
  }
}

LandingDashboard.propTypes = {
  focus: PropTypes.object,
  domains: PropTypes.object,
  provinces: PropTypes.object,
  createMenu: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    focus: state.landing.get('focus'),
    domains: state.landing.get('domains'),
    persons: state.landing.get('persons'),
    provinces: state.landing.get('provinces'),
    createMenu: state.landing.get('createMenu'),
  };
}

export const LandingDashboardContainer = connect(
  mapStateToProps,
)(LandingDashboard);
