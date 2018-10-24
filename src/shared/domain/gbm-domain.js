const initialState = require('./states/gbm-initial-state.json');
const Requester = require('../../shared/requester/client-requester');
const GBMApi = require('../api/gbm-internal-api');
const GBM_FLOWS = require('./constants/gbm-flows');

const requester = new Requester();
const api = new GBMApi(requester);

const EVENTS = {
    SHOW_LOADING: 'SHOW_LOADING',
    REMOVE_LOADING: 'REMOVE_LOADING',
    SHOW_ERROR: 'SHOW_ERROR',
    SET_SELECTED_SECTION: 'SET_SELECTED_SECTION',
    SET_GBM_DATA: 'SET_GBM_DATA',
};

const showLoading = () => ({ type: EVENTS.SHOW_LOADING });

const removeLoading = () => ({ type: EVENTS.REMOVE_LOADING });

const showError = message => (dispatch) => { dispatch({ type: EVENTS.SHOW_ERROR, message }); };

const selectSection = sectionId => ({ type: EVENTS.SET_SELECTED_SECTION, sectionId });

const setGBMData = result => ({ type: EVENTS.SET_GBM_DATA, result });

const getGBMData = () => (dispatch) => {
    // dispatch(showLoading());
    api.getGBMData()
        .then((response) => {
            dispatch(setGBMData(response));
            dispatch(selectSection(GBM_FLOWS.SHOW_GRAPH));
            // dispatch(removeLoading());
        })
        .catch((error) => {
            // dispatch(removeLoading());
            dispatch(selectSection(GBM_FLOWS.SHOW_LOGIN));
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
        case EVENTS.SET_SELECTED_SECTION:
            return {
                ...state,
                sectionId: action.sectionId,
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
