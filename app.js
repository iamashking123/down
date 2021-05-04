const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/", require("./routes/anime"));
app.use("/manga", require("./routes/manga"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server Running");
});
