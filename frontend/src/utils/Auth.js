const LOGGED_USER_KEY = 'loggedUser';

/* ------------------------------------- Private ------------------------------------- */
function sessionExpired(timestamp) {
  return timestamp * 1000 < Date.now();
}

/* ------------------------------------- Public ------------------------------------- */
const Auth = {

  hashPassword(password) {
    
  }

  logUserIn(user) {
    // HERE GOES CALL TO API LOGIN
    this.isAuthenticated = true;
    return localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
  },

  getLoggedUser() {
    const loggedUser = localStorage.getItem(LOGGED_USER_KEY)
      ? JSON.parse(localStorage.getItem(LOGGED_USER_KEY))
      : null;
    if (loggedUser && !sessionExpired(loggedUser.expiration)) {
      return loggedUser;
    }
    Auth.logUserOut();
    return null;
  },

  logUserOut() {
    return localStorage.removeItem(LOGGED_USER_KEY);
  },

  getUserToken() {
    return localStorage.getItem(LOGGED_USER_KEY)
      ? JSON.parse(localStorage.getItem(LOGGED_USER_KEY)).token
      : '';
  },

  getUsername() {
    return localStorage.getItem(LOGGED_USER_KEY)
      ? JSON.parse(localStorage.getItem(LOGGED_USER_KEY)).username
      : '';
  }
};

export default Auth;