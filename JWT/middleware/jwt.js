const jwt = require('jsonwebtoken');
const { isJWT } = require('validator');
const { configDotenv } = require('dotenv');
const { Email } = require('../model');
const { createTransport } = require('nodemailer');

configDotenv();

const validateAccess = async (req, res, next) => {
    const authorization = req.get('authorization').split(' ')[1]; // Bearer {token}
    if (!authorization || !isJWT(authorization)) {
        return res.status(401).json({
            "error": "JWT 유효성 검증 실패"
        })
    }

    req.payload = jwt.verify(authorization,
        process.env.SECRET_KEY,
        {
            algorithms: 'HS256',
        })

    next();
}

const validateWitMail = async (req, res) => {

    const emailId = process.env.EMAIL_ID
    const emailPw = process.env.EMAIL_PW

    const { email } = req.body;

    const transport = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailId,
            pass: emailPw,
        }
    })

    try {
        const random = String(Math.floor(Math.random() * 999999)).padStart(6, 0);

        await Email.create({
            email,
            key: random
        })

        await transport.sendMail({
            from: emailId,
            to: email,
            subject: '인증 메일입니다.',
            text: `인증번호는 ${random}`
        })

        return res.status(200).json({
            message: "인증이 메일이 발송되었습니다."
        })
    } catch (e) {
        console.error(e)
        return e;
    }
}

module.exports = { validateAccess, validateWitMail };