const { Router } = require('express');
const auth = require('../middleware/auth');

const activityRouter = Router();
const activityController = require('../controllers/activityController');

activityRouter.get('/:targetId', auth, activityController.getActByTarget);
activityRouter.post('/', auth, activityController.createNewAct);
activityRouter.put('/:actId', auth, activityController.updateActivityById);
activityRouter.delete('/:actId', auth, activityController.deleteActivityById);

module.exports = activityRouter;
