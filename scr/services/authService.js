const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("../lib/jwt")

const { SECRET } = require('../config/secret');

exports.register = async (userData) => {
    if (!userData.email) {
        throw new Error("Email is required")
    }



    const user = await User.findOne({ email: userData.email })

    if (user) {
        throw new Error(`User already exists`);
    }
    if (!userData.password) {
        throw new Error(`Password is required`);
    }

    if (userData.password.length < 4) {
        throw new Error("The password is required and should be at least 4 characters long.")
    }

    if (userData.password !== userData.rePassword) {
        throw new Error("The repeat password is required and should be equal to the password.");
    }

    const hash = await bcrypt.hash(userData.password, 12)

    userData.password = hash





    await User.create(userData)

}

exports.login = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Username or password,is incorrect')
    }
    if (email.length < 10) {
        throw new Error("The email is required and should be at least 10 characters long.")
    }

    let isValid1 = bcrypt.compare(password, user.password)

    let isValid = ""
    if (user.password === password) {
        isValid = true
    } else if (isValid1) {
        isValid = true

    }


    if (!isValid) {

        throw new Error('Username or password,is incorrect')
    }
    if (password.length < 4) {
        throw new Error("The password is required and should be at least 4 characters long.")
    }

    const loggedUser = {
        _id: user.id,
        email: user.email,
    }

    const token = await jwt.sign(loggedUser, SECRET, { expiresIn: "2h" })

    return token;
}


