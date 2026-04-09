const cds = require('@sap/cds')
const axios = require('axios')
module.exports = cds.service.impl(function () {
    this.on('getdistrictdetails', async (req) => {
        const { state } = req.data
        if (!state) {
            return req.error(400, 'statename required')
        }
        try {
            const response = await axios.get(`http://api.geonames.org/searchJSON?q=${state}&maxRows=1&featureCode=ADM1&username=geoapiss`)
            const data = response.data
            if (!data) {
                return req.error(404, 'State not found')
            }

            console.log(data);
            const geonamedetails = data.geonames
            const geonameid = geonamedetails[0].geonameId
            // console.log(geonameid);
            const districtresponse = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${geonameid}&username=geoapiss`)
            const datas = districtresponse.data.geonames

            if (!datas) {
                return req.error(404, 'invalid data')
            }
            return datas.map(loc => ({
                name: loc.name,
                latitude: loc.lat,
                longitude: loc.lng
            }))

        } catch (error) {
            console.error(error.response?.data || error.message)
            return req.error(500, 'Error fetching state details')
        }

    })
    this.on('getstates', async (req) => {
        const { countryCode } = req.data
        if (!countryCode) {
            return req.error(400, 'countryCode  required')
        }
        try {
            const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
                headers: { 'X-CSCAPI-KEY': '59b26accbf3a038e7b55dc0b2d99bddba581ac2bdbd0fad556ef1970947c0fe9' }
            });
            const data = response.data
            if (!data) {
                return req.error(404, 'State not found')
            }
            return data.map(loc => ({
                name: loc.name,
                latitude: loc.latitude,
                longitude: loc.longitude
            }))

        } catch (error) {
            console.error(error.response?.data || error.message)
            return req.error(500, 'Error fetching state details')
        }
    })
    this.on('getLocationdetails', async (req) => {
        const { userinput } = req.data
        if (!userinput) {
            return req.error(400, 'userinput is required')
        }
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${userinput}&format=json&addressdetails=1&limit=50`;
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'SAP-CAP-Location-Service'
                }
            })
            if (!response.data || response.data.length === 0) {
                return req.error(404, 'Location not found')
            }
            const results = response.data.map(loc => ({
                name: loc.display_name,
                latitude: loc.lat,
                longitude: loc.lon
            }))
            return results
        } catch (error) {
            req.error(500, 'Error fetching location details')
        }
    })

this.on('getAddressdetails', async (req) => {

  const { Doorno, streetname, city, state, country, pincode } = req.data;
  const dsdata = Doorno + " " + streetname;

  try {

    const url = `https://nominatim.openstreetmap.org/search?street=${dsdata}&city=${city}&state=${state}&country=${country}&postalcode=${pincode}&format=json&limit=1`;

    const res = await axios.get(url, {
      headers: { 'User-Agent': 'sap demo' }
    });

    if (!res.data.length) {
      throw new Error("Address not found");
    }

    const data = res.data;
    return [{
      name: data[0].display_name,
      latitude: data[0].lat,
      longitude: data[0].lon
    }];

  } catch (err) {
    console.log("Error:", err.message);
    return req.error(500, err.message);
  }

});






})

