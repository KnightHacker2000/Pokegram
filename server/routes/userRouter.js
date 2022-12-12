const { Router } = require('express');
const auth = require('../middleware/auth');

const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/:uid', auth, userController.getUserById);
userRouter.get('/:uid', auth, userController.getUserById);
userRouter.get('/FoSug/:uid', auth, userController.getFoSug);
userRouter.post('/', userController.createNewUser);
userRouter.put('/:uid', auth, userController.updateUserById);

module.exports = userRouter;
