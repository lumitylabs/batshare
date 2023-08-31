const { db } = require("../config/firebase");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=86400");
  console.log(req.body);
  console.log(Object.keys(req.body));
  console.log(req.body.root[0].txs)

  res.json({ msg: "success" });
});
