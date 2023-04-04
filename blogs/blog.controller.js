const Blog = require("./model");

/**
 * @description handle all public blog functions
 * @param {*} req
 * @param {*} res
 * @returns {
 * getAllBlogs
 * getRelatedBlogs
 * searchBlogs
 * getBlogDetails
 * }
 *
 */

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}, "title _id slug tags");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRelatedBlogs = async (req, res) => {
  try {
    console.log(req.params.slug);
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const relatedBlogs = await Blog.find(
      { tags: { $in: blog.tags } },
      "title _id slug tags"
    );
    // remove the blog itself from the related blogs
    const filteredBlogs = relatedBlogs.filter(
      (relatedBlog) => relatedBlog.slug !== blog.slug
    );
    res.json(filteredBlogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchBlogs = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query; // get search term, page number and limit from query params
    const query = {};
    if (search) {
      // if search term is provided, add it to the query
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    const count = await Blog.countDocuments(query); // get the total count of matching documents
    const blogs = await Blog.find(query, "title _id slug tags")
      .skip((page - 1) * limit) // skip documents according to the page number and limit
      .limit(limit) // limit the number of documents to return
      .sort({ _id: -1 }); // sort documents by descending order of id

    res.json({
      total: count,
      page,
      limit,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBlogDetails,
  getRelatedBlogs,
  searchBlogs,
  getAllBlogs,
};
