const catchError = require('../utils/catchError');
const User = require('../models/User');

//To bring all users
const getAll = catchError(async(req, res) => {
    const result = await User.findAll()
    return res.json(result)
});
//To create a user
const create = catchError(async(req, res) => {
    const result = await User.create(req.body)
    return res.status(201).json(result)
});
//To bring a user according to their id
const getOne = catchError(async(req, res) => {
    const { id } = req.params
    const result = await User.findByPk(id)
    //In case you can't find it in ID and give a message
    if (!result) return res.status(404).json({ message: "ID Not Found"})
    return res.json(result)
});
//To delete a user according to their id
const destroyy = catchError(async(req, res) => {
    const { id } = req.params
    const result = await User.destroy({ where: { id }})
    if (!result) return res.status(404).json({ message: "Error deleting user"})
    return res.sendStatus(204)
});
//To update a user based on their id
const update = catchError(async(req, res) => {
    const { id } = req.params
    const result = await User.update(
        req.body,
        { where: { id }, returning: true}
    )
    if (result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
});

module.exports = {
    getAll,
    create,
    getOne,
    destroyy,
    update
}