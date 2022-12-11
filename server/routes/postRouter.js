const { Router } = require('express');
const auth = require('../middleware/auth');

const postRouter = Router();
const postController = require('../controllers/postController');

postRouter.get('/:postId', auth, postController.getPostByPostId);
postRouter.get('/user/:username', auth, postController.getPostByUsername);
postRouter.get('/all/:postId', auth, postController.getAllPosts);
postRouter.post('/', auth, postController.createNewPost);
postRouter.put('/:postId', auth, postController.updatePostById);
postRouter.delete('/:postId', auth, postController.deletePostById);

module.exports = postRouter;
