const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/officials", (req, res) => {
  const details = [
    { url: "https://4anime.to", title: "Powered By 4Anime" },
    { url: "https://mangadex.tv/", title: "Powered By Mangadex" },
    { url: "", title: "Official Website" },
  ];
  res.json(details);
});

app.use("/", require("./routes/anime"));
app.use("/manga", require("./routes/manga"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server Running");
});
