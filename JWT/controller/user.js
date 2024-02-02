const validator = require('validator');
const { User, Email } = require('../model');
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

const validate = async (req, res) => {
    try {
        const { verify, email } = req.body;

        const thisVerify = await Email.findOne({ where: { email } });
        if (!thisVerify || !verify) {
            return res.status(404).json({
                "error": "인증코드없음"
            })
        }
        if (thisVerify.key != verify) {
            return res.status(409).json({
                "error": "인증코드 불일치"
            })
        }

        await thisVerify.update({
            key: "true"
        })

        return res.status(200).json({
            message: "인증이 완료되었습니다."
        })
    } catch (e) {
        console.error(e);
        return e;
    }
}

const mypage = async (req, res) => {
    try {
        const { id } = req.payload;

        const thisUser = await User.findOne({ where: { userId: id } });

        if (!thisUser) {
            return res.status(404).json({
                "error": "정보 찾을 수 없음"
            });
        }

        return res.status(200).json({
            name: thisUser.name,
            email: thisUser.email,
            birth: thisUser.birth,
        });
    } catch (e) {
        console.error(e);
        return e;
    }
}

const info = async (req, res) => {
    try {
        const { id } = req.payload;
        const { name, birth } = req.body;

        const thisUser = await User.findOne({ where: { userId: id } })

        if (!thisUser) {
            return res.status(404).json({
                "error": "404에러남",
            })
        }

        const update = await thisUser.update({
            name,
            birth
        })

        return res.status(200).json({
            user: update,
        })

    } catch (e) {
        console.error(e);
        return e;
    }
}

const password = async (req, res) => {
    try {
        const { id } = req.payload;
        // const { password } = req.body;
        const { newPassword } = req.body;

        const thisUser = await User.findOne({ where: { userId: id } })

        // 현재 비밀번호 확인
        // if (!await bcrypt.compare(password, thisUser.password)) {
        //     return res.status(409).json({
        //         "error": "409에러남 비밀번호 확인",
        //     })
        // }

        const hashed = await bcrypt.hash(newPassword, 10);

        await thisUser.update({
            password: hashed
        })

        return res.status(200).json({
            "sucess": "비밀번호가 변경되었습니다.",
        })
    } catch (e) {
        console.error(e);
        return e;
    }
}

const delacc = async (req, res) => {
    try {
        const { id } = req.payload;
        const { password } = req.body;

        const thisUser = await User.findOne({ where: { userId: id } })

        if (!await bcrypt.compare(password, thisUser.password)) {
            return res.status(409).json({
                "error": "409에러남 비밀번호 확인",
            })
        }

        await thisUser.destroy();

        return res.status(204).json()

    } catch (e) {
        console.error(e);
        return e;
    }
}

module.exports = { signUp, mypage, info, password, delacc, validate };