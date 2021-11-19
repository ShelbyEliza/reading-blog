const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/authors", categoriesController.loadAuthors);
// router.get("/authors", categoriesController.loadAnAuthor)

module.exports = router;
