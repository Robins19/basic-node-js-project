const jwt = require('jsonwebtoken');
const User = require('../models/user');
const expressJwt = require('express-jwt');
exports.signup = async (req, res) => {
    console.log("rew",req.body);
    const userExists = await User.findOne({ email: req.body.email });
    console.log(userExists)
    if (userExists)
        return res.status(403).json({
            error: 'Email is taken!'
        });
    const user = await new User(req.body);
    console.log(user)
    await user.save();
    res.render('views/layout');
    res.status(200).json({ message: 'Signup success! Please login.' });
};



// sigin 

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        console.log(user,"user data")
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // retrun response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};



exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['RS256'],
    userProperty: 'auth'
});










