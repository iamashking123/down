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
  Anime.getAnimeFromURL(search).then((data) => {
    res.json(data);
  });
});
Anime.getAnimeFromURL(
  "https://4anime.to/yakunara-mug-cup-mo-episode-03-1/?id=45500"
).then((data) => {
  console.log(data);
});
app.get("/front", (req, res) => {
  Anime.frontPage().then((data) => {
    res.send(data);
    // console.log(data);
  });
});
app.listen(4000, (err) => {
  if (err) throw err;
  console.log("Server Running");
});
