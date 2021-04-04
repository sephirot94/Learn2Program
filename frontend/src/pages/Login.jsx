import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message, Form, Space, Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/Auth';
import LoginContainer from '../components/LoginContainer';
import Container from '../components/Container';
import LoginApi from '../apis/LoginApi'
import '../assets/login.css'

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const handleSubmit = (values) => {
    setLoading(true);

    LoginApi.Login(values)
      .then((session) => {
        const user = {
          ...session.data,
          username: values.username.toLowerCase()
        };
        Auth.logUserIn(user);
      })
      .catch((loginError) => {
        if (loginError.response) {
          message.error('invalid username or password');
        } else if (loginError.request) {
          message.error(loginError.message);
        }
        setLoading(false);
      });
  };

  const handleRedirect = () => {
    return <Redirect to="/register" />
  }

  const layout = {
    wrapperCol: { span: 24 }
  };

  return (
    <LoginContainer>
      <Space style={{ width: '100%', marginBottom: 32 }} direction="vertical" align="center">
        <div
          style={{
            width: '100%',
            filter: 'opacity(0.3) grayscale(1)'
          }}
        >
          <h1 style={{
            textAlign: "center"
          }}>Learn2Program</h1>
        </div>
      </Space>
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

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Sign in
            </Button>
          </Form>
        </div>
      </Container>
    </LoginContainer>
  );
};

export default Login;