/* eslint-disable array-callback-return */
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserValues } from '../components/UserContext';
import { Form, Columns, Card, Button, Icon, Block, Notification } from 'react-bulma-components';
import { fetchLogin } from '@api/authService';
const centered = {
  position: 'fixed',
  top: '25%',
  left: '35%',
  width: '25%',
};

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUserValues();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (email === '' || !email) {
      setError('Please provide an email');
    } else if (password === '' || !password) {
      setError('Please provide your password');
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
  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <form>
        <Columns centered={true} vCentered={true}>
          <Columns.Column size="one-quarter">
            <Card>
              <Card.Content>
                <h2 className="title is-4 has-text-centered	">Login</h2>
                <Block>
                  {error && (
                    <Notification color="danger">
                      {error} <Button remove />
                    </Notification>
                  )}
                </Block>
                <Form.Field>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Form.Input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="text"
                      value={email}
                    ></Form.Input>

                    <Icon align="left" size="small">
                      <i className="bx bxs-envelope"></i>
                    </Icon>
                  </Form.Control>
                  {email === '' && <Form.Help color="danger">Please provide an email</Form.Help>}
                </Form.Field>
                <Form.Field>
                  <Form.Label>Password</Form.Label>
                  <Form.Control>
                    <Form.Input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      value={password}
                    ></Form.Input>
                    <Icon align="left" size="small">
                      <i className="bx bxs-lock-alt"></i>
                    </Icon>
                  </Form.Control>
                  {password === '' && (
                    <Form.Help color="danger">Please write your password</Form.Help>
                  )}
                </Form.Field>
                <Button.Group align="right">
                  <Button color="success" size="small" onClick={handleSubmit}>
                    Login <i className="bx bxs-arrow-from-left"></i>
                  </Button>
                  <Button color="link" size="small" colorVariant="light" onClick={handleRegister}>
                    Register
                  </Button>
                  {/* <br /> */}
                </Button.Group>
              </Card.Content>
            </Card>
          </Columns.Column>
        </Columns>
      </form>
    </>
  );
};

export default Login;
