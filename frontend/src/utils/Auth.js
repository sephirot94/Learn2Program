import sha1 from 'sha1'

const LOGGED_USER_KEY = 'loggedUser';

/* ------------------------------------- Private ------------------------------------- */
function sessionExpired(timestamp) {
  return timestamp * 1000 < Date.now();
}

/* ------------------------------------- Public ------------------------------------- */
const Auth = {

  hashPassword(password) {
    return sha1(password);
  },

  logUserIn(user) {
    this.isAuthenticated = true;
    localStorage.setItem('id', user.id)
    localStorage.setItem('username', user.username)
    return localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
  },

  getLoggedUser() {
    const loggedUser = localStorage.getItem(LOGGED_USER_KEY)
      ? JSON.parse(localStorage.getItem(LOGGED_USER_KEY))
      : null;
    if (loggedUser && !sessionExpired(loggedUser.expiration)) {
      return loggedUser;
    }
    return null;
  },

  logUserOut() {
    return localStorage.removeItem(LOGGED_USER_KEY);
  },

  getUsername() {
    return localStorage.getItem(LOGGED_USER_KEY)
      ? JSON.parse(localStorage.getItem(LOGGED_USER_KEY)).username
      : '';
  }
};

export default Auth;