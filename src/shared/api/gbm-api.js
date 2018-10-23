const ERROR_MISSING_PARAMETER = "Some parameter is not provided. Request can't be made";

class GBMApi {
    constructor(requester) {
        this.requester = requester;
    }

    loginApp(email, password,) {
        return new Promise((resolve, reject) => {
            if (email === undefined || password === undefined) {
                reject(ERROR_MISSING_PARAMETER);
            }

            const LOGIN_URL = '/loginApp';

            const params = { email, password };

            this.requester.post(LOGIN_URL, params, '')
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    getGBMData() {
        return new Promise((resolve, reject) => {
            const GBM_URL = 'https://www.gbm.com.mx/Mercados/ObtenerDatosGrafico?empresa=IPC';
            this.requester.getJSON(GBM_URL)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}

module.exports = GBMApi;
