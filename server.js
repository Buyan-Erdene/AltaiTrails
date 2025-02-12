// server.js

// 1. Import required modules
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

// 2. Create an Express app and define the port
const app = express();
const port = 3000;

// 3. Set up your PostgreSQL connection pool
const pool = new Pool({
    user: 'bilguunganbaatar',
    host: 'localhost',
    database: 'blog_database',
    password: 'Bill1129',
    port: 5432,
});

// 4. Set up EJS as your view engine and define your views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 5. Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// (Optional) If you want to receive JSON (e.g., for POST requests), use:
app.use(express.json());

// 6. Define your routes

// Serve the Blog.html file from /public/html
app.get('/Blog.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'Blog.html'));
});

// Route to display a blog page using EJS
app.get('/blog/:id', async (req, res) => {
    const blogId = req.params.id;
    try {
        // Query the blog by id
        const blogQuery = 'SELECT * FROM blogs WHERE id = $1';
        const blogResult = await pool.query(blogQuery, [blogId]);

        if (blogResult.rows.length === 0) {
            return res.status(404).send('Blog not found');
        }
        
        const blog = blogResult.rows[0];
        // Query similar blogs in the same category, excluding the current one
        const similarQuery = 'SELECT * FROM blogs WHERE category = $1 AND id != $2 ORDER BY RANDOM() LIMIT 6';
        const similarResult = await pool.query(similarQuery, [blog.category, blogId]);
        
        // Render the EJS template "blog.ejs" with the blog data
        res.render('blog', { blog, similarBlogs: similarResult.rows });
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Server error');
    }
});

// API Endpoint 1: Get a list of blogs (only specific fields)
app.get('/api/blogs', async (req, res) => {
    try {
        // Query to select only id, title, category, and image fields
        const result = await pool.query("SELECT id, title, category, image FROM blogs");
        res.json(result.rows);  // Return the result as JSON
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API Endpoint 2 (Optional): Get a single blog by id (in JSON format)
app.get('/api/blog/:id', async (req, res) => {
    const blogId = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [blogId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching blog by id:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// (Optional) API Endpoint 3: Create a new blog post
// Make sure to send JSON data in the request body (with keys: title, author, content, category, image)
// Uncomment the code below if you need to insert new blog posts via the API.
/*
app.post('/api/blogs', async (req, res) => {
    const { title, author, content, category, image } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO blogs (title, author, content, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, author, content, category, image]
        );
        res.status(201).json(result.rows[0]); // Return the inserted blog post
    } catch (err) {
        console.error('Error creating blog post:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
*/

// 7. Start the server (this should be the last part of your server.js file)
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
