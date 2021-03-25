import {Learn2Program as api} from '../apis/clients'
import Auth from '../utils/Auth'

const Login = (user, pass) => {
    body = {
        "username" : user,
        "password" : Auth.hashPassword(pass)
    }
    return api.post('/login', body);
};

const LoginApi = { Login };

export default LoginApi;