const express = require('express'); // Imports the Express framework
const router = express.Router(); // Creates a new router instance
const homeController = require('../controller/home'); // Imports controller methods

router.get('/getUser', homeController.getUser); // Route to fetch user data
router.delete('/delete-user/:id', homeController.deleteUser); // Route to delete a user
router.put('/update-user/:id', homeController.updateUser); // Route to update user details

module.exports = router; // Exports the router module
