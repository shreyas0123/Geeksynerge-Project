const mongoose = require('mongoose'); // Importing mongoose library for MongoDB operations
const Schema = mongoose.Schema; // Creating a schema variable to define MongoDB schema
const uuid = require("uuid"); // Importing UUID library for generating unique identifiers

const forgotpasswordSchema = new Schema({ // Defining a mongoose schema for 'forgotpassword'
    isactive: { // Field indicating if the password reset request is active
        type: Boolean, // Data type: Boolean
        required: true // Mandatory field
    },
    id: { // Unique identifier for the password reset request
        type: String, // Data type: String (UUID)
        default: () => uuid.v4() // Default value generator using UUID v4
    }
});

const forgotpassword = mongoose.model("forgotpassword", forgotpasswordSchema); // Creating mongoose model 'forgotpassword'
module.exports = forgotpassword; // Exporting 'forgotpassword' model for use in other modules
