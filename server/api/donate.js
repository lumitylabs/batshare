const { db } = require("../config/firebase");

module.exports = (req, res) => {
    var { wallet, amount: rawAmount, url, nft_id } = req.body;
    var amount = parseFloat(rawAmount);
    var { day, month, year } = getDate();
    var now = new Date();
  
    var donationPath = `/user-donations/${year}/${month}/${day}/${url}/${wallet}`;
    var ref = db.ref(donationPath);
  
    transactionHandler(ref, amount, async (error, committed, snapshot) => {
      if (error) {
        console.log("Transaction failed", error);
        res.status(500).send("Transaction failed");
      } else if (committed) {
        var base_amount = snapshot.val() ? snapshot.val().amount - amount : 0;
        await addDonationToProject(year, month, day, url, amount, base_amount);
        await addDonationRecord(year, month, day, url, wallet, amount, now);
        await handleNFT(wallet, nft_id, url);
  
        res.status(200).send("Donation added");
      }
    });
  };
  
  
function getDate() {
    var now = new Date();
    return {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear()
    };
  }
  
  // Function to handle the transaction
  async function transactionHandler(ref, amount, callback) {
    ref.transaction(
      (currentData) => {
        if (currentData === null) {
          return { amount: amount };
        } else {
          currentData.amount += amount;
          return currentData;
        }
      },
      callback
    );
  }
  
  // Function to add donation to the record
  async function addDonationRecord(year, month, day, url, wallet, amount, now) {
    var recordPath = `/user-donations-record/${year}/${month}/${day}/${url}/${wallet}`;
    var refRecord = await db.ref(recordPath).push();
    await refRecord.set({
      amount: amount,
      timestamp: now.getTime(),
      wallet: wallet,
    });
  }
  
  // Function to handle NFT
  async function handleNFT(wallet, nft_id, url) {
    var nftPath = `/inventory/${wallet}/${nft_id}`;
    var nftRef = db.ref(nftPath);
  
    await nftRef
      .once("value")
      .then(async (snapshot) => {
        if (!snapshot.exists()) {
          var projectPath = `/projects/${url}`;
          await db
            .ref(projectPath)
            .once("value")
            .then(async (projectSnapshot) => {
              if (projectSnapshot.exists()) {
                await nftRef
                  .set({
                    category: projectSnapshot.val().category,
                    image: projectSnapshot.val().nft_image,
                    title: projectSnapshot.val().title,
                    id: url,
                    round: projectSnapshot.val().round,
                    visible: true,
                    timestamp: Date.now(),
                  });
              }
            });
        }
      });
  }
  

  
  async function addDonationToProject(
    year,
    month,
    day,
    url,
    amount,
    base_amount
  ) {
    var projectPath = `/project-raised/${year}/${month}/${day}/${url}`;
    var ref = db.ref(projectPath);
  
    await ref.once("value").then((snapshot) => {
      if (snapshot.exists()) {
        ref.transaction(() => {
          var quadratic_amount = Math.sqrt(amount + base_amount);
          var past_quadratic_amount = Math.sqrt(base_amount);
          var new_amount = quadratic_amount - past_quadratic_amount;
          return { amount: snapshot.val().amount + new_amount };
        });
      } else {
        var quadratic_amount = Math.sqrt(amount + base_amount);
        var past_quadratic_amount = Math.sqrt(base_amount);
        var new_amount = quadratic_amount - past_quadratic_amount;
        ref.set({ amount: new_amount });
      }
    });
  }