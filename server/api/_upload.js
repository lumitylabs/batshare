const { upload } = require('../upload/upload'); // Adjust the path as needed
const { bucket } = require('../config/firebase'); // Adjust the path for Firebase initialization
const UUID = require("uuid-v4");

module.exports = async (req, res) => {
  let uuid = UUID();
  try {
    // Gere um nome de arquivo único
    const fileName = `uploads/image-${Date.now()}.png`;

    // Crie uma referência de arquivo
    const fileRef = bucket.file(fileName);

    // Gere uma URL presigned para upload
    const [url] = await fileRef.createResumableUpload({
      metadata: {
        contentType: 'image/png',
        size: "350000",
        metadata: {
        cacheControl: 'public,max-age=12600',
        firebaseStorageDownloadTokens: uuid,
        },
        
      },

      origin: req.headers.origin,
      
    });

    // Retorne a URL presigned para o cliente
    res.json({ url, uuid, fileName});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating the presigned URL.');
  }
};