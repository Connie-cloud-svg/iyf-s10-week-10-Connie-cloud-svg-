const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const fileLogger = (req, res, next) => {
    const startTime = Date.now();
    
    // Log when request starts
    const timestamp = new Date().toISOString();
    const startLog = `[${timestamp}] START ${req.method} ${req.url}\n`;
    
    // Write to file (append mode)
    fs.appendFileSync(path.join(logsDir, 'requests.log'), startLog);
    
    // Capture when response finishes
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const endTimestamp = new Date().toISOString();
        const statusCode = res.statusCode;
        
        const endLog = `[${endTimestamp}] END ${req.method} ${req.url} - ${statusCode} (${duration}ms)\n`;
        
        fs.appendFileSync(path.join(logsDir, 'requests.log'), endLog);
    });
    
    next();
};

module.exports = fileLogger;