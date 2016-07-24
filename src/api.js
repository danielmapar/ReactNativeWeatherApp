import _ from 'lodash';

const rootUrl = "api.openweathermap.org/data/2.5/weather?APPID=a2f7a09a63e6e1143c3c86b680bb2b37";

const kelvinToF = (kelvin) => {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F'; // Remove ' * 1.8 + 32' for celcius value
};

export default (latitude, longitude) => {
  const requestUrl = `http://${rootUrl}&lat=${latitude}&lon=${longitude}`;

  // http://stackoverflow.com/questions/31254725/transport-security-has-blocked-a-cleartext-http
  // Fix unresolved fetch requests (http ones)
  return fetch(requestUrl).then((response) => {
    let json = response.json();
    if (response.status >= 200 && response.status < 300) {
      return json;
    } else {
      return json.then(err => {throw err;});
    }
  }).then((json) => {
    return {
      city: json.name,
      temperature: kelvinToF(json.main.temp),
      description: _.capitalize(json.weather[0].description)
    }
  });
}
