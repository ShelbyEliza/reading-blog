const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/authors", categoriesController.loadAuthors);
router.get("/:name", categoriesController.loadAuthorDetails);

router.get("/editAuthor/:id", categoriesController.loadEditAuthor);

// router.post("/edit/:id", categoriesController.updateAuthor);

module.exports = router;
