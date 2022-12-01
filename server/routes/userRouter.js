const { Router } = require('express');

const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/:uid', userController.getUserById);
userRouter.post('/', userController.createNewUser);
userRouter.put('/:uid', userController.updateUserById);

module.exports = userRouter;
