const jwt = require('../lib/jwt');
const { SECRET } = require('../config/secret');
exports.auth = async (req, res, next) => {
    // works now

    const token = req.cookies["auth"];

    if (!token) {

        return next()
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET)

        req.user = decodedToken
        res.locals.isAuthenticated = true

        next()
    } catch {
        res.clearCookie("auth")
        return res.redirect("/auth/login")

    }

};

exports.isAuth = (req, res, next) => {
    const user = req.user
    if (!user) {
        res.redirect("/auth/login")
    }
    next()
};


