let posts = [
    { 
        id: 1, 
        title: "Getting Started with Node.js", 
        content: "Node.js is a JavaScript runtime...",
        author: "Lawson Kiuga",
        createdAt: "2026-01-15T10:00:00Z",
        likes: 10
    },
    { 
        id: 2, 
        title: "Express.js Fundamentals", 
        content: "Express is a web framework...",
        author: "Janet Rita",
        createdAt: "2026-01-16T14:30:00Z",
        likes: 15
    }
];

let nextId = 3;

let users = [
    { id: 1, name: "Lawson Kiuga", email: "lawson@example.com", createdAt: "2026-01-10T08:00:00Z" },
    { id: 2, name: "Janet Rita", email: "janet@example.com", createdAt: "2026-01-12T10:30:00Z" }
];

let nextUserId = 3;

module.exports = { posts, nextId, users, nextUserId };