const User = require('../models/user');

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
        createdAt: new Date(),
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

module.exports = { 
    getAllUsers,
    createUser,
}