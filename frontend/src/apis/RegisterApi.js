import {Learn2Program as api} from '../apis/clients'
import Auth from '../utils/Auth'

const Register = (values) => {
    body = {
        "username" : values.username,
        "password" : Auth.hashPassword(values.password),
        "email" : values.email
    }
    return api.post('/register', body);
};

const RegisterApi = { Register };

export default RegisterApi;