const { getAll, create, getOne, update, destroyy } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

//Static Routes
userRouter.route("/")
		.get(getAll)
		.post(create)

//Dynamic Routes
userRouter.route('/:id')
       .get(getOne)
	   .delete(destroyy)
	   .put(update)

module.exports = userRouter;