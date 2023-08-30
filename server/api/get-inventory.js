const { db } = require("../config/firebase");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');
  try {
    var wallet = req.body.wallet.toLowerCase();
    const ref = db.ref(`/inventory/${wallet}/`);
    ref.once("value", function (snapshot) {
        res.json(snapshot.val());
      });

  } catch (error) {
    res.status(500).send("Error getting inventory");
  }
});
