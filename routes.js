
const router = require('express').Router();

const homeController = require('./scr/controllers/homeController')
const authController = require('./scr/controllers/authController')



router.use(homeController)
router.use("/auth", authController)

router.get('/*', (req, res) => {
    res.render("404");
});
module.exports = router