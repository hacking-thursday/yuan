import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const component = ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </BrowserRouter>

), document.getElementById('root'));

registerServiceWorker();

