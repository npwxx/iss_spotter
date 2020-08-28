const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(body => console.log(body));
//TODO parse response and print pass date & duration