import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import forEach from 'lodash/forEach';

export default class PureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  chainBind(methods) {
    forEach(methods, method => this[method] = this[method].bind(this));
  }
}