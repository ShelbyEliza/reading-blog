const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.loadHomepage);
router.get("/create", blogController.loadCreatePage);
router.get("/:id", blogController.loadDetailsPage);
// router.delete("/:id", blogController.deleteBlog);

router.post("/", blogController.createNewPost);

module.exports = router;
