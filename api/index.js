const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Wah Wah Wah");
});

app.get("/register", (req, res) => {
  res.json("test ok3");
});

const port = 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
