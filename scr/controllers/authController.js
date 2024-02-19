const router = require('express').Router();
const authService = require("../services/authService")
const { isAuth } = require('../middleware/authMiddleware')
const { getErrorMessage } = require('../utils/errorHandles')
router.get('/register', (req, res) => {
    if (!req.user) {
        res.render('register');
    } else {
        res.redirect("/404")
    }


})

router.post('/register', async (req, res) => {
    let message = ""
    const userData = req.body
    try {
        await authService.register(userData)

        const { email, password } = userData
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        req.user = email
        res.redirect("/")


    } catch (err) {

        message = getErrorMessage(err)

        res.render('register', { userData, message });
    }



});



router.get('/login', (req, res) => {
    if (!req.user) {
        res.render('login')
    } else {
        res.redirect("/404")
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        req.user = email
        res.redirect("/")
    } catch (err) {
        res.render('login', { message: err.message, email });

    }

});


router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router