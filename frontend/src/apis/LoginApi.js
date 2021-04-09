import {Learn2Program} from '../apis/clients'
import Auth from '../utils/Auth'

const Login = (values) => {
    const body = {
        "username" : values.username,
        "password" : values.password
    }
    return Learn2Program.post('/login', body);
};

const LoginApi = { Login };

export default LoginApi;