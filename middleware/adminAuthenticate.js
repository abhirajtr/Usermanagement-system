const isAuthenticated = (req, res, next) => {
    console.log(req.path);
    if(req.path == '/admin/signin') return next();
    if(req.session.admin) return next();
    else res.redirect('/admin/signin');
}


module.exports = isAuthenticated;