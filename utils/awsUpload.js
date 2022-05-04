const path = require('path');
const { v4: uuidv4 } = require('uuid');
const s3 = require('./s3');

/**
 * function to upload image in amazon s3
 * @param {obj} fileImage (req.file of multer)
 * @returns {string} url final image uploaded
 */
const awsUpload = async (fileImage) => {
  // 1) seteamos los parametros para subir a s3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uuidv4() + path.extname(fileImage.originalname),
    Body: fileImage.buffer,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentDisposition: 'inline',
    ContentType: 'image/jpeg',
  };
  try {
    // 2) espero hasta subir la imagen y devuelvo la url
    const storedFile = await s3.upload(params).promise();
    return storedFile?.Location;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = awsUpload;
