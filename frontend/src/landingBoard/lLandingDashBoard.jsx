import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureComponent from '../lib/PureComponent';
import LindoriaList from './lLandingList';
import LindoriaFocus from './lLandingFocus';
import { getContent } from './lLandingActionCreators';
import LindoriaDomainFocus from './lLandingDomain';
import styles from './lLandingDashBoard.styl';

class LandingDashboard extends PureComponent {
  componentWillMount() {
    return this.props.dispatch(getContent());
  }

  render() {
    return (
      <div className={styles.container} >
        <LindoriaList
          focus={this.props.focus}
          domains={this.props.domains}
          persons={this.props.persons}
          provinces={this.props.provinces}
          dispatch={this.props.dispatch}
          createMenu={this.props.createMenu}
        />
        {this.props.focus ?
          <div className={styles.focusContainer} >
            <LindoriaDomainFocus focus={this.props.focus} persons={this.props.persons} />
            <LindoriaFocus
              className={styles.focus} focus={this.props.focus}
              persons={this.props.persons} domains={this.props.domains}
            />
          </div> : null}
      </div>
    );
  }
}

LandingDashboard.propTypes = {
  focus: ImmutablePropTypes.map,
  domains: ImmutablePropTypes.list,
  persons: ImmutablePropTypes.list,
  provinces: ImmutablePropTypes.list,
  createMenu: ImmutablePropTypes.map,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    focus: state.getIn(['landing', 'focus']),
    domains: state.getIn(['landing', 'domains']),
    persons: state.getIn(['landing', 'persons']),
    provinces: state.getIn(['landing', 'provinces']),
    createMenu: state.getIn(['landing', 'createMenu']),
  };
}

const LandingDashboardContainer = connect(
  mapStateToProps,
)(LandingDashboard);

export default LandingDashboardContainer;
