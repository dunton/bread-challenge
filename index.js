const express = require("express"); // import express
const path = require("path");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static("client"));
app.get("*", (req, res) => {
  res.sendFile("/client/index.html");
});

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
