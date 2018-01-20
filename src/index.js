import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './index.css';
import App from './App';
import MyNavbar from './MyNavbar.js'
import registerServiceWorker from './registerServiceWorker';


const component = ReactDOM.render((
  <p>
    <MyNavbar/>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </BrowserRouter>
  </p>

), document.getElementById('root'));

registerServiceWorker();

