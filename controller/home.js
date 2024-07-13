const alldetails = require('../models/signup'); // Importing the 'alldetails' model from '../models/signup'

exports.getUser = async (req, res) => { // Exported function to handle GET requests for fetching users
    try {
        const data = await alldetails.find(); // Retrieving all user details from the database
        res.json({ getUser: data }); // Sending a JSON response with fetched user data
        console.log('res from getUser method', data); // Logging the fetched user data to console
    } catch (error) {
        console.log('error from getUser method', error); // Logging any errors that occur during fetching
        res.status(500).json({ error: 'Failed to fetch user data' }); // Sending an error response if fetching fails
    }
};

exports.deleteUser = async (req, res) => { // Exported function to handle DELETE requests for deleting users
    try {
        console.log('params id', req.params.id); // Logging the user ID received in request parameters
        if (!req.params.id) {
            throw new Error('id is mandatory to delete'); // Throwing an error if no user ID is provided
        }

        const detailsId = req.params.id; // Storing the user ID from request parameters
        const data = await alldetails.findByIdAndDelete(detailsId); // Deleting the user from database by ID

        if (!data) {
            return res.status(404).json({ error: 'User not found' }); // Sending a 404 error if user is not found
        }

        res.json({ message: 'User deleted successfully', deleted: data }); // Sending success message with deleted user data
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' }); // Sending an error response if deletion fails
        console.log('error from deleteUser method', error); // Logging any errors that occur during deletion
    }
};

exports.updateUser = async (req, res) => { // Exported function to handle PUT requests for updating users
    try {
        const userId = req.params.id; // Retrieving the user ID from request parameters
        const updatedData = req.body; // Retrieving updated user data from request body
        
        const updatedUser = await alldetails.findByIdAndUpdate(userId, updatedData, { new: true }); // Updating user data in the database

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' }); // Sending a 404 error if user is not found
        }

        res.json({ message: 'User updated successfully', updatedUser }); // Sending success message with updated user data
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' }); // Sending an error response if update fails
        console.log('error from updateUser method', error); // Logging any errors that occur during update
    }
};
