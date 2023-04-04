const Blog = require("./model");

const createBlog = async (req, res) => {
  const loweredTags = req.body.tags.map((tag) => tag.toLowerCase());
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.title.toLowerCase().split(" ").join("-"),
    tags: loweredTags,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await blog.remove();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBlog,
  deleteBlog,
};
