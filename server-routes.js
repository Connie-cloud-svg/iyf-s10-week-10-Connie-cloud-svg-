const express = require('express');
const app = express;
const PORT = 3000;

//Home route
app.get('/', (req, res) => {
    res.send('Welcome to AlumniHub API ');
});

app.get('/about', (req, res) => {
    res.send('AlumniHub - An alumni platform');
});

// API health check — returns JSON!
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
    });
});

// 404 handler — catches everything else (MUST be last!)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
