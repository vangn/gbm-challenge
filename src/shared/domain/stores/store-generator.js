const { createStore, applyMiddleware } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');
const thunkMiddleware = require('redux-thunk').default;
const createLogger = require('redux-logger');
const gbmReducer = require('../gbm-domain').reducer;

const middlewares = [thunkMiddleware, createLogger()];

const getGBMStore = initialState => createStore(
    gbmReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)),
);

module.exports = {
    getGBMStore,
};
