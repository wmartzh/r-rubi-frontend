import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouterManager from './routes/RouterManager';
import { Hero } from 'react-bulma-components';
const App = () => {
  return (
    <Hero>
      <Hero.Body size="fullheight">
        <UserProvider>
          <Router>
            <Switch>
              <RouterManager />
            </Switch>
          </Router>
        </UserProvider>
      </Hero.Body>
    </Hero>
  );
};

export default App;
