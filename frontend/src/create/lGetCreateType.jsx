import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import map from 'lodash/map';
import { setCreateType } from './lCreateActionCreators';

const types = ['domain', 'person', 'organization'];

const loadCreate = (type, dispatch) => dispatch(setCreateType(type));

const getCreateType = props => (<div className="container" >{map(types, type => (
  <FlatButton
    label={type}
    key={type}
    onTouchTap={() => loadCreate(type, props.dispatch)}
  />
))}</div>);

getCreateType.propTypes = {
  dispatch: PropTypes.func,
};

export default getCreateType;
