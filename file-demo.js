// fs = File System — for reading/writing files
const fs = require('fs');

// Read file SYNCHRONOUSLY (blocks everything until done)
console.log("--- Reading synchronously ---");
const content = fs.readFileSync('hello.js', 'utf-8');
console.log("File content length:", content.length, "characters");

// Read file ASYNCHRONOUSLY (preferred — doesn't block)
console.log("\n--- Reading asynchronously ---");
fs.readFile('hello.js', 'utf-8', (err, data) => {
    if (err) {
        console.error("Error:", err);
        return;
    }
    console.log("Async read successful! Length:", data.length);
});

console.log("This prints BEFORE the async read finishes!");

// Write a file
fs.writeFileSync('output.txt', 'Hello, World from Node!');
console.log("\nCreated output.txt!");

// path = Path utilities — for working with file paths
const path = require('path');
console.log("\n--- Path utilities ---");
console.log("Joined path:", path.join(__dirname, 'files', 'data.json'));
console.log("Extension of 'photo.jpg':", path.extname('photo.jpg'));
console.log("Base name:", path.basename('/folder/file.txt'));