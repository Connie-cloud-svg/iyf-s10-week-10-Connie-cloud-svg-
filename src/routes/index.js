const express = require('express');
const router = express.Router();

const postsRoutes = require('./posts');

router.use('/posts', postsRoutes);

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;