import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Space, Tabs } from 'antd';
import LoginContainer from '../components/LoginContainer';
import RegisterForm from '../components/Register'
import LoginForm from '../components/Login'
import '../assets/login.css'

const {TabPane} = Tabs;

const Login = (props) => {

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