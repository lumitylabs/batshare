const { db } = require("../config/firebase");
module.exports = async (req, res) => {
    var wallet = req.body.wallet.toLowerCase();;
    var url = req.body.url;
    var timestamp = Date.now();
    var comment = req.body.comment;
    var ref = db.ref("/comments/" + url);
    var newRef = ref.push();
    await newRef.set({ comment: comment, user: wallet, timestamp: timestamp });
    res.json({ msg: "success" });
  };