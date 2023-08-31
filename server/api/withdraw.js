const { db } = require("../config/firebase");
const cors = require("../config/cors").default;
const { ethers, Interface } = require('ethers');
const contractJSON = require('../config/QuadraticFunding.json');


module.exports = cors(async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=86400");

  console.log(req.body);
  console.log(req.body.txs[0].hash);
  await extractDonationData(req.body.txs[0].hash)

  res.json({ msg: "success" });
});


async function extractDonationData(transactionHash) {

    const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/"+process.env.INFURA)
    const transaction = await provider.getTransaction(transactionHash);
    const contractAbi = contractJSON.abi;
    const contract = new ethers.Contract(transaction.to, contractAbi, provider);
    const iface = contract.interface;
    const parsed = iface.parseTransaction({ data: transaction.data });
    console.log(parsed)
    if (parsed.name !== 'withdraw') {
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