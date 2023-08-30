const { db } = require("../config/firebase");
module.exports = (req, res) => {
    var avatars = [
      "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/1.webp?alt=media&token=b090c139-ee21-496a-ba41-9e1e5f17e91a",
      "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/2.webp?alt=media&token=536bdf3d-af24-4186-b747-c93c5f1619d2",
      "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/3.webp?alt=media&token=beff2909-c68e-44f4-af3a-5cd611e3c58d",
      "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/4.webp?alt=media&token=5ffa5283-b0a7-4ccd-b47a-d8f565ce370c",
      "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/5.webp?alt=media&token=a347c709-2a44-4f6f-81b7-f1f4b1131ffa",
      "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/6.webp?alt=media&token=915a674b-ac0d-4b9a-81b4-cbc8d45586ef",
    ];
    var rank = 0;
    var wallet = req.body.wallet.toLowerCase();
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
  };