const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

app.use(helmet());
app.use(cors());

app.get("/officials", (req, res) => {
  const details = [
    { url: "https://4anime.to", title: "Powered By 4Anime" },
    { url: "https://mangadex.tv/", title: "Powered By Mangadex" },
    {
      url: "https://github.com/iamashking123/anime_manga/releases/download/v-3.1/down.apk",
      title: "New Update Available",
    },
    {
      url: "https://github.com/iamashking123/anime_manga/releases/download/v-3.1/down.apk",
      title: "GitHub Download Link",
    },
  ];
  res.json(details);
});

app.get("/info", (req, res) => {
  const info = [
    [
      {
        title: "Source Code",
        url: "https://github.com/iamashking123/anime_manga",
      },
      {
        title: "Anime Stats App",
        url: "https://github.com/iamashking123/anime_app/releases/download/v1-arm64/Anime-arm64-v8a-release.apk",
      },
    ],
    { updates: "3.0.3" },
    [
      {
        title: "Github Download Link",
        url: "https://github.com/iamashking123/anime_manga/releases/download/v-3.3/down.apk",
      },
    ],
  ];
  res.json(info);
});

app.use("/", require("./routes/anime"));
app.use("/manga", require("./routes/manga"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server Running");
});
