# NodeAuthPortal

NodeAuthPortal is a web application project that provides user registration, authentication, and management functionalities using Node.js, Express, MongoDB, Bootstrap, bcrypt for password hashing, and JSON Web Tokens (JWT) for authentication.

## Setting Up Your Environment

### Install Node.js and MongoDB

If not already installed, download and install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) on your system.

### Initialize Node.js Project

Initialize a new Node.js project using `npm init`.

## Setting Up Express Server

### Create an Express Application

Set up an Express server using `express`.

### Install Necessary Packages

Install required packages such as `express`, `mongoose`, `bcrypt`, and `jsonwebtoken`.

## User Registration Page

### HTML Form with Bootstrap

Design a user registration form using Bootstrap with fields for Name, Password, Email, Phone No, and Profession.

### Password Encryption

Encrypt passwords using `bcrypt` before saving to MongoDB for enhanced security.

## API for User Registration

### POST Endpoint (/signup)

Handle user registration through a POST request in Express.
Validate and sanitize user input.
Save encrypted user data to MongoDB.

## Login Page and Authentication

### HTML Login Form

Create an HTML form for user login.

### POST Endpoint (/login)

Implement user authentication via a POST request in Express.
Validate user credentials against MongoDB records.
Issue a JWT token upon successful authentication and store it in localStorage.

## Homepage and API for Listing Users

### GET Endpoint (/getUser)

Fetch and list all registered users in JSON format.

## APIs for Update and Delete Operations

### PUT Endpoint (/update-user/:id)

Update user data (name, phone number) using a PUT request.

### DELETE Endpoint (/delete-user/:id)

Delete a registered user record based on user ID.

## Frontend Integration

Integrate frontend with backend APIs using Axios or Fetch API.
Handle API responses to show notifications or errors to users.

## Tech Stack

- Node.js
- Express
- MongoDB
- Bootstrap
- bcrypt (for password hashing)
- JSON Web Tokens (JWT) for authentication

