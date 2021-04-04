import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Button, message, Form, Space } from 'antd';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import Container from '../components/Container';
import Auth from '../utils/Auth'
import RegisterApi from '../apis/RegisterApi';

const Register = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const handleSubmit = (values) => {
    console.log(values)
    if (values.password != values.confirm_password) {
      message.error("Passwords do not match, please confirm password");
    }
    else {
      setLoading(true);
      RegisterApi.RecoverPassword(values)
      .then(() => {
          return <Redirect to="/login"/>
      })
      .catch((error) => {
        if (error.status == 404) {
            message.error("User and email do not match");
        }
        message.error(error.message);
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
      <Space style={{ width: '100%', marginBottom: 32 }} direction="vertical" align="center">
        <div
          style={{
            width: '250px',
            filter: 'opacity(0.3) grayscale(1)'
          }}
        >
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

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </Container>
  );
};

export default Register;