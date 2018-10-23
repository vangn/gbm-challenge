const request = require('request');
const debugRequest = require('debug')('gbm_request');
const debugResponse = require('debug')('gbm_response');

const EMPTY_URL_ERROR_MESSAGE = 'url is empty';
const TIME_OUT = 40000;

class Requester {
    constructor(endpoint = 'www.gbm.com.mx') {
        this.endpoint = endpoint;
    }

    get(url = '') {
        return new Promise((resolve, reject) => {
            if (url === '') {
                reject(EMPTY_URL_ERROR_MESSAGE);
            }

            const options = {
                url,
                timeout: TIME_OUT,
                Host: this.endpoint,
            };

            request(options, (error, response, body) => {
                if (!error) {
                    try {
                        const storeResponse = JSON.parse(body);

                        debugRequest(`method: GET, url: ${url}`);
                        debugResponse(body);

                        if (typeof (storeResponse) === 'boolean' || Array.isArray(storeResponse)) {
                            resolve(storeResponse);
                        } else {
                            storeResponse.amcoUrl = url;
                            resolve(storeResponse);
                        }
                    } catch (parseError) {
                        console.error(`server-requester => method: GET, url: ${url}`);
                        console.error(`server-requester => parse error: ${parseError}, originalResponse: ${body}`);
                        reject(parseError);
                    }
                } else {
                    console.error(`server-requester => method: GET, url: ${url}`);
                    console.error(`server-requester => error: ${error}`);
                    reject(error.code);
                }
            });
        });
    }

    getJSON(url = '', headers) {
        return new Promise((resolve, reject) => {
            if (url === '') {
                reject(EMPTY_URL_ERROR_MESSAGE);
            }

            const options = {
                url,
                timeout: TIME_OUT,
                Host: this.endpoint,
            };

            request(options, (error, response, body) => {
                if (!error) {
                    try {
                        const storeResponse = JSON.parse(body) || {};

                        debugRequest(`method: GET (with headers), url: ${url}, headers: ${JSON.stringify(headers)}`);
                        debugResponse(body);

                        if (typeof (storeResponse) === 'boolean' || Array.isArray(storeResponse)) {
                            resolve(storeResponse);
                        } else {
                            storeResponse.amcoUrl = url;
                            resolve(storeResponse);
                        }
                    } catch (parseError) {
                        console.error(`server-requester => method: GET (with headers), url: ${url}, headers: ${JSON.stringify(headers)}`);
                        console.error(`server-requester => parse error: ${parseError}, originalResponse: ${body}`);
                        reject(parseError);
                    }
                } else {
                    console.error(`server-requester => method: GET (with headers), url: ${url}, headers: ${JSON.stringify(headers)}`);
                    console.error(`server-requester => error: ${error}`);
                    reject(error.code);
                }
            });
        });
    }

    post(url = '', params = {}, headers) {
        return new Promise((resolve, reject) => {
            if (url === '') {
                reject(EMPTY_URL_ERROR_MESSAGE);
            }

            const requestData = {
                headers: {
                    Host: this.endpoint,
                },
                url,
                method: 'POST',
                form: params,
                timeout: TIME_OUT,
            };

            request.post(requestData, (error, response, body) => {
                if (!error) {
                    try {
                        const storeResponse = JSON.parse(body);

                        debugRequest(`method: POST, url: ${url}, params: ${JSON.stringify(params)}, headers: ${JSON.stringify(headers)}`);
                        debugResponse(body);

                        if (typeof (storeResponse) === 'boolean' || Array.isArray(storeResponse)) {
                            resolve(storeResponse);
                        } else {
                            storeResponse.amcoUrl = url;
                            resolve(storeResponse);
                        }
                    } catch (parseError) {
                        console.error(`server-requester => method: POST, url: ${url}, params: ${JSON.stringify(params)}, headers: ${JSON.stringify(headers)}`);
                        console.error(`server-requester => parse error: ${parseError}, originalResponse: ${body}`);
                        reject(parseError);
                    }
                } else {
                    console.error(`server-requester => method: POST, url: ${url}, params: ${JSON.stringify(params)}, headers: ${JSON.stringify(headers)}`);
                    console.error(`server-requester => error: ${error}`);
                    reject(error.code);
                }
            });
        });
    }
}

module.exports = Requester;
