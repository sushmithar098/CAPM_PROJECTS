const cds = require('@sap/cds');


module.exports = cds.service.impl(function () {

    const { dealers } = this.entities;

    this.before('CREATE', dealers, async (req) => {
        const { dealer_id, dealer_name, location } = req.data;

        if (!dealer_id) {
            return req.error(400, 'Enter the valid dealer_id');
        }
        if (!dealer_name) {
            return req.error(400, 'Enter a dealer_name');
        }
        if (!location) {
            return req.error(400, 'Enter the location');
        }
    });

    this.on('CREATE', dealers, async (req) => {

        const geoSer = await cds.connect.to('geo');

        try {
            const location = encodeURIComponent(req.data.location);

            const res = await geoSer.send({
                method: 'GET',
                path: `/odata/v4/geolocation/getLocationdetails(userinput='${location}')`
            });

            console.log("results",res);

            if (res && res.length > 0) {
                req.data.latitude = res[0].latitude;
                req.data.longitude = res[0].longitude;
            }

        } catch (error) {
            console.error(error);
            return req.error(500, 'External service failed');
        }

        return await INSERT.into(dealers).entries(req.data);
    });

});