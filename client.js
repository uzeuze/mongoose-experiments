import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './app/components/app';
import Welcome from './app/components/welcome';
import Users from './app/components/users';
import User from './app/components/user';
import NewUser from './app/components/new_user';
import reducers from './app/reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Welcome} />
        <Route path='/users' component={Users} />
        <Route path='/new-user' component={NewUser} />
        <Route path='/users/:userId' component={User} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
