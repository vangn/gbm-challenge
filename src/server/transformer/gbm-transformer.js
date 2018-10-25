class GBMTransformer {

    transformGBMResulData(resultObj) {
        if (resultObj === undefined || resultObj === null) {
            return [];
        }

        return resultObj.map(g => ([
            Date.parse(g.Fecha),
            g.Precio,
        ]));
    }
}

module.exports = GBMTransformer;
