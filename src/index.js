import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const component = ReactDOM.render(<App a="s" />, document.getElementById('root'));
setTimeout(() => {
  component.setState({
    heading: 'React Awesomesauce',
  });
}, 3000);

registerServiceWorker();

