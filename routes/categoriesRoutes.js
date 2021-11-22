const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/authors", categoriesController.loadAuthors);
router.get("/:name", categoriesController.loadAuthorDetails);

module.exports = router;
