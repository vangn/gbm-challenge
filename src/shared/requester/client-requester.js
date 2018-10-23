const jQuery = require('jquery');

const EMPTY_URL_ERROR_MESSAGE = 'url is empty';

class Requester {
    get(url = '') {
        return new Promise((resolve, reject) => {
            if (url === '') {
                reject(EMPTY_URL_ERROR_MESSAGE);
            }

            jQuery.get(url).done(response => resolve(response)).fail(error => reject(error));
        });
    }

    getJSON(url = '') {
        return new Promise((resolve, reject) => {
            if (url === '') {
                reject(EMPTY_URL_ERROR_MESSAGE);
            }
            jQuery.getJSON(url).done(response => resolve(response)).fail(error => reject(error));
        });
    }

    post(url = '', data, headers) {
        return new Promise((resolve, reject) => {
            if (url === '') {
                reject(EMPTY_URL_ERROR_MESSAGE);
            }

            jQuery.ajax(url, {
                method: 'POST',
                headers,
                data,
            })
                .done(response => resolve(response))
                .fail(error => reject(error));
        });
    }

    postJSON(url = '', data) {
        return new Promise((resolve, reject) => {
            if (url === '') {
                reject(EMPTY_URL_ERROR_MESSAGE);
            }

            jQuery.ajax({
                url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
            })
                .done(response => resolve(response))
                .fail(error => reject(error));
        });
    }
}

module.exports = Requester;
