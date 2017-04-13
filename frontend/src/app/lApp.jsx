// @flow
import React from 'react';
import { HeaderContainer } from './lHeader';

const App = (props: { children: React.Element<any> }) => (
  <div>
    <HeaderContainer key={'header'} {...props} />
    {props.children}
  </div>
);

export default App;
