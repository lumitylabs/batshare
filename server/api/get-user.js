const { db } = require("../config/firebase");
const cors = require("../config/cors").default;

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');
    var wallet = req.body.wallet;
    var ref = db.ref("/users/" + wallet);
    ref.once("value", function (snapshot) {
      res.json(snapshot.val());
    });
  };