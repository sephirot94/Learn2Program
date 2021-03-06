import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message, Form, Space, Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom'
import Auth from '../../utils/Auth';
import Container from '../Container';
import LoginApi from '../../apis/LoginApi'


const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const handleSubmit = (values) => {
    setLoading(true);

    LoginApi.Login(values)
      .then((session) => {
        const user = {
          id: parseInt(session.data.id, 10),
          username: session.data.username,
          email :   session.data.email
        };
        Auth.logUserIn(user);
        history.replace(from)
      })
      .catch((err) => {
        if (err.response.status == 401) {
          message.error('Wrong credentials: make sure your password is correct');
        } else {
          message.error(err.response.data.message);
        }
      }).then(()=>{
        setLoading(false);
      });
  };

  const layout = {
    wrapperCol: { span: 24 }
  };

  return (
      <Container>
        <div> 
          <Form {...layout} onFinish={handleSubmit} layout="vertical" requiredMark={false}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
              />
            </Form.Item>
            <Space>
              <Link to='/recover_password'>
                Forgot your password?
              </Link>
            </Space>
            <div style={{width: "100%", textAlign:"center"}}>
                <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                >
                Sign in
                </Button>
            </div>
          </Form>
        </div>
      </Container>
  );
};

export default LoginForm;