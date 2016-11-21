import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import forEach from 'lodash/fp/forEach';

export default class PureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  chainBind(methods) {
    forEach(method => this[method] = this[method].bind(this))(methods);
  }
}