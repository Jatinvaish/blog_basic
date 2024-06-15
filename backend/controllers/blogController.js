const Blog = require('../models/Blog');

// Create a blog post
exports.createBlog = async (req, res) => {
    const { title, description, category, status } = req.body;

    if (title.length < 5 || title.length > 100) {
        return res.status(400).json({ msg: 'Title must be between 5 and 100 characters' });
    }

    try {
        const newBlog = new Blog({ title, description, category, status });
        await newBlog.save();
        res.json(newBlog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a single blog post
exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
    const { title, description, category, status } = req.body;

    if (title.length < 5 || title.length > 100) {
        return res.status(400).json({ msg: 'Title must be between 5 and 100 characters' });
    }

    
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }

        blog.title = title;
        blog.description = description;
        blog.category = category;
        blog.status = status;
        blog.slug = `${title} - ${category}`;

        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        await blog.deleteOne();
        res.json({ msg: 'Blog post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
