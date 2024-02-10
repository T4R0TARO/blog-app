require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth.js");

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  return res.status(200).send("Wah Wah Wah Testing...");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
