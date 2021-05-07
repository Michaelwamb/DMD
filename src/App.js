import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Immobile from './pages/immobile/immobile';
import Tenants from './pages/tenants/tenants';
import Login from './components/login/login';
import Dash from './pages/dashboard/dash';
import Error from './PageError/Error';
import Location from './pages/location/location';

function App() {
  return (
    <>
      <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/immobile' exact component={Immobile} />
            <Route path='/dash' exact component={Dash} />
            <Route path='/location' component={Location} />
            <Route path='/tenants' exact component={Tenants} />
            {/* <Route path='/contracts' component={Contracts} /> */}
            <Route path='/login' component={Login} />
            <Route component={Error}/>
          </Switch>
      </Router>
    </>
  );
}

export default App;