const { db } = require("../config/firebase");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=86400");
  console.log(req.body.txs.hash);

  res.json({ msg: "success" });
});
