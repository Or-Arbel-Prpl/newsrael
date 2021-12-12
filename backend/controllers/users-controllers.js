const User = require('../models/user');

//google signin
const { OAuth2Client, LoginTicket } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const google_client = new OAuth2Client("486165145345-qp7ovoef05356ndtumopo8vfqv75id0l.apps.googleusercontent.com")
 

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        const error = new Error('Fetching users failed.');
        error.code = 404;
        return next(error);
    } 

    if( !users || users.length === 0 ){
        const error = new Error('Could not find users.');
        error.code = 404;
        return next(error);
    }
    res.json({ users: users.map(u => u.toObject({getters: true})) });
};

const createUser = async (req, res, next) => {
    const { firstName, lastName, email } = req.body;

    const createdUser = new User ({
        firstName,
        lastName,
        email,
        // createdAt: new Date(),
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new Error('Creating user failed, please try again.');
        error.code = 500;
        return next(error);
    }
    
    res.status(201).json({user: createdUser});
};

const googleLogin = async (req, res, next) => {
    const {tokenId, image} = req.body;
    console.log('req.body');
    console.log(req.body);

    // client.verifyIdToken({idToken: tokenId, audience: '486165145345-qp7ovoef05356ndtumopo8vfqv75id0l.apps.googleusercontent.com'})
    google_client.verifyIdToken({idToken: tokenId, audience: process.env.REACT_APP_GOOGLE_CLIENT_ID})
    .then(response =>{
        const { email_verified, given_name, family_name, email } = response.payload;
        // console.log(response);
        
        if(email_verified){
            User.findOne({email}).exec((err, user) => { //check if the user signed in before
                if(err){
                    const error = new Error('Something went wrong, please try again');
                    error.code = 400;
                    return next(error);
                }
                else{
                    if(user){ //user already exists
                        const token = jwt.sign({_id: user._id} , process.env.JWT_SIGNIN_KEY, {expiresIn: '30d'});
                        const {_id, firstName, lastName, email, image} = user;

                        res.json({
                            token,
                            user: {_id, firstName, lastName, email, image}
                        })
                    }
                    else{ //user signed in for the first time 
                        console.log('image: ' + image);
                        let newUser = new User({ firstName: given_name, lastName: family_name, email, image:  image || '' });
                        console.log('news user:');
                        console.log(newUser);

                        newUser.save((err, data) => {
                            if(err){
                                const error = new Error('Something went wrong, please try again.');
                                error.code = 500;
                                return next(error);
                            }
                            else{
                                const token = jwt.sign({_id: data._id} , process.env.JWT_SIGNIN_KEY, {expiresIn: '30d'});
                                const {_id, firstName, lastName, email, image} = data;
        
                                res.json({
                                    token,
                                    user: {_id, firstName, lastName, email, image}
                                })

                            }
                        });

                        


                    }
                }
            
            })
        }
    })
}

const facebookLogin = async(req, res, next) => {
    const { tokenId, email, firstName, lastName, image} = req.body;
    let clientId = "1014010535828887";
    let clientSecret = "93d15093bfdb9a884d7cc3fb38ce49a9";

    User.findOne({email}).exec((err, user) => { //check if the user signed in before
        if(err){
            const error = new Error('Something went wrong, please try again');
            error.code = 400;
            return next(error);
        }
        else{
            if(user){ //user already exists
                const token = jwt.sign({_id: user._id} , process.env.JWT_SIGNIN_KEY, {expiresIn: '30d'});
                const {_id, firstName, lastName, email, image} = user;

                res.json({
                    token,
                    user: {_id, firstName, lastName, email, image}
                })
            }
            else{ //user signed in for the first time 
                // console.log('image: ' + image);
                let newUser = new User({ firstName, lastName, email, image });

                newUser.save((err, data) => {
                    if(err){
                        const error = new Error('Something went wrong, please try again.');
                        error.code = 500;
                        return next(error);
                    }
                    else{
                        const token = jwt.sign({_id: data._id} , process.env.JWT_SIGNIN_KEY, {expiresIn: '30d'});
                        const {_id, firstName, lastName, email, image} = data;

                        res.json({
                            token,
                            user: {_id, firstName, lastName, email, image}
                        })
                    }
                });
            }
        }
    })
 
    
    


}



module.exports = { 
    getAllUsers,
    createUser,
    googleLogin,
    facebookLogin
}