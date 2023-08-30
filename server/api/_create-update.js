const { db } = require("../config/firebase"); // Adjust the path for Firebase initialization

module.exports = async (req, res) => {
  var creator = req.body.wallet.toLowerCase();
  var url = req.body.url;
  var images = req.body.images;
  var timestamp = Date.now();
  var description = req.body.description;
  var nft = req.body.nft;
  var ref = db.ref("/updates/" + url);
  var newRef = ref.push();
  await newRef.set({
    creator: creator,
    timestamp: timestamp,
    description: description,
    nft: nft,
    images: images,
  });
  res.json({ msg: "success" });
};
