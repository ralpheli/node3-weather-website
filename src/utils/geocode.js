const request = require("request");
//callback abstraction
// FOR GEOCODE
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFscGhsaXdhZzE0IiwiYSI6ImNrcTdxZzNlOTA4OTYyenF5MjV1bTRveXcifQ.ECNzONi2Q91n4GvNCKsHTw&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

// geocode("Boston", (warning, data) => {
//   console.log("Error", warning);
//   console.log("Data", data);
// });

module.exports = geocode;
