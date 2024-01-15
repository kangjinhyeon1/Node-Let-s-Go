const { write } = require('../model');

const getList = async (req, res) => {
    const list = await write.findAll();

    return res.status(200).json({
        "data": list
    })
}

const create = async (req, res) => {
    const { user, head, body } = req.body;

    const data = await write.create({
        user,
        head,
        body
    })

    return res.status(201).json({
        data
    })
}

const getOne = async (req, res) => {
    const { id } = req.params;

    const data = await write.findOne({
        where: { writeId: id }
    })

    return res.status(200).json({
        data
    })
}

const putOne = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    const thisBoard = await write.findOne({
        where: { writeId: id }
    })

    if (!thisBoard) return res.status(404).json({ "res": "에러남" })

    const data = await thisBoard.update({
        body
    })

    return res.status(200).json({
        data
    })
}

const patchOne = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    const thisBoard = await write.findOne({
        where: { writeId: id }
    })

    if (!thisBoard) user = thisBoard.user
    if (!thisBoard) head = thisBoard.head
    if (!thisBoard) body = thisBoard.body

    const data = await thisBoard.update({
        body,
        head,
        user,
    })

    return res.status(200).json({
        data
    })
}

const deleteOne = async (req, res) => {
    const { id } = req.params;

    const thisBoard = await write.findOne({
        where: { writeId: id }
    })

    if (!thisBoard) return res.status(404).json({ "res": "없음" });

    await thisBoard.destroy();

    return res.status(204).json({})
}

module.exports = {
    getList,
    create,
    getOne,
    putOne,
    patchOne,
    deleteOne,
}