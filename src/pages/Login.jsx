/* eslint-disable array-callback-return */
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserValues } from '../components/UserContext';
import {
  VStack,
  HStack,
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
  Icon,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { fetchLogin } from '../api/authService';
import { useCookies } from 'react-cookie';
import { FiLogIn } from 'react-icons/fi';
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
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
        } else {
          setError('Connection Error');
        }
      }
    }
  };
  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <Container>
        <Box boxShadow="xs" p="10%" marginTop="25%" textAlign="center">
          <Text fontSize="xl"> Login </Text>

          <form>
            <VStack>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
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
              <HStack>
                <Button
                  backgroundColor="green.300"
                  color="white"
                  variant="solid"
                  size="md"
                  _hover={{
                    backgroundColor: 'green',
                  }}
                  rightIcon={<Icon as={FiLogIn} cursor="pointer" />}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                <Button onClick={handleRegister} colorSchema="teal" size="md">
                  Register
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
