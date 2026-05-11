const express = require('express');
const app = express();
const PORT = 3000;

//Middleware to pass JSON bodies
app.use(express.json());

//In-memory database
let posts = [
    {
        id: 1,
        title: "Getting started with Node.js",
        content: "Node.js is a JavaScript runtime...",
        author: "Livia Mwendwa",
        createdAt: "2026-01-15T10:00:00Z",
        likes: 10
    },
    {
        id: 2,
        title: "Express.js Fundamentals",
        content: "Express is a wb framework...",
        author: "Louis Dante",
        createdAt: "2026-01-16T14:30:00Z",
        likes: 10
    }
];

let nextId = 3;

// ==========================================
// READ all posts (with filtering & sorting)
// ==========================================
app.get('/api/posts', (req, res) => {
    const {author, sort } = req.query;

    let result = [...posts];
    //Filter by author
    if(author) {
        result = result.filter(post => post.author.toLowerCase().includes(author.toLowerCase()));
    }

    if (sort === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'popular') {
        result.sort((a,b) => b.likes - a.likes);
    }

    res.json(result);
});       

// ==========================================
// READ single post
// ==========================================
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const post =posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
});

// ==========================================
// CREATE new post
// ==========================================
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;

    //Validation 
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content and author are required'});
    }
     const newPost = {
        id: nextId++,
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        likes: 0
    };
    posts.push(newPost);
    res.status(201).json(newPost); // 201 = Created
});

// ==========================================
// UPDATE post (full replacement)
// ==========================================
app.put('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    const { title, content } = req.body;
    
    posts[postIndex] = {
        ...posts[postIndex],        // Keep existing fields (spread operator!)
        title: title || posts[postIndex].title,   // Update if provided, else keep old
        content: content || posts[postIndex].content,
        updatedAt: new Date().toISOString()
    };
    
    res.json(posts[postIndex]);
});

// ==========================================
// DELETE post
// ==========================================
app.delete('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    posts.splice(postIndex, 1);    // Remove 1 item at index
    res.status(204).send();         // 204 = No Content (success, but nothing to return)
});

// ==========================================
// PATCH like a post
// ==========================================
app.patch('/api/posts/:id/like', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    post.likes++;
    res.json(post);
});

// 404 fallback
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});