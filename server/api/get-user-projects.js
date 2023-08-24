const { db } = require("../config/firebase");
module.exports = async (req, res) => {
    var wallet = req.body.wallet;
    var ref = db.ref("/projects-small");
    ref
      .orderByChild("creator")
      .equalTo(wallet)
      .once("value", function (snapshot) {
        res.json(snapshot.val());
      });
  };