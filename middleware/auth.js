const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for JWT operations
const User = require('../models/signup'); // Importing the 'signup' model from '../models/signup'

exports.authenticate = async(req,res,next) =>{ // Exported function to authenticate user
    try{
        const token  = req.header('Authorization'); // Retrieving JWT token from request headers
        console.log('token from middleware',token); // Logging the retrieved token

        const user = jwt.verify(token,'fiuhf2bd484fdfhfff656ffhfEwddfkmnv'); // Verifying and decoding JWT token
        console.log('userId >>>>>',user.userId); // Logging the decoded user ID from JWT payload

        const data = await User.findByPk(user.userId); // Finding user data from 'signup' model by user ID
        req.user = data; // Attaching user data to request object for further middleware or route handlers
        next(); // Proceeding to next middleware or route handler

    }catch(error){
        console.log('error in auth.js in middleware',error); // Logging any errors that occur during authentication
        res.json({Error:error}); // Sending error response
    }
}
