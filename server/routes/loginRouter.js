const { Router } = require('express');

const loginRouter = Router();
const loginController = require('../controllers/loginController');

loginRouter.post('/', loginController.authAndSession);
loginRouter.delete('/:id', loginController.deleteSessionById);
loginRouter.delete('/', loginController.clearSessions);

module.exports = loginRouter;
