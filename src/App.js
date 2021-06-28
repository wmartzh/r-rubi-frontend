import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouterManager from './routes/RouterManager';
import { Hero } from 'react-bulma-components';
import { CookiesProvider } from 'react-cookie';

const App = () => {
  return (
    <CookiesProvider>
      <UserProvider>
        <Router>
          <Switch>
            <RouterManager />d
          </Switch>
        </Router>
      </UserProvider>
    </CookiesProvider>
  );
};

export default App;
