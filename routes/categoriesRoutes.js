const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/allAuthors", categoriesController.loadAuthors);
router.get("/author/:authorID", categoriesController.loadAuthorDetails);

router.get("/editAuthor/:id", categoriesController.loadEditAuthor);

router.post("/edit/:name", categoriesController.updateAuthor);

module.exports = router;
