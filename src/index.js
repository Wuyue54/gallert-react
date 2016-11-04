import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from 'components/Main';

require('normalize.css/normalize.css');
require('styles/App.scss');

ReactDOM.render(<AppComponent />, document.getElementById('app'));
