import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouterManager from './routes/RouterManager';
import { Hero } from 'react-bulma-components';
import { CookiesProvider } from 'react-cookie';
import { ChakraProvider } from '@chakra-ui/react';
const App = () => {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <UserProvider>
          <Router>
            <Switch>
              <RouterManager />
            </Switch>
          </Router>
        </UserProvider>
      </CookiesProvider>
    </ChakraProvider>
  );
};

export default App;
