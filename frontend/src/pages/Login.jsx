import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message, Form, Space } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Auth from '../utils/Auth';
import LoginContainer from '../components/LoginContainer';
import Container from '../components/Container';
import LoginApi from '../apis/LoginApi'

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const handleSubmit = (values) => {
    setLoading(true);

    FuryApi.createSession(values)
      .then((session) => {
        const user = {
          ...session.data,
          username: values.username.toLowerCase()
        };
        furySession(values.username.toLowerCase(), session.data);
        Auth.logUserIn(user);
        history.replace(from);
      })
      .catch((loginError) => {
        if (loginError.response) {
          message.error('Invalid username or password');
        } else if (loginError.request) {
          message.error(loginError.message);
        }
        setLoading(false);
      });
  };

  const layout = {
    wrapperCol: { span: 24 }
  };

  return (
    <LoginContainer>
      <Space style={{ width: '100%', marginBottom: 32 }} direction="vertical" align="center">
        <div
          style={{
            width: '250px',
            filter: 'opacity(0.3) grayscale(1)'
          }}
        >
          <img alt="" className="logo invert" src={cclogo} />
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

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form>
        </div>
      </Container>
    </LoginContainer>
  );
};

export default Login;