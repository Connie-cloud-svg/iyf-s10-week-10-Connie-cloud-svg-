const fs = require('fs');
const path = require('path');

// Read hello.js synchronously
const content = fs.readFileSync('hello.js', 'utf-8');
console.log("--- File contents ---");
console.log(content);

// Write a new file
fs.writeFileSync('output.txt', 'Hello, World!');
console.log("--- output.txt created ---");

// Path utilities
console.log("Joined path:", path.join(__dirname, 'files', 'data.json'));
console.log("Extension of photo.jpg:", path.extname('photo.jpg'));