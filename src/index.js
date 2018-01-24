import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import MyNavbar from './MyNavbar.js'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <p>
    <MyNavbar/>
    <BrowserRouter>
      <Switch>
        <Route component={ App } />
      </Switch>
    </BrowserRouter>
  </p>

  ), document.getElementById('root'));

registerServiceWorker();

