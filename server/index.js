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
  res.send({ response: "Hey this is my API running 🥳" });
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
  newRef.set({
    creator: creator,
    timestamp: timestamp,
    description: description,
    nft: nft,
    images: images,
  });
  res.json({ msg: "success" });
});

app.post("/get-projects", (req, res) => {
  var ref = db.ref("/projects-small");
  ref
    .orderByChild("status")
    .equalTo("active")
    .once("value", function (snapshot) {
      res.json(snapshot.val());
    });
});

app.post("/get-project", (req, res) => {
  var url = req.body.url;
  var ref = db.ref("/projects/" + url);
  ref.once("value", function (snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-updates", (req, res) => {
  var url = req.body.url;
  var ref = db.ref("/updates/" + url);
  ref.once("value", function (snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-comments", (req, res) => {
  var url = req.body.url;
  var ref = db.ref("/comments/" + url);
  ref.once("value", function (snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-user", (req, res) => {
  var wallet = req.body.wallet;
  var ref = db.ref("/users/" + wallet);
  ref.once("value", function (snapshot) {
    res.json(snapshot.val());
  });
});

app.post("/get-user-projects", (req, res) => {
  var wallet = req.body.wallet;
  var ref = db.ref("/projects-small");
  ref
    .orderByChild("creator")
    .equalTo(wallet)
    .once("value", function (snapshot) {
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
  var nft_id = req.body.nft_id;
  var nft_image = req.body.nft_image;
  var link = req.body.link;
  var next_steps = req.body.next_steps;
  var round = 1;
  var status = "active";
  var url =
    title
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase() +
    "-" +
    creator.substring(0, 5);
  var socials = req.body.socials;
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
          nft_id: nft_id,
          nft_image: nft_image,
          status: status,
          link: link,
          next_steps: next_steps,
          socials: socials,
          round: round,
        });
        var ProjectsSmallRef = db.ref("/projects-small/" + url);
        ProjectsSmallRef.set({
          creator: creator,
          title: title,
          category: category,
          description: description,
          nft: nft,
          status: status,
        });
        var userProjectsRef = db.ref("/user-projects/" + creator);
        userProjectsRef.update({
          [url]: true,
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
  var ref = db.ref("/comments/" + url);
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
  var avatarSort = Math.floor(Math.random() * avatars.length);
  var avatar = avatars[avatarSort];
  var ref = db.ref("/users/" + wallet);

  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.json({ msg: "user already exists" });
      } else {
        ref.set({ avatar: avatar, username: "unnamed", rank: rank });
        res.json({ msg: "success" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "error", details: error.message });
    });
});

// Function to extract the date
function getDate() {
  var now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear()
  };
}

// Function to handle the transaction
async function transactionHandler(ref, amount, callback) {
  ref.transaction(
    (currentData) => {
      if (currentData === null) {
        return { amount: amount };
      } else {
        currentData.amount += amount;
        return currentData;
      }
    },
    callback
  );
}

// Function to add donation to the record
async function addDonationRecord(year, month, day, url, wallet, amount, now) {
  var recordPath = `/user-donations-record/${year}/${month}/${day}/${url}/${wallet}`;
  var refRecord = await db.ref(recordPath).push();
  await refRecord.set({
    amount: amount,
    timestamp: now.getTime(),
    wallet: wallet,
  });
}

// Function to handle NFT
async function handleNFT(wallet, nft_id, url) {
  var nftPath = `/inventory/${wallet}/${nft_id}`;
  var nftRef = db.ref(nftPath);

  await nftRef
    .once("value")
    .then(async (snapshot) => {
      if (!snapshot.exists()) {
        var projectPath = `/projects/${url}`;
        await db
          .ref(projectPath)
          .once("value")
          .then(async (projectSnapshot) => {
            if (projectSnapshot.exists()) {
              await nftRef
                .set({
                  category: projectSnapshot.val().category,
                  image: projectSnapshot.val().nft_image,
                  title: projectSnapshot.val().title,
                  id: url,
                  round: projectSnapshot.val().round,
                  visible: true,
                  timestamp: Date.now(),
                });
            }
          });
      }
    });
}

app.post("/donate", async (req, res) => {
  var { wallet, amount: rawAmount, url, nft_id } = req.body;
  var amount = parseFloat(rawAmount);
  var { day, month, year } = getDate();
  var now = new Date();

  var donationPath = `/user-donations/${year}/${month}/${day}/${url}/${wallet}`;
  var ref = db.ref(donationPath);

  transactionHandler(ref, amount, async (error, committed, snapshot) => {
    if (error) {
      console.log("Transaction failed", error);
      res.status(500).send("Transaction failed");
    } else if (committed) {
      var base_amount = snapshot.val() ? snapshot.val().amount - amount : 0;
      await addDonationToProject(year, month, day, url, amount, base_amount);
      await addDonationRecord(year, month, day, url, wallet, amount, now);
      await handleNFT(wallet, nft_id, url);

      res.status(200).send("Donation added");
    }
  });
});

async function addDonationToProject(
  year,
  month,
  day,
  url,
  amount,
  base_amount
) {
  var projectPath = `/project-raised/${year}/${month}/${day}/${url}`;
  var ref = db.ref(projectPath);

  await ref.once("value").then((snapshot) => {
    if (snapshot.exists()) {
      ref.transaction(() => {
        var quadratic_amount = Math.sqrt(amount + base_amount);
        var past_quadratic_amount = Math.sqrt(base_amount);
        var new_amount = quadratic_amount - past_quadratic_amount;
        return { amount: snapshot.val().amount + new_amount };
      });
    } else {
      var quadratic_amount = Math.sqrt(amount + base_amount);
      var past_quadratic_amount = Math.sqrt(base_amount);
      var new_amount = quadratic_amount - past_quadratic_amount;
      ref.set({ amount: new_amount });
    }
  });
}

// Export the Express API
module.exports = app;
