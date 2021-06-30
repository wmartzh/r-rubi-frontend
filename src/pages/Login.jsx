/* eslint-disable array-callback-return */
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserValues } from '../components/UserContext';
import {
  Form,
  Columns,
  Card,
  Button,
  Icon,
  Block,
  Notification,
  Hero,
} from 'react-bulma-components';
import { fetchLogin } from '../api/authService';
import { useCookies } from 'react-cookie';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setAuth } = useUserValues();
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['actk', 'rftk']);

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

        setCookie('actk', response.data.access_token);
        setCookie('rftk', response.data.refresh_token);

        setUser({ username: response.data.username });

        setAuth(true);

        history.push('/');
      } catch (error) {
        console.log('🚀 -> handleSubmit -> error', error);
        if (error.response) {
          if (
            error.response.data.details &&
            error.response.data.details[0].context.key === 'email'
          ) {
            setError('Email must be an valid email');
          } else if (error && error.response.data.error) {
            setError(error.response.data.error);
          }
        }
      }
    }
  };
  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <Hero>
        <Hero.Body size="fullheight">
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
                      {email === '' && (
                        <Form.Help color="danger">Please provide an email</Form.Help>
                      )}
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
                      <Button
                        color="link"
                        size="small"
                        colorVariant="light"
                        onClick={handleRegister}
                      >
                        Register
                      </Button>
                    </Button.Group>
                  </Card.Content>
                </Card>
              </Columns.Column>
            </Columns>
          </form>
        </Hero.Body>
      </Hero>
    </>
  );
};

export default Login;
