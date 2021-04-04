import {Learn2Program as api} from '../apis/clients'
import Auth from '../utils/Auth'

const Register = (values) => {
    const body = {
        "username" : values.username,
        "password" : Auth.hashPassword(values.password),
        "email" : values.email
    }
    return api.post('/register', body);
};

const RecoverPassword = (values) => {
    const body = {
        "username" : values.username,
        "password" : Auth.hashPassword(values.password),
        "email" : values.email
    }
    return api.post('/recover_password', body);
};

const RegisterApi = { Register, RecoverPassword };

export default RegisterApi;