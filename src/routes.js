import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

import Home from './Components/home';
import SignIn from './Components/signin';
import TheTeam from './Components/theTeam';
import TheRaces from './Components/theRaces';
import NotFound from './Components/ui/not_found';

import Dashboard from './Components/admin/Dashboard';
import AdminRaces from './Components/admin/races';
import AddEditRace from './Components/admin/races/addEditRace';
import AdminRiders from './Components/admin/riders';
import AddEditRiders from './Components/admin/riders/addEditRiders';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/admin_riders/add_riders" exact component={AddEditRiders} />
        <PrivateRoute {...props} path="/admin_riders/add_riders/:id" exact component={AddEditRiders} />
        <PrivateRoute {...props} path="/admin_riders" exact component={AdminRiders} />
        <PrivateRoute {...props} path="/admin_races/edit_race" exact component={AddEditRace} />
        <PrivateRoute {...props} path="/admin_races/edit_race/:id" exact component={AddEditRace} />
        <PrivateRoute {...props} path="/admin_races" exact component={AdminRaces} />
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn} />
        <PublicRoute {...props} restricted={false} path="/the_races" exact component={TheRaces} />
        <PublicRoute {...props} restricted={false} path="/the_team" exact component={TheTeam} />
        <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
        <PublicRoute {...props} restricted={false} component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
