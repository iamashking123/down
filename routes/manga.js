const express = require("express");
const router = express.Router();
const MangaScraper = require("../controller/manga");

router.get("/search/", (req, res) => {
  const { search } = req.query;
  MangaScraper.getMangaSearchUrl(search).then((data) => {
    res.json(data);
  });
});

router.get("/details/", (req, res) => {
  const { mangaUrl } = req.query;
  MangaScraper.getMangaDetails(mangaUrl).then((data) => {
    res.send(data);
  });
});

router.get("/chapter/", (req, res) => {
  const { chapterUrl } = req.query;
  MangaScraper.getChapterImages(chapterUrl).then((data) => {
    res.json(data);
  });
});

module.exports = router;
