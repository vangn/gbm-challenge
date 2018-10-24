class GBMApi {
    constructor(requester) {
        console.log('::::::: constructor', requester);
        this.requester = requester;
    }

    loginApp(userId, password) {
        return new Promise((resolve, reject) => {
            const URL = '/webapi/login';
            this.requester.post(URL, { userId, password }).then(
                response => resolve(response),
            ).catch(error => reject(error));
        });
    }

    getGBMData() {
        return new Promise((resolve, reject) => {
            const URL = '/webapi/getGBMData';
            this.requester.getJSON(URL)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}

module.exports = GBMApi;
