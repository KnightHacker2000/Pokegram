const { Router } = require('express');

const activityRouter = Router();
const activityController = require('../controllers/activityController');

activityRouter.get('/:targetId', activityController.getActByTarget);
activityRouter.post('/', activityController.createNewAct);
activityRouter.put('/:actId', activityController.updateActivityById);
activityRouter.delete('/:actId', activityController.deleteActivityById);

module.exports = activityRouter;
