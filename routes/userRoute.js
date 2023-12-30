const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.get('/',authenticate, userController.dashboard);
router.get('/signin', userController.signinGet);
router.post('/signin', userController.signinPost);
router.get('/signup', userController.signupGet);
router.post('/signup', userController.signupPost);
router.get('/signout', userController.signout);

function authenticate(req, res, next){
    if(req.session.user) {
        return next();
    } else {
        return res.redirect('/signin');
    }
}

module.exports = router;