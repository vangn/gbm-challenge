const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const App = require('./components/App');

const getStore = require('../shared/domain/stores/store-generator').getGBMStore;

const initialState = window.__PRELOADED_STATE__;
const store = getStore(initialState);

require('../../public/css/app.css');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
