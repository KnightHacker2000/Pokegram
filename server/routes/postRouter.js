const { Router } = require('express');

const postRouter = Router();
const postController = require('../controllers/postController');

postRouter.get('/:postId', postController.getPostByPostId);
postRouter.get('/user/:username', postController.getPostByUsername);
// postRouter.post('/', postController.createNewAct);
// postRouter.put('/:actId', postController.updateActivityById);
// postRouter.delete('/:actId', postController.deleteActivityById);

module.exports = postRouter;
