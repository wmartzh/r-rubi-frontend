import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Text,
  Container,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { fetchRegister } from '../api/authService';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);

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
      <Container>
        <Box boxShadow="xs" p="10%" marginTop="25%" textAlign="center">
          <Text fontSize="xl"> Register </Text>
          <form>
            <VStack>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <FormControl isInvalid={!username || username === ''}>
                <FormLabel htmlFor="username">username</FormLabel>
                <Input
                  id="username"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FormErrorMessage>Please type a username</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!email || email === ''}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <FormErrorMessage>Please type a email</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!password && password === ''}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    placeholder="password"
                    type={showPass ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPass(!showPass)}>
                      {showPass ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>Please type a password</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !passwordConfirm || passwordConfirm === '' || password !== passwordConfirm
                }
              >
                <FormLabel htmlFor="passwordConfirm">Confirm password</FormLabel>
                <InputGroup>
                  <Input
                    id="passwordConfirm"
                    placeholder="passwordConfirm"
                    type={showPass ? 'text' : 'passwordConfirm'}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPass(!showPass)}>
                      {showPass ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {password !== passwordConfirm
                    ? 'Password does not match'
                    : 'Please Confirm password'}
                </FormErrorMessage>
              </FormControl>
              <Button onClick={handleRegister} colorSchema="teal" size="md">
                Register
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Register;
