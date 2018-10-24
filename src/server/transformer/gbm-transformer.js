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

        return resultObj.map(g => ({
            x: this.transformDate(g.Fecha),
            y: g.Precio,
        }));
    }
}

module.exports = GBMTransformer;
