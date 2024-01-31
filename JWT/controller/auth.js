const { User } = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const thisUser = await User.findOne({ where: { email } })
        if (!thisUser) return res.status(404).json({
            "error": "로그인 안됨"
        })

        if (!bcrypt.compareSync(password, thisUser.password)) return res.status(409).json({
            "error": "인증안됨"
        })

        return res.status(201).json({ accesstoken: await generateAccessToken(thisUser.userId) });
    } catch (e) {
        console.error(e);
        return e;
    }
}

const generateAccessToken = (id) => {

    const AccessToken = jwt.sign({
        id
    }, process.env.SECRET_KEY,
        {
            algorithm: 'HS256',
            expiresIn: '10m',
        }
    )

    return AccessToken;
}

module.exports = { signIn, generateAccessToken };