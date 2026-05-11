const express = require('express');
const app = express();
const PORT = 3000;

//Send plain response
app.get('/', (req, res) => {
    res.send('Plain text response');
});

//Send JSON
app.get('/json', (req, res) => {
    res.json({ message: 'JSON response', success: true });
});

//Send with error status
app.get('/error', (req, res) => {
    res.status(400).json({ error: 'Bad request'});
});

// Redirect
app.get('/old-page', (req, res) => {
    res.redirect('/new-page');
});

app.get('/new-page', (req, res) => {
    res.send('This is the new page!');
});

// ROUTE PARAMETERS — dynamic URLs!
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Getting user ${userId}` });
});

// Multiple parameters
app.get('/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    res.json({ postId, commentId });
});

// QUERY STRINGS — data in the URL after ?
// Example: /search?q=hello&limit=10
app.get('/search', (req, res) => {
    const { q, limit = 10, page = 1 } = req.query;
    
    res.json({
        query: q,
        limit: parseInt(limit),
        page: parseInt(page)
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

