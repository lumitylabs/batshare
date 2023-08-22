const ethers = require('ethers');

const routesThatNeedAuthentication = [
  '/create-users',
  '/protected2'
];

const verifySignature = (address, signature, originalMessage) => {
  const messageHash = ethers.utils.hashMessage(originalMessage);
  const recoveredAddress = ethers.utils.recoverAddress(messageHash, signature);
  return recoveredAddress === address;
};

const authMiddleware = (req, res, next) => {
  if (routesThatNeedAuthentication.includes(req.path)) {
    const address = req.header('address');
    const signature = req.header('signature');
    const originalMessage = req.header('originalMessage');

    if (!address || !signature || !originalMessage) {
      return res.status(400).json({ error: 'Authentication headers are missing' });
    }

    if (verifySignature(address, signature, originalMessage)) {
      next();
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } else {
    next();
  }
};

module.exports = authMiddleware;