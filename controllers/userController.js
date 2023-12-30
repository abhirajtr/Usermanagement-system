const User = require('../models/userModel');
const generateOtp = require('../config/otpConfig');

const dashboard = (req, res) => {
    // res.json(req.session.user);
    // res.json(req.session.user);
    const user = req.session.user
    res.render('user-dashboard', {user: user});
}
const signinGet = (req, res) => {
    // console.log(req.session.user);
    if(req.session.user) return res.redirect('/'); 
    res.render('user-signin'); 
}
const signinPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email: email , isAdmin:false});
        if (foundUser) {
            const passwordMatches = await foundUser.comparePassword(password);
            if (passwordMatches) {
                req.session.user = {
                    email: foundUser.email,
                    username: foundUser.username
                }
                return res.redirect('/');
            }
            else return res.json("Incorrect password please try again")
        }
        res.json("User not found!")
    } catch (err) {

    }

}
const signupGet = (req, res) => {
    res.render('user-signup');
}
const signupPost = async (req, res) => {
    res.render('user-signup');
    try {
        const { username, email, password } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            const otp = generateOtp();
            console.log(otp);
            const user = new User({
                username: username,
                email: email,
                password: password
            });
            const newUser = await user.save();
        }
    } catch (err) {

    }
}

const signout = (req, res) => {
    req.session.destroy((err) => {
        if(!err) {
            return res.redirect('/signin');
        }
        res.json('error in session destroy');
    })
}

module.exports = {
    signinGet,
    signupGet,
    signupPost,
    signinPost,
    dashboard,
    signout,
}