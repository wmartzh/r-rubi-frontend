import React from 'react';
import { useState } from 'react';
import { Layout, Form, Input, Card, Button, Notification } from 'element-react';
import axios from 'axios';
const centered = {
  position: 'fixed',
  top: '25%',
  left: '35%',
  width: '25%',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchLogin = async () => {
    try {
      let response = await axios.post(
        'http://127.0.0.1:8000/v1/auth/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('🚀 -> fetchLogin -> response', response.data);
    } catch (error) {
      console.log('🚀 -> fetchLogin -> error', { error });
    }
  };

  const handleSubmit = (event) => {
    console.log('🚀 -> handleSubmit -> event', event);
    event.preventDefault();
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
      fetchLogin();
    }
  };

  return (
    <>
      <Layout.Row gutter="20" justify="center" align="middle" type="flex" className="row-bg">
        <Layout.Col sm="6">
          <Card style={centered} className="box-card">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Item label="Email">
                <Input value={email} onChange={setEmail} type="text" />
              </Form.Item>
              <Form.Item label="Password">
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
