const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/75f1b874d1a2e1b2e26479a36bc891a3/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      console.log(body.daily.data[0]);
      const temperature = (((body.currently.temperature - 32) * 5) / 9).toFixed(
        2
      );
      const temperatureHigh = (
        ((body.daily.data[0].temperatureHigh - 32) * 5) /
        9
      ).toFixed(2);
      const temperatureLow = (
        ((body.daily.data[0].temperatureLow - 32) * 5) /
        9
      ).toFixed(2);

      callback(
        undefined,
        body.daily.data[0].summary +
          " it is currently: " +
          temperature +
          "ºC out. This high today is " +
          temperatureHigh +
          " and low is " +
          temperatureLow +
          ". There is a " +
          body.currently.precipProbability +
          "% of rain."
      );
    }
  });
};

module.exports = forecast;
