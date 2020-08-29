const { nextISSTimesForMyLocation, printPassTimes } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTime) => {
    printPassTimes(passTime);
  })
  .catch((error) => {
    console.log("It didnt work:", error.message);
  });