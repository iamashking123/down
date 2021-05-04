const express = require("express");
const router = express.Router();
const Anime = require("../controller/anime").default;

router.get("/download", (req, res) => {
  const { epUrl } = req.query;
  Anime.getVideoLinkFromUrl(epUrl).then((data) => {
    res.json(data);
  });
});

router.get("/search", (req, res) => {
  const { search } = req.query;
  Anime.getAnimeFromSearch(search).then((data) => {
    res.send(data);
  });
});

router.get("/recent", (_, res) => {
  Anime.recentReleases().then((data) => {
    res.json(data);
  });
});

router.get("/popular", (_, res) => {
  Anime.popularThisWeek().then((data) => {
    res.json(data);
  });
});

router.get("/details", (req, res) => {
  const { url } = req.query;
  Anime.getAnimeFromURL(url).then((data) => {
    res.json(data);
  });
});

module.exports = router;
