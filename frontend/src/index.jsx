import React from 'react';
import ReactDOM from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import Provider from 'react-redux/lib/components/Provider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './app/lApp';
import DashboardContainer from './app/lDashboard';
import { ProfileDashboardContainer } from './profile/lProfileDashboard';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CreateDashboardContainer } from './create/lCreateDashboard';
import { getStore } from './store';

const store = getStore();

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const requireAuth = (nextState, replace) => {
  if (!store.getState().getIn(['profile', 'username'])) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const routes = (<Route component={App} >
  <Route path="/profile" component={ProfileDashboardContainer} onEnter={requireAuth} />
  <Route path="/" component={DashboardContainer} />
  <Route path="/create" component={CreateDashboardContainer} onEnter={requireAuth} />
</Route>);

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()} >
    <Provider store={store} >
      <Router history={browserHistory} >{routes}</Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./app/lApp', () => {
    render(
      <MuiThemeProvider muiTheme={getMuiTheme()} >
        <Provider store={store} >
          <Router history={browserHistory} >{routes}</Router>
        </Provider>
      </MuiThemeProvider>,
      document.getElementById('app'),
    );
  });
}
