import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouterManager from './routes/RouterManager';
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <RouterManager />
        </Switch>
      </Router>
    </UserProvider>
  );
};

export default App;
