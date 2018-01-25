import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import '../node_modules/getbase/css/styles.css';
import '../node_modules/milligram/dist/milligram.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
