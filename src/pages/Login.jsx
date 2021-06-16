/* eslint-disable array-callback-return */
import React from 'react';
import { useState } from 'react';
import { Layout, Form, Input, Card, Button, Notification, Alert } from 'element-react';
import { useUserValues } from '../components/UserContext';

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
  const { setUser } = useUserValues();
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
        setUser({ username: response.data.username });
        localStorage.setItem('ac_tk', response.data.access_token);
      } catch (error) {
        if (error.response.data.details && error.response.data.details[0].context.key === 'email') {
          setError('Email must be an valid email');
        } else if (error && error.response.data.error) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="column is-half is-offset-one-quarter">
          <form action="" className="box">
            <div className="field">
              <div className="label">Email</div>
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <Layout.Row gutter="20" justify="center" align="middle" type="flex" className="row-bg">
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
      </Layout.Row> */}
    </>
  );
};

export default Login;
