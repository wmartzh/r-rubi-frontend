import React, { useState } from 'react';
import { Form, Card, Button, Columns, Block, Notification } from 'react-bulma-components';
import { fetchRegister } from '../api/authService';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!username) {
      setError('Please provide your username');
    } else if (!email) {
      setError('Please provide your email');
    } else if (!password) {
      setError('Please provide your password');
    } else if (!passwordConfirm) {
      setError('Please confirm your password');
    } else {
      try {
        let response = await fetchRegister({
          username,
          email,
          password,
          passwordConfirm,
        });
        console.log('🚀 -> handleRegister -> response', response);
      } catch (error) {
        console.log('🚀 -> handleRegister -> error', error);
        if (error.response.data.details && error.response.data.details[0].context.key === 'email') {
          setError('Email must be an valid email');
        } else if (error.response.data.detail) {
          setError(error.response.data.detail);
        } else if (error && error.response.data.error) {
          setError(error.response.data.error);
        }
      }
    }
  };
  return (
    <>
      <Columns centered={true}>
        <Columns.Column size="one-quarter">
          <Card>
            <Card.Content>
              <form>
                <h2 className="title is-4 has-text-centered">Register</h2>
                <Block>
                  {error && (
                    <Notification color="danger">
                      {error} <Button remove />
                    </Notification>
                  )}
                </Block>
                <Form.Field>
                  <Form.Label>Username</Form.Label>
                  <Form.Control>
                    <Form.Input
                      color={username && username !== '' ? 'success' : 'danger'}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></Form.Input>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Form.Input
                      color={email && email !== '' ? 'success' : 'danger'}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Input>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Password</Form.Label>
                  <Form.Control>
                    <Form.Input
                      color={password && password !== '' ? 'success' : 'danger'}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Input>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control>
                    <Form.Input
                      color={
                        passwordConfirm && passwordConfirm !== '' && password === passwordConfirm
                          ? 'success'
                          : 'danger'
                      }
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    ></Form.Input>
                  </Form.Control>
                  {password !== passwordConfirm && (
                    <Form.Help color="danger">Password doesn't match</Form.Help>
                  )}
                </Form.Field>
                <Button.Group align="right">
                  <Button color="success" onClick={handleRegister}>
                    Register
                  </Button>
                </Button.Group>
              </form>
            </Card.Content>
          </Card>
        </Columns.Column>
      </Columns>
    </>
  );
};

export default Register;
