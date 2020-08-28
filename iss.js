const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error);
    } if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};
const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipvigilante.com/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
    } else {
      const data = JSON.parse(body).data;
      callback(null, {
        latitude: data.latitude,
        longitude: data.longitude
      });
    }
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Fly Over Times: ${body}`), null);
    } else {
      const { response } = JSON.parse(body);
      //console.log(body);
      callback(null, response);
    }
  });
};
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, data) => {
        if (error) {
          callback(error);
          return;
        }
        callback(null, data);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};