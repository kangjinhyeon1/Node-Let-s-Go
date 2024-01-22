const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isJWT } = require('validator');
const { configDotenv } = require('dotenv');

configDotenv();

const validatorAccess = async (req, res, next) => {
    const authorization = req.header.authorization?.split(' ')[1];
    if (!authorization || !isJWT(authorization)) {
        return res.status(401).json({
            "error": "에러남"
        })
    }

    const salt = bcrypt.genSaltSync(Number(process.env.SECRET_KEY));

    req.payload = jwt.verify(authorization,
        salt,
        {
            algorithms: 'SHA256',
            complete: true
        }
    )

    next();
}

module.exports = validatorAccess;