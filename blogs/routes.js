const express = require("express");
const router = express.Router();
const { tokenValidate } = require("../auth/AuthMiddleware");
const {
  getRelatedBlogs,
  getAllBlogs,
  getBlogDetails,
  searchBlogs,
} = require("./blog.controller");
const { getTags } = require("./tags.controller");
const { deleteBlog, createBlog } = require("./blog.admin.controller");

/**
 * @description declare all blog related routes
 * @returns {
 *  router:  {
 *    / - GET - get all blogs
 *    /:slug - GET - get a blog by slug
 *    /related/:slug - GET - get related blogs
 *    /search - GET - search blogs
 *    /tags - GET - get all tags
 *    / - POST - create a blog
 *    /:id - DELETE - delete a blog
 *  }
 * }
 */

// Get all blogs
router.get("/", async (req, res) => getAllBlogs(req, res));

router.delete(
  "/:id",
  tokenValidate,
  async (req, res) => await deleteBlog(req, res)
);

router.get("/search", async (req, res) => await searchBlogs(req, res));

router.get("/tags", async (req, res) => await getTags(req, res));

// Create a blog
router.post("/", tokenValidate, async (req, res) => await createBlog(req, res));

// Get a blog by slug
router.get("/:slug", async (req, res) => await getBlogDetails(req, res));

router.get(
  "/related/:slug",
  async (req, res) => await getRelatedBlogs(req, res)
);

module.exports = router;
