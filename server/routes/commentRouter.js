const { Router } = require('express');
const auth = require('../middleware/auth');

const commentRouter = Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/:id', auth, commentController.getCommentById);
commentRouter.get('/post/:postid', auth, commentController.getCommentByPostId);
commentRouter.post('/', auth, commentController.createComment);
commentRouter.put('/:id', auth, commentController.updateCommentById);
commentRouter.delete('/:id', auth, commentController.deleteCommentById);

module.exports = commentRouter;
