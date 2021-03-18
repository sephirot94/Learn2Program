import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Auth from './utils/Auth';

import Home from './pages/Home';
import Login from './pages/Login';

import './App.less';

const App = ({ selectedAccount, fullAccount, availableAccounts, loadingAccounts, error }) => {
  return (
    <BrowserRouter>
      <Switch className="switch-wrapper">
        <Redirect exact from="/" to="home" />

        <Route exact path="/login">
          <Login />
        </Route>        

        <PrivateRoute>
          <Home />
        </PrivateRoute>

        {/* <PrivateRoute path="/404">
          <NoMatch />
        </PrivateRoute>

        <PrivateRoute>
          <Redirect to={{ pathname: '/404' }} />
        </PrivateRoute> */}
      </Switch>
    </BrowserRouter>
  );
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.getLoggedUser() !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;