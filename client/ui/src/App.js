import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

//This isn't supposed to be needed with RRv4.0.0-alpha.6
// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory();

import ContactsDashboard from './containers/ContactsDashboard';

const App = () => (
    <Router>
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
    </Router>
);

export default App;
