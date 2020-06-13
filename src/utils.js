const request = require('request')

const geocode = (address, callback) => {
const url =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  address +
  ".json?access_token=pk.eyJ1IjoibmVpbGF1c3RpbjMxNiIsImEiOiJja2I5NWh0cGkwYXRpMnpyeGE5dDg1ZngzIn0.lCvB0lct9mWWyj341VjC9w&limit=1";
    request({ url: url, json: true }, (error, response) => {
        if (error) {
        callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
        callback('Unable to find location. Try another search.',
        undefined)
        } else {
                callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
                })
        }
    })
}

const forcast = (lang, lati, location,callback) => {
  let weatherUrl =
    "http://api.weatherstack.com/current?access_key=8128cc7cc4a36b66df809a50f0205a89&query=" +
    lang +
    "," +
    lati;
  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else {
      callback(undefined, {
        temp: response.body.current.temperature,
        rainchance: response.body.current.precip,
        placename: location,
      });
    }
  });
};
module.exports = {
    gc:geocode,
    fc:forcast
};