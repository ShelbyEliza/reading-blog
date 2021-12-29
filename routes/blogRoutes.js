const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.loadHomepage);
router.get("/allBlogs", blogController.loadAllBlogs);
router.get("/create", blogController.loadCreatePage);
router.get("/blogDetails/:id", blogController.loadBlogDetails);
router.get("/editBlog/:id", blogController.loadEditPage);
router.delete("/:id", blogController.deletePost);

router.post("/", blogController.createNewPost);
router.post("/edit/:id", blogController.updatePost);

module.exports = router;
