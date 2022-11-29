const { Router } = require('express');

const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/:targetId', userController.getActByTarget);
userRouter.post('/', userController.createNewAct);
userRouter.put('/:actId', userController.updateActivityById);
userRouter.delete('/:actId', userController.deleteActivityById);

module.exports = userRouter;
