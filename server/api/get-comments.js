const { db } = require("../config/firebase");
module.exports = async (req, res) => {
    var url = req.body.url;
    var ref = db.ref("/comments/" + url);
    ref.once("value", function (snapshot) {
      res.json(snapshot.val());
    });
  };