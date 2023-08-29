const { db } = require("../config/firebase");
const { ethers, Interface } = require('ethers');
const contractJSON = require('../config/QuadraticFunding.json');

module.exports = async (req, res) => {
  var { wallet, amount, url } = await extractDonationData(req.body.transactionHash);
  var nft_id = "";
  var { day, month, year } = getDate();
  var now = new Date();

  var donationPath = `/user-donations/${year}/${month}/${day}/${url}/${wallet}`;
  var ref = db.ref(donationPath);

  transactionHandler(ref, amount, async (error, committed, snapshot) => {
    if (error) {
      console.log("Transaction failed", error);
      res.status(500).send({status:"Transaction failed"});
    } else if (committed) {
      var base_amount = snapshot.val() ? snapshot.val().amount - amount : 0;
      await addDonationToProject(year, month, day, url, amount, base_amount);
      await addDonationRecord(year, month, day, url, wallet, amount, now);
      nft_id = await getProjectNftId(wallet, nft_id, url);
      await handleNFT(wallet, nft_id, url);
      res.status(200).send({status:"Donation added"});
    }
  });
};


async function extractDonationData(transactionHash) {

  const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/"+process.env.INFURA)
  const transaction = await provider.getTransaction(transactionHash);
  const contractAbi = contractJSON.abi;
  const contract = new ethers.Contract(transaction.to, contractAbi, provider);
  const iface = contract.interface;
  const parsed = iface.parseTransaction({ data: transaction.data });
  
  if (parsed.name !== 'donate') {
      throw new Error('Transaction is not a donation.');
  }
  console.log(parsed.args)
  const url = parsed.args[0];  
  const wallet = transaction.from;
  const amount = parseInt(parsed.args[1]);  

  return {
      wallet,
      amount,
      url
  };
}



function getDate() {
  var now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
}

async function getProjectNftId(url) {
  var nftPath = `/project/${url}`;
  var nftRef = db.ref(nftPath);
  var nft_id = "";
  await nftRef.once("value").then(async (snapshot) => {
    if (snapshot.exists()) {
      nft_id = snapshot.val().nft_id;
    }
  });
  return nft_id;

}
// Function to handle the transaction
async function transactionHandler(ref, amount, callback) {
  ref.transaction((currentData) => {
    if (currentData === null) {
      return { amount: amount };
    } else {
      currentData.amount += amount;
      return currentData;
    }
  }, callback);
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

  await nftRef.once("value").then(async (snapshot) => {
    if (!snapshot.exists()) {
      console.log("NFT does not exist")
      var projectPath = `/projects/${url}`;
      await db
        .ref(projectPath)
        .once("value")
        .then(async (projectSnapshot) => {
          if (projectSnapshot.exists()) {
            await projectSnapshot.ref.update({
              donations: projectSnapshot.val().donations + 1,
            });
            await nftRef.set({
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
    else{
      console.log("NFT already exist")
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

  var quadratic_amount = Math.sqrt(amount + base_amount);
  var past_quadratic_amount = Math.sqrt(base_amount);
  var new_amount = quadratic_amount - past_quadratic_amount;

  await ref.once("value").then((snapshot) => {
    if (snapshot.exists()) {
      ref.transaction(() => {
        return { amount: snapshot.val().amount + new_amount };
      });


      
    } else {
      ref.set({ amount: new_amount });
    }
  });
  await addToTotalRaisedDaily(year, month, day, new_amount, amount);
}

async function addToTotalRaisedDaily(year, month, day, quadratic_amount, bat_value) {
  var totalPath = `/total-raised-daily/${year}/${month}/${day}`;
  var ref = db.ref(totalPath);

  await ref.once("value").then((snapshot) => {
    if (snapshot.exists()) {
      ref.transaction(() => {
        return { amount: snapshot.val().amount + quadratic_amount, bat_value: snapshot.val().bat_value + bat_value };
      });
    } else {
      ref.set({ amount: quadratic_amount, bat_value: bat_value });
    }
  });
}
