const { db } = require("../config/firebase");
const getDate = require("../utils/utils");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
  try {
    var wallet = req.body.wallet.toLowerCase();
    var project_id = req.body.project_id;
    const currentDate = new Date().toISOString().split("T")[0];
    var ref = db.ref("/projects/" + project_id);
    await ref.once("value", function (snapshot) {
      const project = snapshot.val();
      if (wallet == project.creator) {
        ref.update({
          availableBalance: 0,
        });
        res.send({status:"updated"});
      }
    });
  } catch (error) {
    res.status(500).send("");
  }
});
