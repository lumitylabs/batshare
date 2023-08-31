const { db } = require("../config/firebase");
module.exports = async (req, res) => {
  var creator = req.body.wallet.toLowerCase();
  var timestamp = Date.now();
  var title = req.body.title;
  var category = req.body.category;
  var description = req.body.description;
  var image = req.body.image;
  var nft_image = req.body.nft_image;
  var link = req.body.link;
  var next_steps = req.body.next_steps;
  var round = 1;
  var status = "active";
  var twitter = req.body.twitter;
  var instagram = req.body.instagram;
  var discord = req.body.discord;
  var email = req.body.email;
  const currentDate = new Date().toISOString().split("T")[0];
  var url =
    title
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase() +
    "-" +
    creator.substring(0, 5);
  var nftRef = db.ref("/nfts/");
  var nft = await nftRef.push();
  nft.set({
    creator: creator,
    timestamp: timestamp,
    title: title,
    nft_image: nft_image,
  });
  const nft_id = nft.key;
  

  var ref = db.ref("/projects/" + url);
  await ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.json({ msg: "project already exists" });
      } else {
        ref = ref.set({
          creator: creator,
          timestamp: timestamp,
          title: title,
          category: category,
          description: description,
          image: image,
          nft_id: nft_id,
          nft_image: nft_image,
          status: status,
          link: link,
          next_steps: next_steps,
          twitter: twitter,
          instagram: instagram,
          discord: discord,
          email: email,
          round: round,
          donations: 0,
          totalRaised: 0,
          lastWithdraw: currentDate,
          lastUpdate: currentDate,
          availableBalance: currentDate,

        });
        var ProjectsSmallRef = db.ref("/projects-small/" + url);
        ProjectsSmallRef.set({
          creator: creator,
          title: title,
          category: category,
          description: description,
          nft_id: nft_id,
          nft_image: nft_image,
          status: status,
        });
        var userProjectsRef = db.ref("/user-projects/" + creator);
        userProjectsRef.update({
          [url]: true,
        });
        res.json({ msg: "success" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "error", details: error.message });
    });
};
