const express = require('express');
const app = express();
const PORT = 3000;

// Built-in middleware: parse JSON bodies
app.use(express.json());

// ==========================================
// CUSTOM LOGGER MIDDLEWARE
// Runs on EVERY request
// ==========================================
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();  // ← CRITICAL! Passes control to the next middleware/route
};

app.use(logger);

// ==========================================
// REQUEST TIME MIDDLEWARE
// Adds a property to req for later use
// ==========================================
const addRequestTime = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
};

app.use(addRequestTime);

// ==========================================
// ROUTE-SPECIFIC AUTH MIDDLEWARE
// Only applies where attached
// ==========================================
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }
    
    // In a real app, you'd verify a JWT token here
    req.user = { name: 'Authenticated User' }; // Attach user to request
    next();
};

// ==========================================
// ROUTES
// ==========================================

// Public route — no auth needed
app.get('/', (req, res) => {
    res.send('Welcome! No auth needed here.');
});

// Uses requestTime middleware data
app.get('/api/time', (req, res) => {
    res.json({ requestTime: req.requestTime });
});

// Protected route — auth required!
app.get('/api/protected', requireAuth, (req, res) => {
    res.json({ 
        message: 'Secret data!',
        user: req.user 
    });
});

// Another protected route
app.get('/api/admin/dashboard', requireAuth, (req, res) => {
    res.json({ message: 'Admin dashboard data' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});