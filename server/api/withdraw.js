const { db } = require("../config/firebase");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=86400");
  console.log(req)
  console.log(req.body);

  res.json({ msg: "success" });
});
