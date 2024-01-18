const validator = require('validator');
const { User } = require('../model');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    const { name, email, birth, password } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(406).json({ "error": "406 에러남" })
    }

    if (!validator.isDate(birth, {
        format: "yyyy-MM-dd"
    })) {
        return res.status(406).json({ "error": "406 에러남" })
    }

    if (await User.findOne({ where: { email } })) {
        return res.status(409).json({ "error": "409 에러남" })
    }

    const birthDate = new Date(birth).toISOString();
    const hash = bcrypt.hashSync(password, 10);

    User.create({
        name,
        email,
        birth: birthDate,
        password: hash
    })

    return res.status(201).json({
        data: null,
        status: 201,
        statusMsg: "회원가입 완료"
    })
}

module.exports = { signUp };