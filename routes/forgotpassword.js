const express = require('express'); // Imports the Express framework
const routes = express.Router(); // Creates a new router instance
const add = require('../controller/forgotpassword'); // Imports controller methods

routes.post('/forgot-password', add.forgotpassword); // Route to handle forgot password requests

routes.get("/resetpassword/:id", add.resetpassword); // Route to handle reset password page

routes.get("/updatepassword/:resetpassword", add.updatepassword); // Route to handle password update

module.exports = routes; // Exports the router module
