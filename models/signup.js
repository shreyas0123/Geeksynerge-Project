const mongoose = require('mongoose'); // Importing mongoose library for MongoDB operations
const Schema = mongoose.Schema; // Creating a schema variable to define MongoDB schema

const userSchema = new Schema({ // Defining a mongoose schema for 'user'
    name: { // User's name field
        type: String, // Data type: String
        required: true // Mandatory field
    },
    email: { // User's email field
        type: String, // Data type: String
        required: true, // Mandatory field
        unique: true // Unique constraint for email
    },
    password: { // User's password field
        type: String, // Data type: String
        required: true // Mandatory field
    },
    phoneNumber: { // User's phone number field
        type: Number, // Data type: Number
        required: true // Mandatory field
    },
    forgotPassword: [ // Reference to 'forgotpassword' documents
        {
            type: mongoose.Schema.Types.ObjectId, // Data type: ObjectId
            ref: "forgotpassword" // Referencing the 'forgotpassword' model
        }
    ]
});

const user = mongoose.model('User', userSchema); // Creating mongoose model 'User' based on 'userSchema'
module.exports = user; // Exporting 'user' model for use in other modules
