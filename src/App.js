import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { ScreenA, ScreenB, ScreenC } from './screens';
import { useLocationUpdater } from './custom-hooks';
import { NavigationBar } from './components';

import './App.css';

const links = [
  {
    name: 'Screen A',
    to: '/screenA',
    Component: ScreenA,
  },
  {
    name: 'Screen B',
    to: '/screenB',
    Component: ScreenB,
  },
  {
    name: 'Screen C',
    to: '/screenC',
    Component: ScreenC,
  }
];

function App() {
  useLocationUpdater();

  return (
    <React.Fragment>
      <NavigationBar links={links} />
      <Switch>
        {links.map(Link => (
          <Route exact path={Link.to} key={Link.to}>
            <Link.Component title={Link.name}/>
          </Route>
        ))}
      </Switch>
    </React.Fragment>
  );
}

export default App;
