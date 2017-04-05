const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./dist/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server listening on ', PORT)
});
