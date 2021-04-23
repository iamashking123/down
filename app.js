const express = require("express");
const Anime = require("./package/main").default;
const app = express();
const path = require("path");

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

app.get("/recent", (_, res) => {
  Anime.recentReleases().then((data) => {
    res.json(data);
  });
});

app.get("/popular", (_, res) => {
  Anime.popularThisWeek().then((data) => {
    res.json(data);
  });
});

app.get("/details", (req, res) => {
  const { url } = req.query;
  Anime.getAnimeFromURL(url).then((data) => {
    res.json(data);
  });
});

app.get("/video", (_, res) => {
  res.sendFile(path.resolve(__dirname, "video.mkv"));
});

app.listen(4000, (err) => {
  if (err) throw err;
  console.log("Server Running");
});
