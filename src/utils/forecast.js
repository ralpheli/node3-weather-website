const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=91ebd967a19c127369cc72ec5bc6e4ee&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ": It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out there."
      );
    }
  });
};
// callback function
// forecast(-42.3605, 71.0596, (warning, data) => {
//     console.log("Error", warning);
//     console.log("Data", data);
//   });
module.exports = forecast;
