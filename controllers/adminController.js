const Admin = require('../models/userModel');
// const isAuthenticated = (req, res, next) => {
//     console.log("Hello");
//     if(req.path == '/admin/signin') return next();
//     if(req.session.admin) return next();
//     else res.redirect('/admin/signin');
// }
function auth(req, res, next) {
    if(req.session.admin) return next();
    res.redirect('/admin/signin');
}

const dashboard = async (req, res) => {
    const admin = req.session.admin;
    try {
        const foundUsers = await Admin.find({ isAdmin: false }, { password: 0 });
        res.render('admin-dashboard', { admin: req.session.admin, users: foundUsers });
    } catch (err) {
        res.json("Internal server error");
    }


}
const signinGet = (req, res) => {
    if (req.session.admin) return res.redirect('/admin');
    res.render('admin-signin');
}

const signinPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundAdmin = await Admin.findOne({ email: email, isAdmin: true });
        if (foundAdmin) {
            const passwordMatches = await foundAdmin.comparePassword(password);
            if (passwordMatches) {
                //    return res.json("login success");
                req.session.admin = {
                    username: foundAdmin.username,
                    email: foundAdmin.email
                } 
                return res.redirect('/admin');
            }
            res.json("Invalid password!");
        } else {
            res.json("admin not found!");
        }
    } catch (err) {
        res.json("Internal server error");
    }
}

const editUserGet = async (req, res) => { 
    const userId = req.query.id;
    try {
        // return res.json(userId);
        const editUser = await Admin.findOne({ _id: userId });
        res.render('admin-editUser', { user: editUser });
    } catch (err) {
        console.log(err);
    }
}
const editUserPost = async (req, res) => {
    const { username, email } = req.body;
    const userId = req.query.id;
    try {
        const updateUser = await Admin.findOneAndUpdate({ _id: userId }, { username: username, email: email });
        if (updateUser) return res.redirect('/admin')
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = (req, res) => {
    res.json("delete user route invoked!")
}

const searchUser = async (req, res) => {
    const searchVal = req.query.email;
    const foundusers = await Admin.find({ email: { $regex: new RegExp(`${searchVal}`, 'i') } });
    foundusers.searchVal = req.query.email;
    console.log(foundusers);
    if (foundusers) {
        return res.render('admin-dashboard', { admin: req.session.admin, users: foundusers })
    }
    res.json(`Search User ${foundusers}`);
}
const signout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) return res.redirect('/admin/signin');
        res.json("Failed to destroy session");
    })
}

module.exports = {
    signinGet,
    signinPost,
    dashboard,
    editUserGet,
    editUserPost,
    deleteUser,
    searchUser,
    signout,
    auth,
}