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

// ! DOES NOT WORK
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//? TESTING
// app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
// app.use(cors());

// * DEPLOY
app.use(
  cors({
    // origin: "https://blog-app-production-82fa.up.railway.app",
    origin: "https://blog-app-client-production.up.railway.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
//used to serve user-uploaded files, in this case image files.
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
