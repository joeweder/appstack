import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Link
} from 'react-router-dom';

// import asyncComponent from './asyncComponent';

import ContactsDashboard from './containers/ContactsDashboard';
// const ContactsDashboard = asyncComponent(() => import('./containers/ContactsDashboard').then(module => module.default), {"key": 1, "value": "hello"});

const App = () => (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>

        <hr/>

        <Switch>
          <Route exact={true} path='/' render={() => (
            <h3>
              Welcome! Choose from the links available.
            </h3>
          )}/>
          <Route path='/about' render={() => (
              <div>
                <p>
                  Trying to demonstrate best-of-breed on the front-end.
                </p>
              </div>
          )}/>
          <Route path="/contacts" component={ContactsDashboard} />
          <Route render={({ location }) => (
              <div className='ui inverted red segment'>
                <h3>
                  Ooops! I don't have a route for <code>{location.pathname}</code>
                </h3>
              </div>
          )} />
        </Switch>
      </div>
    </BrowserRouter>
);

export default App;
