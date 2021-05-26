/* eslint-disable array-callback-return */
import React from 'react';
import { useState } from 'react';
import { Layout, Form, Input, Card, Button, Notification, Alert } from 'element-react';
import { fetchLogin } from '@api/authService';
const centered = {
  position: 'fixed',
  top: '25%',
  left: '35%',
  width: '25%',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const rules = {
    email: [
      {
        required: true,
        message: 'Email is required',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: 'Password is required',
        trigger: 'change',
      },
    ],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (email === '' || !email) {
      Notification({
        title: 'Warning',
        message: 'Please provide an email',
        type: 'warning',
      });
    } else if (password === '' || !password) {
      Notification({
        title: 'Warning',
        message: 'Please provide your password',
        type: 'warning',
      });
    } else {
      try {
        const response = await fetchLogin({ email, password });
        console.log('🚀 -> handleSubmit -> response', response);
      } catch (error) {
        if (error.response.data.details && error.response.data.details[0].context.key === 'email') {
          setError('Email must be an valid email');
        } else if (error && error.response.data.error) {
          setError(error.response.data.error);
        }
        console.log('🚀 -> handleSubmit -> error', error.response);
      }
    }
  };

  return (
    <>
      <Layout.Row gutter="20" justify="center" align="middle" type="flex" className="row-bg">
        <Layout.Col sm="6">
          <Card style={centered} className="box-card">
            <h2>Login</h2>
          
            {error && <Alert type="error" title={error} />}
            <Form model={{ email, password }} rules={rules} onSubmit={handleSubmit}>
              <Form.Item label="Email" prop="email">
                <Input value={email} onChange={setEmail} type="text" />
              </Form.Item>
              <Form.Item label="Password" prop="password">
                <Input value={password} onChange={setPassword} type="password" />
              </Form.Item>
              <Button type="success" nativeType="submit">
                Login
              </Button>
            </Form>
          </Card>
        </Layout.Col>
      </Layout.Row>
    </>
  );
};

export default Login;
