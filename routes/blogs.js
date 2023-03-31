const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}, "title _id slug");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a blog
router.post("/", async (req, res) => {
  console.log("hi");
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.title.toLowerCase().split(" ").join("-"),
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
