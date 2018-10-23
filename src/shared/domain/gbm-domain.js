const initialState = require('./states/gbm-initial-state.json');
const ClientRequester = require('../../shared/requester/client-requester');
const GBMApi = require('../api/gbm-internal-api');
const GBM_FLOWS = require('./constants/gbm-flows');

const requester = new ClientRequester();
const api = new GBMApi(requester);

const EVENTS = {
    SHOW_LOADING: 'SHOW_LOADING',
    REMOVE_LOADING: 'REMOVE_LOADING',
    SHOW_ERROR: 'SHOW_ERROR',
    SET_GBM_DATA: 'SET_GBM_DATA',
};

const showLoading = () => ({ type: EVENTS.SHOW_LOADING });

const removeLoading = () => ({ type: EVENTS.REMOVE_LOADING });

const showError = message => (dispatch) => { dispatch({ type: EVENTS.SHOW_ERROR, message }); };

const setGBMData = result => ({ type: EVENTS.SET_GBM_DATA, result });

const getGBMData = () => (dispatch) => {
    console.log('::::::::::');
    dispatch(showLoading());
    api.getGBMData()
        .then((response) => {
            dispatch(setGBMData(response));
            dispatch(removeLoading());
        })
        .catch((error) => {
            dispatch(removeLoading());
            dispatch(showError(error));
        });
};

const actions = {
    showLoading,
    removeLoading,
    showError,
    getGBMData,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENTS.SHOW_ERROR:
            return {
                ...state,
                error: action.message,
            };
        case EVENTS.SHOW_LOADING:
            return {
                ...state,
                showLoading: true,
            };
        case EVENTS.REMOVE_LOADING:
            return {
                ...state,
                showLoading: false,
            };
        case EVENTS.SET_GBM_DATA:
            return {
                ...state,
                resultObj: action.result,
            };
        default:
            return { ...state };
    }
};

module.exports = {
    actions,
    reducer,
};
