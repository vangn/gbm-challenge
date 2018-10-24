const d3TimeFormat = require('d3-time-format');

class GBMTransformer {

    transformDate(time) {
        const formatTime = d3TimeFormat.timeFormat('%d-%b-%y %H:%M');
        const ms = new Date(time);
        const day = ms.getDate();
        const month = ms.getMonth();
        const year = ms.getFullYear();
        const hour = ms.getHours();
        const minutes = ms.getMinutes();
        const seconds = ms.getSeconds();
        const newDateFormat = `${day}-${month}-${year} ${hour}:${minutes}`;
        const dateD3 = formatTime(time);
        console.log(dateD3);
        return newDateFormat;
    }

    transformGBMResulData(resultObj) {
        if (resultObj === undefined) {
            return [];
        }

        const date = new Date('2018-10-24T06:03');
        const date2 = new Date('2018-10-24T06:03:01.11-05:00');

        console.log(':::::: date', new Date(1416787200000));
        console.log(':::::: date2', new Date(1415577600000));

        return resultObj.map(g => ([
            Date.parse(g.Fecha),
            g.Precio,
        ]));
    }
}

module.exports = GBMTransformer;
