const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'bilguunganbaatar',
    host: 'localhost',
    database: 'blog_database',
    password: 'Bill1129',
    port: 5432,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static Blog.html
app.get('/Blog.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'Blog.html'));
});

// Dynamic blog pages using EJS
app.get('/blog/:id', async (req, res) => {
    const blogId = req.params.id;
    try {
        const blogQuery = 'SELECT * FROM blogs WHERE id = $1';
        const blogResult = await pool.query(blogQuery, [blogId]);

        if (blogResult.rows.length === 0) {
            return res.status(404).send('Blog not found');
        }
        
        const blog = blogResult.rows[0];
        
        // Fetch similar blogs from the same category (excluding current blog)
        const similarQuery = 'SELECT * FROM blogs WHERE category = $1 AND id != $2 ORDER BY RANDOM() LIMIT 6';
        const similarResult = await pool.query(similarQuery, [blog.category, blogId]);
        
        res.render('blog', { blog, similarBlogs: similarResult.rows });
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});

app.get("/api/blogs", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, title, category, image FROM Blogs");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
