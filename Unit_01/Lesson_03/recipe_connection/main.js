//entry point application, this is where server code will be

const cities = require("cities");
let myCity = cities.zip_lookup("10016");
console.log(myCity);
