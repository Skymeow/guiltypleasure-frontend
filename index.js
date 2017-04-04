const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
  console.log('hi')
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(process.env.PORT || 3000);
