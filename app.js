const express = require('express'); // Importing the Express framework
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
const bodyparser = require('body-parser'); // Middleware for parsing incoming request bodies
const mongodb = require('./util/database'); // Importing database connection utility

const signupORDetails = require('./routes/signupORlogin'); // Importing routes for signup and login functionality
const allUser = require('./routes/home'); // Importing routes for user-related operations

const password = require('./routes/forgotpassword'); // Importing routes for password management
const helmet = require('helmet'); // Middleware for securing HTTP headers
const compression = require('compression'); // Middleware for compressing response bodies
const morgan = require('morgan'); // HTTP request logger middleware
const fs = require('fs'); // File system module for handling file operations
const path = require('path'); // Module for handling file and directory paths

require("dotenv").config(); // Loading environment variables from .env file

const app = express(); // Creating an instance of Express application

app.use(cors()); // Adding CORS middleware to allow cross-origin requests
app.use(bodyparser.json()); // Using body-parser middleware for parsing JSON requests

app.use(signupORDetails); // Mounting signup and login routes
app.use(password); // Mounting password management routes
app.use(allUser); // Mounting user-related routes

const accessLogStream = fs.createWriteStream(path.join(__dirname, "request.log"), { flags: "a" });
// Creating a writable stream for logging HTTP requests

app.use(helmet()); // Adding helmet middleware for enhancing API security
app.use(compression()); // Adding compression middleware to compress response data

app.use(morgan('combined', { stream: accessLogStream }));
// Configuring morgan middleware to log HTTP requests to a file using the combined format

mongodb()
  .then((response) => {
    console.log(`Database connected to MongoDB`);
    app.listen(3000, console.log(`Listening on port 3000`));
  })
  .catch((err) => console.log(err));
// Establishing MongoDB connection and starting Express server on port 3000
