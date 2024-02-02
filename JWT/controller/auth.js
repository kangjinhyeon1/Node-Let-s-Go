const { User } = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { redisCli } = require('../redis');

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

        const accesstoken = await generateAccessToken(thisUser.userId, true);
        const refreshtoken = await generateAccessToken(Date.now(), false)

        await redisCli.set(thisUser.userId, accesstoken);
        await redisCli.set(refreshtoken, thisUser.userId);

        return res.status(201).json({
            id: thisUser.userId,
            accesstoken,
            refreshtoken,
        });
    } catch (e) {
        console.error(e);
        return e;
    }
}

const generateAccessToken = (id, isAccess) => {

    const AccessToken = jwt.sign({
        id
    }, process.env.SECRET_KEY,
        {
            algorithm: 'HS256',
            expiresIn: isAccess ? '1m' : '3m',
        }
    )

    return AccessToken;
}

const refresh = async (req, res) => {
    const token = req.get('authorization').split(' ')[1]

    if (!req.payload) {
        return res.status(400).json({
            error: "토큰 X"
        })
    }

    await redisCli.get(token, async (err, value) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err
            })
        }
        const accesstoken = await generateAccessToken(value, true)
        redisCli.set(value, accesstoken)

        return res.status(200).json({
            id: value,
            accesstoken
        })
    });
}

module.exports = { signIn, generateAccessToken, refresh };