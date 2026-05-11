const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const commentsRoutes = require('./comments');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);
router.patch('/:id/like', postsController.likePost);
router.use('/:id/comments', commentsRoutes);

module.exports = router;