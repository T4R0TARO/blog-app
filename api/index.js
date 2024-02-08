const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Wah Wah Wah");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.json({ requestData: { username, password } });
});

const port = 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
