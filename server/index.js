// index.js
const express = require("express");
const cors = require("cors");
const responseTime = require("response-time");
const rateLimit = require("express-rate-limit");
const { upload } = require("./upload/upload");
const { initializeApp } = require("firebase-admin/app");
var admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const app = express();
var serviceAccount = require("./config.json");


const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 400, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors());

app.use(responseTime());
app.use(
  rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 12 hour duration in milliseconds
    max: 600,
    message: "You exceeded requests hour limit!",
    headers: true,
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.post("/upload", (req, res) => {
  upload(req, res, bucket);
});

// Export the Express API
module.exports = app;
