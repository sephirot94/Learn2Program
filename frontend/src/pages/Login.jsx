import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message, Form, Space, Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/Auth';
import LoginContainer from '../components/LoginContainer';
import Container from '../components/Container';
import LoginApi from '../apis/LoginApi'
import RegisterForm from '../components/Register'
import LoginForm from '../components/Login'
import '../assets/login.css'

const {TabPane} = Tabs;

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

  const layout = {
    wrapperCol: { span: 24 }
  };

  return (
    <LoginContainer>
      <Space style={{ width: '100%', marginBottom: 32 }} direction="vertical" align="center">
        <div>
          <h1 className={"title"} style={{
            textAlign: "center"
          }}>Learn2Program</h1>
        </div>
      </Space>
      <Tabs defaultActiveKey="1" tabPosition="top" centered>
        <TabPane tab="Sign In" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab="Sign Up" key="2">
          <RegisterForm />
        </TabPane>
      </Tabs>
    </LoginContainer>
  );
};

export default Login;