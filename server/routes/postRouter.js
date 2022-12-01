const { Router } = require('express');

const postRouter = Router();
const postController = require('../controllers/postController');

postRouter.get('/:postId', postController.getPostByPostId);
postRouter.get('/user/:username', postController.getPostByUsername);
postRouter.get('/all/:postId', postController.getAllPosts);
postRouter.post('/', postController.createNewPost);
postRouter.put('/:postId', postController.updatePostById);
postRouter.delete('/:postId', postController.deletePostById);

module.exports = postRouter;
