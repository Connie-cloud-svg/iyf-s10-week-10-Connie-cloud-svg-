const store = require('../data/store');

// GET /api/posts/:id/comments
const getPostComments = (req, res) => {
    const postId = parseInt(req.params.id);
    
    // Verify post exists first
    const post = store.posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    const postComments = store.comments.filter(c => c.postId === postId);
    res.json(postComments);
};

// POST /api/posts/:id/comments
const createComment = (req, res) => {
    const postId = parseInt(req.params.id);
    const { author, content } = req.body;
    
    // Verify post exists
    const post = store.posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    // Validation
    const errors = [];
    if (!author || author.length < 2) {
        errors.push('Author must be at least 2 characters');
    }
    if (!content || content.length < 5) {
        errors.push('Content must be at least 5 characters');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    const newComment = {
        id: store.nextCommentId++,
        postId,
        author,
        content,
        createdAt: new Date().toISOString()
    };
    
    store.comments.push(newComment);
    res.status(201).json(newComment);
};

// DELETE /api/posts/:id/comments/:commentId
const deleteComment = (req, res) => {
    const postId = parseInt(req.params.id);
    const commentId = parseInt(req.params.commentId);
    
    // Verify post exists
    const post = store.posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    // Find comment that belongs to this post
    const commentIndex = store.comments.findIndex(
        c => c.id === commentId && c.postId === postId
    );
    
    if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found on this post' });
    }
    
    store.comments.splice(commentIndex, 1);
    res.status(204).send();
};

module.exports = {
    getPostComments,
    createComment,
    deleteComment
};