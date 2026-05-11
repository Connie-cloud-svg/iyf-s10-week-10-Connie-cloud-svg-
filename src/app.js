const express = require('express');
const logger = require('./middleware/logger');
const fileLogger = require('./middleware/fileLogger'); 
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);
app.use(fileLogger);

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler (LAST!)
app.use(errorHandler);

module.exports = app;