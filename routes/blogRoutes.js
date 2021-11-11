const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.loadHomepage);
router.get("/create", blogController.loadCreatePage);
router.get("/:id", blogController.loadDetailsPage);
router.get("/edit/:id", blogController.loadEditPage);
router.delete("/:id", blogController.deletePost);

router.post("/", blogController.createNewPost);
router.post("/edit/:id", blogController.updatePost);

module.exports = router;
