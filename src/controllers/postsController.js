const store = require('../data/store');

const getAllPosts = (req, res) => {
    const { author, search, sort, page = 1, limit = 10 } = req.query;
    
    let result = [...store.posts];
    
    // Filter by author (partial match, case-insensitive)
    if (author) {
        result = result.filter(post => 
            post.author.toLowerCase().includes(author.toLowerCase())
        );
    }
    
    // Search in title (partial match, case-insensitive)
    if (search) {
        result = result.filter(post => 
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Sort
    if (sort === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'popular') {
        result.sort((a, b) => b.likes - a.likes);
    } else if (sort === 'oldest') {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedResults = result.slice(startIndex, endIndex);
    
    // Response with metadata
    res.json({
        data: paginatedResults,
        pagination: {
            total: result.length,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(result.length / limitNum)
        }
    });
};

const getPostById = (req, res) => {
    const post = store.posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
};

const createPost = (req, res) => {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are required' });
    }
    
    const newPost = {
        id: store.nextId++,
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        likes: 0
    };
    
    store.posts.push(newPost);
    res.status(201).json(newPost);
};

const updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    const { title, content } = req.body;
    store.posts[postIndex] = {
        ...store.posts[postIndex],
        title: title || store.posts[postIndex].title,
        content: content || store.posts[postIndex].content,
        updatedAt: new Date().toISOString()
    };
    
    res.json(store.posts[postIndex]);
};

const deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    store.posts.splice(postIndex, 1);
    res.status(204).send();
};

const likePost = (req, res) => {
    const id = parseInt(req.params.id);
    const post = store.posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    post.likes++;
    res.json(post);
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const getAllUsers = (req, res) => {
    res.json(store.users);
};

const getUserById = (req, res) => {
    const user = store.users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
};

const createUser = (req, res) => {
    const { name, email } = req.body;
    
    // Validation
    const errors = [];
    
    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if (!email) {
        errors.push('Email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Email format is invalid (must be like name@domain.com)');
    }
    
    // Check for duplicate email
    const existingUser = store.users.find(u => u.email.toLowerCase() === email?.toLowerCase());
    if (existingUser) {
        errors.push('Email already registered');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    const newUser = {
        id: store.nextUserId++,
        name,
        email,
        createdAt: new Date().toISOString()
    };
    
    store.users.push(newUser);
    res.status(201).json(newUser);
};


module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getAllUsers,
    getUserById,
    createUser
};