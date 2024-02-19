const jwt = require('jsonwebtoken');
const util = require('util');


exports.verify = util.promisify(jwt.verify)

exports.sign = util.promisify(jwt.sign)
