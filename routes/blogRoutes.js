const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.loadHomepage);
router.get("/create", blogController.loadCreatePage);
router.get("/details", blogController.loadDetailsPage);

router.post("/", blogController.createNewPost);

module.exports = router;
