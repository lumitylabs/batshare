require("dotenv").config();
const express = require("express");
const cors = require("cors");
const responseTime = require("response-time");
const rateLimit = require("express-rate-limit");

const { initializeApp } = require("firebase-admin/app");
var admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const authMiddleware = require("./authMiddleware");
const serviceAccountBase64 = process.env.SERVICE_ACCOUNT_BASE64;
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf8")
);

const PORT = 4000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});
const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(express.raw({ type: "multipart/*" }));
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

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.post("/", (req, res) => {
  res.send({"response":"Hey this is my API running 🥳"});
});

app.post("/upload", (req, res) => {
  upload(req, res, bucket);
});




app.post("/create-update", (req, res) => {
  var creator = req.body.wallet;
  var url = req.body.url;
  var images = req.body.images;
  var timestamp = Date.now();
  var description = req.body.description;
  var nft = req.body.nft;
  var ref = db.ref("/updates/" + url);
  var newRef = ref.push();
  newRef.set({ creator: creator, timestamp: timestamp, description: description, nft: nft, images: images });
  res.json({ msg: "success" });
});

app.post("/get-projects", (req, res) => {
  var ref = db.ref("/projects-small");
  ref.orderByChild("status").equalTo("active").once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-project", (req, res) => {
  var url = req.body.url;
  var ref = db.ref("/projects/" + url);
  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});
  
app.post("/get-updates", (req, res) => {
  var url = req.body.url;
  var ref = db.ref("/updates/" + url);
  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-comments", (req, res) => {
  var url = req.body.url;
  var ref = db.ref("/comments/" + url);
  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-user", (req, res) => {
  var wallet = req.body.wallet;
  var ref = db.ref("/users/" + wallet);
  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-user-projects", (req, res) => {
  var wallet = req.body.wallet;
  var ref = db.ref("/projects-small");
  ref.orderByChild("creator").equalTo(wallet).once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});



app.post("/create-project", (req, res) => {
  var creator = req.body.wallet;
  var timestamp = Date.now();
  var title = req.body.title;
  var category = req.body.category;
  var description = req.body.description;
  var image = req.body.image;
  var nft = req.body.nft;
  var link = req.body.link;
  var next_steps = req.body.next_steps;
  var status = "active";
  // url = title without spaces, withtout simbols, lowercase
  var url = title.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase() + "-" + creator.substring(0, 5);
  var links = req.body.links;
  var ref = db.ref("/projects/" + url);
  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.json({ msg: "project already exists" });
      } else {
        ref = ref.set({
          creator: creator,
          timestamp: timestamp,
          title: title,
          category: category,
          description: description,
          image: image,
          nft: nft,
          status: status,
          link: link,
          next_steps: next_steps,
          links: links,
        });
        var ProjectsSmallRef = db.ref("/projects-small/"+url);
        ProjectsSmallRef.set({
          creator: creator,
          title: title,
          category: category,
          description: description,
          nft: nft,
          status: status,
        });
        var userProjectsRef = db.ref("/user-projects/"+creator);
        userProjectsRef.update({
          [url]: true
        });
        res.json({ msg: "success" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "error", details: error.message });
    });
});


app.post("/create-comment", (req, res) => {
  var wallet = req.body.wallet;
  var url = req.body.url;
  var timestamp = Date.now();
  var comment = req.body.comment;
  var ref = db.ref("/comments/"+url);
  var newRef = ref.push();
  newRef.set({ comment: comment, user: wallet, timestamp: timestamp });
  res.json({ msg: "success" });
});

app.post("/create-user", (req, res) => {
  var avatars = [
    "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/1.webp?alt=media&token=b090c139-ee21-496a-ba41-9e1e5f17e91a",
    "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/2.webp?alt=media&token=536bdf3d-af24-4186-b747-c93c5f1619d2",
    "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/3.webp?alt=media&token=beff2909-c68e-44f4-af3a-5cd611e3c58d",
    "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/4.webp?alt=media&token=5ffa5283-b0a7-4ccd-b47a-d8f565ce370c",
    "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/5.webp?alt=media&token=a347c709-2a44-4f6f-81b7-f1f4b1131ffa",
    "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/6.webp?alt=media&token=915a674b-ac0d-4b9a-81b4-cbc8d45586ef",
  ];
  var rank = 0;
  var wallet = req.body.wallet;
  var avatarSort = Math.floor(Math.random() * avatars.length)
  var avatar = avatars[avatarSort];
  var ref = db.ref("/users/" + wallet);

  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.json({ msg: "user already exists" });
      } else {
        ref.set({ avatar: avatar, username: "unnamed", rank:rank });
        res.json({ msg: "success" });
      }
    })
    .catch((error) => {
      // Tratar qualquer erro que possa ocorrer
      res.status(500).json({ msg: "error", details: error.message });
    });
});

// Export the Express API
module.exports = app;
