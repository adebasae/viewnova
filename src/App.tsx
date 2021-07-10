import { hot } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/scss/globals.scss';
import Auth from './pages/Auth/Auth';
import Layout from './components/Layout';
import { useAuthStore } from './store/AuthContext';
import Logout from './pages/Auth/Logout/Logout';

const App: React.FC = () => {
  const authStore = useAuthStore();
  let routes;

  if (authStore.isAuthenticated) {
    console.log('autenticado');
    routes = (
      <Router>
        <Layout>
          <Switch>
            <Route path="/logout" component={Logout} />
          </Switch>
        </Layout>
      </Router>
    );
  } else {
    console.log('no autenticado');
    routes = (
      <Router>
        <Switch>
          <Route path="/" component={Auth} />
        </Switch>
      </Router>
    );
  }

  return <div>{routes}</div>;
};

export default hot(module)(App);
