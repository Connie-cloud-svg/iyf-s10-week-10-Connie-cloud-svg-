const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Custom error class
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// ==========================================
// ROUTES THAT MIGHT THROW ERRORS
// ==========================================

// Route that deliberately throws
app.get('/api/error-test', (req, res, next) => {
    try {
        throw new ApiError('Something went wrong', 500);
    } catch (error) {
        next(error);  // Pass to error handler
    }
});

// Simulate database failure
app.get('/api/users', (req, res, next) => {
    try {
        // Pretend database is down
        throw new ApiError('Database connection failed', 503);
    } catch (error) {
        next(error);
    }
});

// Async route with error
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/async-test', asyncHandler(async (req, res) => {
    // Simulate async failure
    await new Promise((resolve, reject) => {
        setTimeout(() => reject(new ApiError('Async operation failed', 500)), 100);
    });
    res.json({ message: 'This never runs' });
}));

// Validation error example
app.post('/api/data', (req, res, next) => {
    try {
        const { name, age } = req.body;
        
        if (!name || name.length < 3) {
            throw new ApiError('Name must be at least 3 characters', 400);
        }
        
        if (!age || age < 0) {
            throw new ApiError('Age must be a positive number', 400);
        }
        
        res.json({ message: 'Data valid!', name, age });
    } catch (error) {
        next(error);
    }
});

// ==========================================
// ERROR HANDLING MIDDLEWARE (MUST BE LAST!)
// ==========================================
app.use((err, req, res, next) => {
    console.error('💥 ERROR:', err.message);
    console.error('Stack:', err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        error: {
            message,
            status: statusCode,
            // Only show stack in development
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

// 404 handler (before error handler, after routes)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});