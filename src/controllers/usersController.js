const store = require('../data/store');

// Simple email validator
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
    getAllUsers,
    getUserById,
    createUser
};