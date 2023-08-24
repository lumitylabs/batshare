const { upload } = require('../upload/upload'); // Adjust the path as needed
const { bucket } = require('../config/firebase'); // Adjust the path for Firebase initialization

export​ ​const​ ​config​ ​=​ ​{​
  ​api​: ​{​
      ​bodyParser​: ​false​,​
      ​externalResolver​: ​true​,​
  ​}​,​
​}​;​

module.exports = async (req, res) => {
  try {
    // Gere um nome de arquivo único
    const fileName = `image-${Date.now()}.png`;

    // Crie uma referência de arquivo
    const fileRef = bucket.file(fileName);

    // Gere uma URL presigned para upload
    const [url] = await fileRef.createResumableUpload({
      metadata: {
        contentType: 'image/png',
      },
    });

    // Retorne a URL presigned para o cliente
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating the presigned URL.');
  }
};