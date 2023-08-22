const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { getStorage, getDownloadURL, ref} = require('firebase-admin/storage');
const UUID = require("uuid-v4");

function upload(req, res, bucket){
    console.log(req.headers)
  const busboy = new Busboy({ headers: req.headers });
    const tmpdir = os.tmpdir();
    const fields = {};
    const uploads = {};
 
    busboy.on('field', (fieldname, val) => {
        console.log(`Processed field ${fieldname}: ${val}.`);
        fields[fieldname] = val;
    });
 
    const fileWrites = [];
 
    // This code will process each file uploaded.
    busboy.on('file', (fieldname, file, filename) => {
        //console.log(`Processed file ${filename}`);
        const filepath = path.join(tmpdir, filename);
        uploads[fieldname] = filepath;
 
        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);
 
        const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
                writeStream.end();
            });
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
        fileWrites.push(promise);
    });
 
    busboy.on('finish', async () => {
        var url;
        await Promise.all(fileWrites);
        for (const file in uploads) {
            console.log(uploads[file]);
            let uuid = UUID();
            let options = {
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: uuid,
                        cacheControl: 'public,max-age=12600'
                    }
                }
            };

			const path = bucket.upload(uploads[file], options)
            path.then(result=>{
				bucket_url = result[0]['metadata']['bucket']
				file_name = result[0]['metadata']['name']
                url = "https://firebasestorage.googleapis.com/v0/b/"+bucket_url+"/o/"+file_name+"?alt=media&token="+uuid
                res.send({"url":url});
			})
            //fs.unlinkSync(uploads[file]);
 
        }
    });
 
    busboy.end(req.body);
}

module.exports = {upload}