import React, { PropTypes } from 'react';
import { HeaderContainer } from './lHeader';

const App = (props) => (
  <div>
    <HeaderContainer key={'header'} {...props} />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.object,
};

export default App;
