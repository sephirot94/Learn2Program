import {Learn2Program} from '../apis/clients'
import Auth from '../utils/Auth'

const Login = (values) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    const body = {
        "username" : values.username,
        "password" : Auth.hashPassword(values.password)
    }
    return Learn2Program.post('/login', body, config);
};

const LoginApi = { Login };

export default LoginApi;