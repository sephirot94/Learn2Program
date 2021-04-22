import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Button, message, Form } from 'antd';
import Container from '../Container';
import RegisterApi from '../../apis/RegisterApi';

const RegisterForm = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {

    if (values.password != values.confirm_password) {
      message.error("Passwords do not match, please confirm password")
    }
    else {
      setLoading(true);
      RegisterApi.Register(values)
      .then(() => {
          message.success("User has been created")
      })
      .catch((err) => {
        if (err.response.status == 409){
          message.error("username or email already taken")
        }
        else {
          message.error(err.response.data.message);
        }
      })
      .then( () => {
        setLoading(false);
      });
    }

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
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
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
            <Form.Item
              name="confirm_password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Confirm password"
              />
            </Form.Item>
            <div style={{width: "100%", textAlign:"center"}}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </Container>
  );
};

export default RegisterForm;