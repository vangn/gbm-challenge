const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Provider = require('react-redux').Provider;

const initialState = require('../../shared/domain/states/gbm-initial-state.json');
const getStore = require('../../shared/domain/stores/store-generator').getGBMStore;
const GBMTransformer = require('../../server/transformer/gbm-transformer');

const GBMApi = require('../../shared/api/gbm-api');
const Requester = require('../../shared/requester/server-requester');

const requester = new Requester();
const gbmApi = new GBMApi(requester);
const gbmTransformer = new GBMTransformer();

const AppGBM = require('../../client/App');

class GBMRoutes {
    constructor(app) {
        function getGBMData(req, res, next) {
            console.log('::::::: getGBMData');
            gbmApi.getGBMData().then((response) => {
                if (!response.result) {
                    throw response;
                }

                console.log('getGBMData', response);
                res.locals.resultObj =
                    gbmTransformer.transformGBMResulData(response.resultObj);
                next();
            }).catch((error) => {
                console.log('ERROR API', error);
            });
        }

        const middleWare = [getGBMData];

        app.get('/gbm', (req, res) => {
            const store = getStore(initialState);
            const appGBM = React.createElement(AppGBM);
            const provider = React.createElement(Provider, { store }, appGBM);

            const preloadedMarkup = ReactDOMServer.renderToString(provider);
            const preloadedState = JSON.stringify(initialState);

            res.render('index.ejs', {
                preloadedMarkup,
                preloadedState,
            });
        });

        app.get('/webapi/getGBMData', ...middleWare, (req, res) => {
            res.send(res.locals.resultObj);
        });

        app.get('/', (req, res) => {
            res.redirect('/gbm');
        });
    }
}

module.exports = GBMRoutes;
