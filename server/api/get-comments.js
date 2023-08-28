const { db } = require("../config/firebase");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');
    var url = req.body.url;
    var ref = db.ref("/comments/" + url);
    ref.once("value", function (snapshot) {
      res.json(snapshot.val());
    });
  });