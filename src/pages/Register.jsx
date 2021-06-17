import React, { useState } from 'react';
import { Form, Card, Button, Columns } from 'react-bulma-components';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Columns centered={true}>
        <Columns.Column size="one-quarter">
          <Card>
            <Card.Content>
              <h2 className="title is-4 has-text-centered">Register</h2>
              <form>
                <Form.Field>
                  <Form.Label>Username</Form.Label>
                  <Form.Control>
                    <Form.Input
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
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Input>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Password</Form.Label>
                  <Form.Control>
                    <Form.Input></Form.Input>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control>
                    <Form.Input></Form.Input>
                  </Form.Control>
                </Form.Field>
                <Button.Group align="right">
                  <Button color="success">Register</Button>
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
