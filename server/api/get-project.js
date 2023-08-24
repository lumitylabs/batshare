const { db } = require("../config/firebase"); // Adjust the path for Firebase initialization

module.exports = async (req, res) => {
    var url = req.body.url;
    var ref = db.ref("/projects/" + url);
    ref.once("value", function (snapshot) {
      res.json(snapshot.val());
    });
};