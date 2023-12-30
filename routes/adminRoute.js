const {Router} = require('express');
const router = Router();
const adminController = require('../controllers/adminController');
const isAuthenticated = require('../middleware/adminAuthenticate');

// router.use(isAuthenticated)      
function isAuth(req, res, next) {

    if(!req.session.admin) return res.redirect('/admin/signin')
    next();
}

router.get('/',adminController.auth, adminController.dashboard);
router.get('/signin', adminController.signinGet);
router.post('/signin', adminController.signinPost);
router.get('/editUser', adminController.editUserGet);
router.post('/editUser', adminController.editUserPost);
router.delete('/deleteUser', adminController.deleteUser);
router.get('/searchUser', adminController.searchUser);
router.get('/signout', adminController.signout);



module.exports = router;