import React, { lazy, Suspense,  useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// ops routes
import routes from './routes/routes';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { authOperations } from './redux/auth';
// компоненты
import AppBar from './components/AppBar';
import Container from './components/Container';
import Spiner from './components/Spiner';

// стили

import './App.module.css';


const HomePage = lazy(() =>
  import('./views/HomeViews' /* webpackChunkName: "home-page" */),
);
const ContactsPage = lazy(() =>
  import('./views/ContactsViews' /* webpackChunkName: "contacts-page" */),
);
const LoginPage = lazy(() =>
  import('./views/LoginViews' /* webpackChunkName: "login-page" */),
);
const RegisterPage = lazy(() =>
  import('./views/RegisterViews' /* webpackChunkName: "register-page" */),
);


export default function  App () {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(authOperations.getCurrentUser())
  }, [dispatch])

    return (
      <>
        <AppBar />
        <Container>
          <Suspense fallback={<Spiner />}>
            <Switch>
              <Route path={routes.home} exact component={HomePage} />
              <PrivateRoute
                path={routes.contacts}
                exact
                redirectTo={routes.logins}
              ><ContactsPage/></PrivateRoute>
              <PublicRoute
                path={routes.logins}
                redirectTo={routes.contacts}
                restricted
              ><LoginPage/></PublicRoute>

              <PublicRoute
                path={routes.register}
                redirectTo={routes.contacts}
                restricted
              ><RegisterPage/></PublicRoute>
              <Redirect to={routes.home} />
            </Switch>
          </Suspense>
        </Container>
      </>
    );
}

