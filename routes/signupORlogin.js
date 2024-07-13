const express = require('express'); // Imports the Express framework
const routes = express.Router(); // Creates a new router instance
const add = require('../controller/signupORlogin'); // Imports the signupORlogin controller

routes.post('/signup', add.signup); // Route for handling user signup
routes.post('/login', add.login); // Route for handling user login

module.exports = routes; // Exports the router module
