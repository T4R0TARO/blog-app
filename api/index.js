require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth.js");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");

const app = express();

// app.use(cors());
// ! DOES NOT WORK
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true })); // |'w')b
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
