const { db } = require("../config/firebase");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=86400");
  console.log(req.body.txs[0].hash);

  res.json({ msg: "success" });
});
