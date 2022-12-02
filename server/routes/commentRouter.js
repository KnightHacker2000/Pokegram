const { Router } = require('express');

const commentRouter = Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/:id', commentController.getCommentById);
commentRouter.get('/post/:postid', commentController.getCommentByPostId);
commentRouter.post('/', commentController.createComment);
commentRouter.put('/:id', commentController.updateCommentById);
commentRouter.delete('/:id', commentController.deleteCommentById);

module.exports = commentRouter;
