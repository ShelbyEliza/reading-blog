const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/allAuthors", categoriesController.loadAllAuthors);
router.get("/author/:authorID", categoriesController.loadAuthorDetails);

router.get("/editAuthor/:id", categoriesController.loadEditAuthor);

router.post("/edit/:name", categoriesController.updateAuthor);

router.get("/allTags", categoriesController.loadAllTags);
router.get("/tagDetails/:tag", categoriesController.loadTagDetails);

module.exports = router;
