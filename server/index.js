require("dotenv").config();
const express = require("express");
const cors = require("cors");
const responseTime = require("response-time");
const rateLimit = require("express-rate-limit");

const { initializeApp } = require("firebase-admin/app");
var admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");

const serviceAccountBase64 = process.env.SERVICE_ACCOUNT_BASE64;
const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});
const app = express();
app.use(express.raw({ type: 'multipart/*' }));
const bucket = getStorage().bucket();
const { upload } = require("./upload/upload");
var db = admin.database();


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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



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
