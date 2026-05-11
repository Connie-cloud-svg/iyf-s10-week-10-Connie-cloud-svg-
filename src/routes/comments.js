const express = require('express');
const router = express.Router({ mergeParams: true });  // ← CRITICAL! Gets :id from parent
const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.getPostComments);
router.post('/', commentsController.createComment);
router.delete('/:commentId', commentsController.deleteComment);

module.exports = router;