# Week 10: CommunityHub API

## Author
- **Name:** Connie
- **GitHub:** [@Connie-cloud-svg](https://github.com/Connie-cloud-svg)
- **Date:** May 11, 2026

---

## Project Description

CommunityHub API is a fully functional RESTful backend server built with Node.js and Express. It powers a community platform with posts, users, and nested comments — complete with filtering, sorting, pagination, validation, authentication middleware, and file logging. This project represents my first step into full-stack backend development!

---

## Technologies Used

- **Node.js** — JavaScript runtime for server-side code
- **Express.js** — Web framework for building APIs
- **JavaScript (ES6+)** — Spread operator, destructuring arrow functions
- **Postman** — API testing and debugging
- **Git & GitHub** — Version control and collaboration
- **Regular Expressions (Regex)** — Email validation pattern matching

---

## Features

### Posts API
- **Create** new posts with title, content, and author
- **Read** all posts with query filtering (by author, search in title)
- **Read** single post by ID
- **Update** posts with partial or full data
- **Delete** posts permanently
- **Like** posts with PATCH increment

### Users API
- **Create** users with name and email validation
- **Read** all users or single user by ID
- **Validate** email format using regex
- **Prevent** duplicate email registrations

### Comments API (Nested Resources)
- **Create** comments on specific posts
- **Read** all comments for a post
- **Delete** comments by ID (scoped to correct post)
- **Validate** post exists before comment operations

### Advanced Features
- **Query Parameters:** Filter, search, sort (newest/popular/oldest), pagination
- **Middleware:** Console logger, file logger (saves to `logs/requests.log`), auth simulation
- **Error Handling:** Custom ApiError class with proper HTTP status codes
- **Validation:** Required fields, minimum lengths, format checking
- **Modular Architecture:** Routes, controllers, middleware, and data layers separated

---

## How to Run

### Prerequisites
- Node.js installed (`node --version` should show v14+)

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Connie-cloud-svg/iyf-s10-week-10-Connie-cloud-svg-.git
   cd iyf-s10-week-10-Connie-cloud-svg-

2. Install dependencies 
    ```bash
    npm install

3. Start the server
    ```bash
    node server.js

4. server runs at `http://localhost:3000`

## Lessons Learned
1. **The Spread Operator** `...`
    I finally understood why [...store.posts] creates a copy instead of referencing the original array. This prevents accidental mutations when filtering or sorting — critical for data integrity!

2. **Regular Expressions for Validation**
    Building the email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` taught me how to think in patterns. Breaking down `^`, `[]`, `+`, and `$` made regex feel less like magic and more like a precise language.

3. **Middleware Flow**
    Understanding that Express processes requests top-to-bottom like a waterfall changed how I structure code. The order of `app.use()` matters immensely — especially placing 404 handlers before error handlers
    
## Challenges Faced
1. **Callback Confusion**
    Problem: The `(err, data)` callback pattern in `fs.readFile` felt confusing at first.
    Solution:It as a "restaurant buzzer" analogy — async operations don't block, they call back. I also learned that `process.argv` and URL parameters always return strings, requiring `parseInt()` for numbers.

2. **VS Code TypeScript Errors in** `node_modules`
    Problem: False error messages about `@ljharb/tsconfig` not found.
    Solution: Learned that `node_modules` errors are usually not my fault — they're upstream package issues. Created `.gitignore` to keep the repo clean and focused on my own code.

3. **Modular Architecture Setup**
   Problem: `require()` paths breaking when splitting code into folders.
    Solution: Practiced using `../` (up one level) vs `./` (same level). Understood `module.exports` as Node.js's way of sharing code between files. 

4. **Nested Resource Validation**
   Problem: Ensuring comments can only be deleted from their parent post.
    Solution: Used `findIndex(c => c.id === commentId && c.postId === postId)` to scope queries. This prevents deleting comments that belong to different posts — a subtle but important security check.  


## Project Structure
```
iyf-s10-week-10-Connie-cloud-svg-/
├── src/
│   ├── routes/          # URL routing definitions
│   ├── middleware/      # Logger, auth, error handling
│   ├── controllers/     # Business logic
│   └── data/            # In-memory data store
├── logs/                # Request logs (auto-generated)
├── server.js            # Entry point
└── package.json         # Dependencies

