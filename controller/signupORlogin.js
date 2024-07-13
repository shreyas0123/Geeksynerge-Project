const signUpUserDetails = require('../models/signup'); // Importing the 'signUpUserDetails' model from '../models/signup'
const bcrypt = require('bcrypt'); // Importing the bcrypt library for password hashing
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for generating JWTs

exports.signup = async (req,res,next) =>{ // Exported function to handle user signup
    try{
        const name = req.body.name; // Retrieving 'name' from request body
        const email = req.body.email; // Retrieving 'email' from request body
        const password = req.body.password; // Retrieving 'password' from request body
        const phoneNumber = req.body.phoneNumber; // Retrieving 'phoneNumber' from request body
        console.log('from req.body>>>',name,email,password,phoneNumber); // Logging retrieved data from request body

        if(!name  || !email || !password || !phoneNumber){ // Checking if any required field is missing
            return res.status(400).json({success:false,message:"please fill all the details of the form"}); // Sending error response if fields are missing
        }

        const uniqueEmail = await signUpUserDetails.findOne({email:email}); // Checking if the email already exists in the database
        if(uniqueEmail){ // If email already exists, send error response
            return res.status(500).json({success:false,message:'user already exist,change the Email'});
        }

        const saltrounds = 10; // Setting the number of salt rounds for bcrypt hashing
        const hash = await bcrypt.hash(password,saltrounds); // Hashing the password using bcrypt
       
        const data = await signUpUserDetails.create({ // Creating a new user in the database
            name:name,
            email:email,
            password:hash,
            phoneNumber:phoneNumber
        });
    
        res.json({success:true,message:'Signup succesfull,login to enter a page',data:data}); // Sending success response after user creation
    }catch(error){
        console.log('error from adduserdb',error); // Logging any errors that occur during signup
        res.json({success:false,message:'user already exist..please signup with new email'}); // Sending error response if user already exists
    }
}

function generateToken(_id,ispremiumUser){ // Function to generate JWT token
    return jwt.sign({userId: _id,isPremium: ispremiumUser},'fiuhf2bd484fdfhfff656ffhfEwddfkmnv'); // Signing a JWT token with payload and secret key
}

exports.login = async (req,res) =>{ // Exported function to handle user login
    try{
        const email = req.body.email; // Retrieving 'email' from request body
        const password = req.body.password; // Retrieving 'password' from request body

        if(!email || !password){ // Checking if email or password is missing
            return res.status(400).json({success:false,message:'email or password is missing'}); // Sending error response if fields are missing
        }
        
        const uniqEmail = await signUpUserDetails.findOne({email:email}); // Finding user by email in database
        console.log('uniqEmail',uniqEmail); // Logging found user details

        if(uniqEmail){ // If user with email exists
            const passwordMatch = await bcrypt.compare(password,uniqEmail.password); // Comparing passwords

            if(passwordMatch){ // If passwords match, generate and send JWT token
                const token = generateToken(uniqEmail._id,uniqEmail.ispremiumUser);
                return res.status(200).json({success:true,message:'user loggedIn successfully',token: token});
            }else{ // If passwords don't match, send error response
                return res.status(400).json({success:false,message:'incorrect password'});
            }
        }else{ // If user with email doesn't exist, send error response
            return res.status(400).json({success:false,message:'user does not exist'});
        }
    }catch(error){
        console.log('error from login page',error); // Logging any errors that occur during login
    }
}
