import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import map from 'lodash/fp/map';
import { setCreateType } from './lCreateActionCreators';

const types = ['domains', 'persons', 'organizations', 'provinces'];

const loadCreate = (type, dispatch) => dispatch(setCreateType(type));

const getCreateType = props => (<div className="container" >{map(type => (
  <FlatButton
    label={type}
    key={type}
    onTouchTap={() => loadCreate(type, props.dispatch)}
  />
))(types)}</div>);

export default getCreateType;
