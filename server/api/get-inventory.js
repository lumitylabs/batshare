const { db } = require("../config/firebase");

module.exports = async (req, res) => {
  try {
    var wallet = req.body.wallet;
    const ref = db.ref(`/inventory/${wallet}/`);
    ref.once("value", function (snapshot) {
        res.json(snapshot.val());
      });

  } catch (error) {
    res.status(500).send("Error getting inventory");
  }
};
