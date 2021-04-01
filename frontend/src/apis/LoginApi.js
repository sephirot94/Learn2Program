import {Learn2Program as api} from '../apis/clients'
import Auth from '../utils/Auth'

const Login = (username, password) => {
    const body = {
        "username" : username,
        "password" : Auth.hashPassword(password)
    }
    return api.post('/login', body);
};

const LoginApi = { Login };

export default LoginApi;