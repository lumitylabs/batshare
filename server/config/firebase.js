const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");

const serviceAccountBase64 = process.env.SERVICE_ACCOUNT_BASE64;
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});

const db = admin.database();

const bucket = getStorage().bucket();


module.exports = {
  admin,
  db,
  bucket
};