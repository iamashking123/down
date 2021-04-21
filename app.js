const express = require("express");
const Anime = require("./package/main").default;
const app = express();

app.get("/download", (req, res) => {
  const { epUrl } = req.query;
  Anime.getVideoLinkFromUrl(epUrl).then((data) => {
    res.json(data);
  });
});

app.get("/search", (req, res) => {
  const { search } = req.query;
  Anime.getAnimeFromSearch(search).then((data) => {
    res.send(data);
  });
});

app.get("/recent", (req, res) => {
  Anime.recentReleases().then((data) => {
    res.json(data);
  });
});

app.get("/popular", (req, res) => {
  Anime.popularThisWeek().then((data) => {
    res.json(data);
  });
});

app.get("/details", (req, res) => {
  Anime.getAnimeFromURL(
    "https://4anime.to/anime/boku-no-hero-academia-5th-season"
  ).then((data) => {
    res.json(data);
  });
});

app.listen(4000, (err) => {
  if (err) throw err;
  console.log("Server Running");
});
