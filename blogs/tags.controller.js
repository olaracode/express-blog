const Blog = require("./model");

const getTags = async (req, res) => {
  try {
    const blogs = await Blog.find({}, "tags");
    // turn each tag into lowercase
    const tags = blogs.map((blog) => {
      return blog.tags.map((tag) => tag.toLowerCase());
    });

    const uniqueTags = [...new Set(tags.flat())];
    res.json(uniqueTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTags,
};
