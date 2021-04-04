import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Auth from './utils/Auth';

import Home from './pages/Home';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword.jsx'

import 'antd/dist/antd.css';
import './App.less';

const App = () => {
  return (
    <BrowserRouter>
      <Switch className="switch-wrapper">
        <Redirect exact from="/" to="/home" />

        <Route exact path="/login">
          <Login />
        </Route>  

         <Route exact path="/recover_password">
          <RecoverPassword />
        </Route>        

        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        
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